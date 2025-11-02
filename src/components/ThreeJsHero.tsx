import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Center, Float } from '@react-three/drei';
import * as THREE from 'three';

interface AnimatedTextProps {
  text: string;
  position: [number, number, number];
  fontSize?: number;
  color?: string;
  delay?: number;
}

function AnimatedText({ text, position, fontSize = 1, color = '#ffffff', delay = 0 }: AnimatedTextProps) {
  const textRef = useRef<THREE.Mesh>(null);
  const [visible, setVisible] = useState(false);
  const { viewport } = useThree();

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  useFrame((state) => {
    if (textRef.current && visible) {
      // Subtle floating animation
      textRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.03;
      // Gentle rotation
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + delay) * 0.01;

      // Fade in animation
      const material = textRef.current.material as THREE.MeshStandardMaterial;
      if (material) {
        const elapsed = state.clock.elapsedTime - delay;
        if (elapsed > 0 && elapsed < 1) {
          material.opacity = elapsed;
        } else if (elapsed >= 1) {
          material.opacity = 1;
        }
      }
    }
  });

  const responsiveFontSize = fontSize * Math.min(viewport.width / 10, 1);

  return (
    <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.1}>
      <Center position={position}>
        <Text
          ref={textRef}
          font="/fonts/helvetiker_regular.typeface.json"
          fontSize={responsiveFontSize}
          color={color}
          anchorX="center"
          anchorY="middle"
          maxWidth={viewport.width * 0.8}
        >
          {text}
          <meshStandardMaterial
            color={color}
            transparent
            opacity={visible ? 1 : 0}
            emissive={color}
            emissiveIntensity={0.1}
          />
        </Text>
      </Center>
    </Float>
  );
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 50;

  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 5;

    colors[i * 3] = 0.75; // R - greenish
    colors[i * 3 + 1] = 0.97; // G
    colors[i * 3 + 2] = 0.42; // B
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.02;
    }
  });

  return null; // Return null to hide particles
}

function Scene() {
  return (
    <>
      {/* Ambient light for overall illumination */}
      <ambientLight intensity={0.6} />

      {/* Directional light for depth */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.8}
        color="#ffffff"
      />

      {/* Colored accent light */}
      <pointLight
        position={[-5, -5, -5]}
        intensity={0.3}
        color="#baf742"
      />

      {/* Animated background particles - disabled */}
      <Particles />

      {/* First line: TRICAST360® */}
      <AnimatedText
        text="TRICAST360® Baumschutz"
        position={[0, 0, 0]}
        fontSize={1.2}
        color="#ffffff"
        delay={0.2}
      />
    </>
  );
}

interface ThreeJsHeroProps {
  className?: string;
}

export default function ThreeJsHero({ className = '' }: ThreeJsHeroProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{
          position: [0, 0, 6],
          fov: 60,
          near: 0.1,
          far: 1000
        }}
        style={{ background: 'transparent' }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]} // Responsive pixel ratio
      >
        <Scene />
      </Canvas>
    </div>
  );
}

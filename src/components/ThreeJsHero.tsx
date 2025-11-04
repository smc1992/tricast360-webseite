import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Center, Float } from '@react-three/drei';
import * as THREE from 'three';

interface TypewriterTextProps {
  position: [number, number, number];
  fontSize?: number;
}

function TypewriterText({ position, fontSize = 1 }: TypewriterTextProps) {
  const textRef = useRef<THREE.Mesh>(null);
  const [displayText, setDisplayText] = useState('');
  const [currentPhase, setCurrentPhase] = useState<'typing1' | 'typing2' | 'pause'>('typing1');
  const [charIndex, setCharIndex] = useState(0);
  const { viewport } = useThree();

  const text1 = 'SCHÜTZT BÄUME';
  const text2 = 'SCHÜTZT WERTE';

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPhase === 'typing1') {
        if (charIndex < text1.length) {
          setDisplayText(text1.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          // Erste Zeile fertig, starte zweite Zeile
          setCurrentPhase('typing2');
          setCharIndex(0);
        }
      } else if (currentPhase === 'typing2') {
        if (charIndex < text2.length) {
          setDisplayText(text1 + '\n' + text2.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          // Beide Zeilen fertig, Pause vor Neustart
          setCurrentPhase('pause');
        }
      } else if (currentPhase === 'pause') {
        // Nach 2 Sekunden Pause von vorne beginnen
        setTimeout(() => {
          setDisplayText('');
          setCharIndex(0);
          setCurrentPhase('typing1');
        }, 2000);
      }
    }, currentPhase === 'pause' ? 0 : 100); // 100ms pro Buchstabe für smoother Effekt

    return () => clearTimeout(timer);
  }, [charIndex, currentPhase]);

  useFrame((state) => {
    if (textRef.current) {
      // Subtle floating animation
      textRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.03;
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
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          maxWidth={viewport.width * 0.8}
          textAlign="center"
          lineHeight={1.2}
        >
          {displayText.split('\n').map((line, index) => (
            <span key={index}>
              {line.split(' ').map((word, wordIndex) => {
                if (word === 'BÄUME' || word === 'WERTE') {
                  return (
                    <span key={wordIndex} style={{ color: '#baf742' }}>
                      {word}{' '}
                    </span>
                  );
                }
                return word + ' ';
              })}
              {index === 0 && displayText.includes('\n') ? '\n' : ''}
            </span>
          ))}
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={1}
            emissive="#ffffff"
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

      {/* Typewriter effect: SCHÜTZT BÄUME, SCHÜTZT WERTE */}
      <TypewriterText
        position={[0, 0, 0]}
        fontSize={1.2}
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

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface MorphingTextProps {
  text: string;
  fontSize?: number;
  className?: string;
}

export const MorphingText = ({ text, fontSize = 100, className = '' }: MorphingTextProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !isVisible) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    };

    updateSize();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    camera.position.z = 5;

    // Create particles for text morphing
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 800;
    const positions = new Float32Array(particleCount * 3);
    const targetPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const progress = new Float32Array(particleCount);

    // Initialize particles in random positions
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Random starting positions
      positions[i3] = (Math.random() - 0.5) * 8;
      positions[i3 + 1] = (Math.random() - 0.5) * 8;
      positions[i3 + 2] = (Math.random() - 0.5) * 8;

      // Target positions will form the text shape
      targetPositions[i3] = positions[i3];
      targetPositions[i3 + 1] = positions[i3 + 1];
      targetPositions[i3 + 2] = positions[i3 + 2];

      // Green color gradient
      colors[i3] = 0.7 + Math.random() * 0.3;     // R
      colors[i3 + 1] = 0.95 + Math.random() * 0.05; // G
      colors[i3 + 2] = 0.2 + Math.random() * 0.3;   // B

      progress[i] = 0;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Create text target positions (simplified - creating a "T" shape)
    const createTextShape = () => {
      const textPoints: number[] = [];
      const scale = 1.5;

      // Create a "T" shape pattern
      for (let i = 0; i < particleCount; i++) {
        let x, y, z;

        if (i < particleCount * 0.2) {
          // Left vertical bar of T
          x = -scale + (Math.random() - 0.5) * 0.3;
          y = (i / (particleCount * 0.2) - 0.5) * scale * 3;
          z = 0;
        } else if (i < particleCount * 0.5) {
          // Top horizontal bar of T
          x = (i / (particleCount * 0.3) - 0.5) * scale * 2.5;
          y = scale * 1.2 + (Math.random() - 0.5) * 0.3;
          z = 0;
        } else if (i < particleCount * 0.7) {
          // Right vertical bar for "360"
          x = scale * 0.8 + (Math.random() - 0.5) * 0.3;
          y = (i / (particleCount * 0.2) - 2) * scale * 1.5;
          z = 0;
        } else {
          // Bottom curve for "360"
          const angle = (i / (particleCount * 0.3)) * Math.PI;
          const radius = scale * 0.6;
          x = Math.cos(angle) * radius + scale * 0.8;
          y = Math.sin(angle) * radius * 0.8 - scale * 0.8;
          z = (Math.random() - 0.5) * 0.2;
        }

        textPoints.push(x, y, z);
      }

      return textPoints;
    };

    const textPositions = createTextShape();

    // Copy text positions to target positions
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      targetPositions[i3] = textPositions[i3];
      targetPositions[i3 + 1] = textPositions[i3 + 1];
      targetPositions[i3 + 2] = textPositions[i3 + 2];
    }

    // Animation
    let time = 0;
    let morphProgress = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.008;

      if (morphProgress < 1) {
        morphProgress += 0.008; // Slower morphing for better effect
      }

      const positionArray = particleGeometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Morph from random positions to text shape
        const currentX = positionArray[i3];
        const currentY = positionArray[i3 + 1];
        const currentZ = positionArray[i3 + 2];

        const targetX = targetPositions[i3];
        const targetY = targetPositions[i3 + 1];
        const targetZ = targetPositions[i3 + 2];

        // Smooth interpolation
        positionArray[i3] += (targetX - currentX) * 0.02;
        positionArray[i3 + 1] += (targetY - currentY) * 0.02;
        positionArray[i3 + 2] += (targetZ - currentZ) * 0.02;

        // Add subtle floating motion after morphing
        if (morphProgress > 0.8) {
          positionArray[i3 + 1] += Math.sin(time * 2 + i * 0.1) * 0.01;
          positionArray[i3] += Math.sin(time * 1.5 + i * 0.05) * 0.005;
        }
      }

      particleGeometry.attributes.position.needsUpdate = true;

      // Gentle camera movement
      camera.position.x = Math.sin(time * 0.3) * 0.3;
      camera.position.y = Math.cos(time * 0.2) * 0.2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      updateSize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [isVisible, text]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          display: isVisible ? 'block' : 'none',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }}
      />
    </div>
  );
};

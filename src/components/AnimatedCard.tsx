import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const AnimatedCard = ({ children, delay = 0, className = '' }: AnimatedCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  useEffect(() => {
    if (!canvasRef.current || !isVisible) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    rendererRef.current = renderer;

    const updateSize = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        renderer.setSize(rect.width, rect.height);
        camera.aspect = rect.width / rect.height;
        camera.updateProjectionMatrix();
      }
    };

    updateSize();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    camera.position.z = 3;

    // Create subtle particle field around the card
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 50;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 4;
      positions[i3 + 1] = (Math.random() - 0.5) * 4;
      positions[i3 + 2] = (Math.random() - 0.5) * 2;

      colors[i3] = 0.7 + Math.random() * 0.3;
      colors[i3 + 1] = 0.95 + Math.random() * 0.05;
      colors[i3 + 2] = 0.2 + Math.random() * 0.3;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.01,
      vertexColors: true,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Add subtle glow effect
    const glowGeometry = new THREE.PlaneGeometry(2, 3);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xbaf742,
      transparent: true,
      opacity: 0.05,
      side: THREE.DoubleSide,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.z = -0.1;
    scene.add(glow);

    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Animate particles with mouse influence
      const positionArray = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Subtle movement
        positionArray[i3] += Math.sin(time + i * 0.1) * 0.002;
        positionArray[i3 + 1] += Math.cos(time + i * 0.1) * 0.002;

        // Mouse influence
        const mouseX = (mousePosition.x - 0.5) * 2;
        const mouseY = (mousePosition.y - 0.5) * 2;
        positionArray[i3] += mouseX * 0.01;
        positionArray[i3 + 1] += mouseY * 0.01;
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Subtle glow pulsing
      glowMaterial.opacity = 0.05 + Math.sin(time * 2) * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => updateSize();

    const handleMouseMove = (e: MouseEvent) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    if (cardRef.current) {
      cardRef.current.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (cardRef.current) {
        cardRef.current.removeEventListener('mousemove', handleMouseMove);
      }
      renderer.dispose();
    };
  }, [isVisible]);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
      } ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

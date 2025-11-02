import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const AboutHeroCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    const updateSize = () => {
      const container = canvasRef.current?.parentElement;
      if (container) {
        const width = container.clientWidth;
        const height = container.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    };

    updateSize();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    camera.position.z = 15;

    // Professional lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xbaf742, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x4a90e2, 0.5, 50);
    pointLight.position.set(-5, -5, 5);
    scene.add(pointLight);

    // Create modular geometric structures (representing the TriCast360 system)
    const structures: THREE.Group[] = [];

    for (let i = 0; i < 8; i++) {
      const structure = new THREE.Group();

      // Create interconnected modules
      for (let j = 0; j < 4; j++) {
        const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
        const material = new THREE.MeshStandardMaterial({
          color: j % 2 === 0 ? 0xbaf742 : 0x2c5530,
          roughness: 0.3,
          metalness: 0.7,
          transparent: true,
          opacity: 0.15,
        });

        const module = new THREE.Mesh(geometry, material);

        // Position modules in a circular pattern
        const angle = (j * Math.PI * 2) / 4;
        const radius = 1.5;
        module.position.x = Math.cos(angle) * radius;
        module.position.z = Math.sin(angle) * radius;
        module.position.y = (j - 1.5) * 0.5;

        structure.add(module);

        // Add connecting elements
        if (j > 0) {
          const connectorGeometry = new THREE.CylinderGeometry(0.1, 0.1, radius * 2);
          const connectorMaterial = new THREE.MeshStandardMaterial({
            color: 0xbaf742,
            emissive: 0xbaf742,
            emissiveIntensity: 0.1,
            transparent: true,
            opacity: 0.3,
          });
          const connector = new THREE.Mesh(connectorGeometry, connectorMaterial);
          connector.rotation.z = Math.PI / 2;
          connector.position.y = (j - 1.5) * 0.5;
          structure.add(connector);
        }
      }

      // Position structures in 3D space
      structure.position.x = (Math.random() - 0.5) * 30;
      structure.position.y = (Math.random() - 0.5) * 15;
      structure.position.z = (Math.random() - 0.5) * 15;

      // Store animation data
      structure.userData = {
        speedX: (Math.random() - 0.5) * 0.003,
        speedY: (Math.random() - 0.5) * 0.002,
        speedZ: (Math.random() - 0.5) * 0.001,
        rotationSpeed: (Math.random() - 0.5) * 0.005,
        baseY: structure.position.y,
      };

      structures.push(structure);
      scene.add(structure);
    }

    // Create subtle particle field
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 150;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      positions[i3] = (Math.random() - 0.5) * 50;
      positions[i3 + 1] = (Math.random() - 0.5) * 30;
      positions[i3 + 2] = (Math.random() - 0.5) * 25;

      // Professional color palette
      colors[i3] = 0.7 + Math.random() * 0.3;     // R
      colors[i3 + 1] = 0.8 + Math.random() * 0.2; // G
      colors[i3 + 2] = 0.4 + Math.random() * 0.3; // B
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Animation loop
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.003;

      // Animate modular structures
      structures.forEach((structure, index) => {
        structure.position.x += structure.userData.speedX;
        structure.position.y += structure.userData.speedY + Math.sin(time * 0.5 + index) * 0.002;
        structure.position.z += structure.userData.speedZ;
        structure.rotation.y += structure.userData.rotationSpeed;

        // Gentle pulsing effect
        const scale = 1 + Math.sin(time * 0.8 + index * 0.3) * 0.05;
        structure.scale.set(scale, scale, scale);

        // Boundary wrapping
        if (Math.abs(structure.position.x) > 20) structure.position.x *= -0.9;
        if (Math.abs(structure.position.y) > 12) structure.position.y *= -0.9;
        if (Math.abs(structure.position.z) > 10) structure.position.z *= -0.9;
      });

      // Animate particles with subtle movement
      const particlePositions = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        particlePositions[i3] += Math.sin(time + i * 0.01) * 0.002;
        particlePositions[i3 + 1] += Math.cos(time * 0.7 + i * 0.01) * 0.001;
        particlePositions[i3 + 2] += Math.sin(time * 0.3 + i * 0.01) * 0.001;
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Subtle camera movement
      camera.position.x = Math.sin(time * 0.1) * 1;
      camera.position.y = Math.cos(time * 0.15) * 0.5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      updateSize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const StatsCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
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

    camera.position.z = 12;
    camera.position.y = 3;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xbaf742, 1.5, 50);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x4a3728, 1, 30);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Create Growing Tree visualization
    const treeGroup = new THREE.Group();

    // Tree trunk
    const trunkGeometry = new THREE.CylinderGeometry(0.3, 0.5, 6, 16);
    const trunkMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a3728,
      roughness: 0.8,
      metalness: 0.2,
    });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = 0;
    treeGroup.add(trunk);

    // Create leaves/foliage spheres
    const leaves: THREE.Mesh[] = [];
    const leafGeometry = new THREE.SphereGeometry(0.8, 16, 16);
    const leafMaterial = new THREE.MeshStandardMaterial({
      color: 0xbaf742,
      roughness: 0.4,
      metalness: 0.3,
      emissive: 0xbaf742,
      emissiveIntensity: 0.2,
    });

    // Create multiple leaf clusters
    const leafPositions = [
      { x: 0, y: 4, z: 0 },
      { x: -1.5, y: 3.5, z: 0 },
      { x: 1.5, y: 3.5, z: 0 },
      { x: 0, y: 3.5, z: 1.5 },
      { x: 0, y: 3.5, z: -1.5 },
      { x: -1, y: 2.5, z: 1 },
      { x: 1, y: 2.5, z: -1 },
    ];

    leafPositions.forEach((pos, index) => {
      const leaf = new THREE.Mesh(leafGeometry, leafMaterial.clone());
      leaf.position.set(pos.x, pos.y, pos.z);
      leaf.userData.index = index;
      leaf.userData.baseY = pos.y;
      leaves.push(leaf);
      treeGroup.add(leaf);
    });

    // Protection ring around tree
    const ringGeometry = new THREE.TorusGeometry(3, 0.15, 16, 32);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0xbaf742,
      roughness: 0.3,
      metalness: 0.7,
      emissive: 0xbaf742,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.8,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0;
    treeGroup.add(ring);

    scene.add(treeGroup);

    // Create growth particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      
      // Position particles around tree
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 4;
      const height = Math.random() * 8 - 2;

      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = height;
      positions[i3 + 2] = Math.sin(angle) * radius;

      // Green color variations
      colors[i3] = 0.7 + Math.random() * 0.3;
      colors[i3 + 1] = 0.95 + Math.random() * 0.05;
      colors[i3 + 2] = 0.2 + Math.random() * 0.3;
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );
    particlesGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(colors, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Rotate tree group
      treeGroup.rotation.y = time * 0.3;

      // Animate leaves - breathing effect
      leaves.forEach((leaf, index) => {
        const scale = 1 + Math.sin(time * 2 + index) * 0.1;
        leaf.scale.set(scale, scale, scale);
        leaf.position.y = leaf.userData.baseY + Math.sin(time + index) * 0.2;
      });

      // Rotate protection ring
      ring.rotation.z = time * 0.5;

      // Animate particles - rising effect
      const positions = particlesGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += 0.02;
        
        // Reset particles that go too high
        if (positions[i3 + 1] > 6) {
          positions[i3 + 1] = -2;
        }
      }
      particlesGeometry.attributes.position.needsUpdate = true;

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

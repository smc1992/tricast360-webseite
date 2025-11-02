import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const NewsBackgroundCanvas = () => {
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

    camera.position.z = 15;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Create construction site particles (representing building activity)
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 300;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      
      positions[i3] = (Math.random() - 0.5) * 30;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;

      // Mix of green and gray colors
      if (Math.random() > 0.5) {
        colors[i3] = 0.7 + Math.random() * 0.3;
        colors[i3 + 1] = 0.95 + Math.random() * 0.05;
        colors[i3 + 2] = 0.2 + Math.random() * 0.3;
      } else {
        const gray = 0.5 + Math.random() * 0.3;
        colors[i3] = gray;
        colors[i3 + 1] = gray;
        colors[i3 + 2] = gray;
      }

      sizes[i] = Math.random() * 0.2 + 0.05;
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );
    particlesGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(colors, 3)
    );
    particlesGeometry.setAttribute(
      'size',
      new THREE.BufferAttribute(sizes, 1)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Create floating tree icons
    const treeIcons: THREE.Mesh[] = [];
    const iconGeometry = new THREE.SphereGeometry(0.3, 8, 8);
    const iconMaterial = new THREE.MeshBasicMaterial({
      color: 0xbaf742,
      transparent: true,
      opacity: 0.4,
    });

    for (let i = 0; i < 8; i++) {
      const icon = new THREE.Mesh(iconGeometry, iconMaterial.clone());
      icon.position.x = (Math.random() - 0.5) * 25;
      icon.position.y = (Math.random() - 0.5) * 15;
      icon.position.z = (Math.random() - 0.5) * 15;
      icon.userData.speedX = (Math.random() - 0.5) * 0.02;
      icon.userData.speedY = (Math.random() - 0.5) * 0.02;
      treeIcons.push(icon);
      scene.add(icon);
    }

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Rotate particles slowly
      particles.rotation.y = time * 0.1;
      particles.rotation.x = Math.sin(time * 0.2) * 0.1;

      // Animate individual particles
      const positions = particlesGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        positions[i3] += Math.sin(time + i) * 0.01;
        positions[i3 + 1] += Math.cos(time + i) * 0.01;
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      // Animate tree icons
      treeIcons.forEach((icon) => {
        icon.position.x += icon.userData.speedX;
        icon.position.y += icon.userData.speedY;
        icon.rotation.y += 0.02;
        icon.rotation.x += 0.01;

        // Bounce back if out of bounds
        if (Math.abs(icon.position.x) > 12) icon.userData.speedX *= -1;
        if (Math.abs(icon.position.y) > 8) icon.userData.speedY *= -1;

        // Pulsing effect
        const scale = 1 + Math.sin(time * 2 + icon.position.x) * 0.2;
        icon.scale.set(scale, scale, scale);
      });

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

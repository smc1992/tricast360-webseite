
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface TechStackCanvasProps {
  type: 'modular' | 'quick' | 'sustainable';
}

export const TechStackCanvas = ({ type }: TechStackCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(256, 256);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    camera.position.z = 8;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xbaf742, 1.5, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Schnelle Installation - Animated Clock
    const clockGroup = new THREE.Group();

    // Clock face
    const clockFaceGeometry = new THREE.CylinderGeometry(1.5, 1.5, 0.1, 32);
    const clockFaceMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.9,
    });
    const clockFace = new THREE.Mesh(clockFaceGeometry, clockFaceMaterial);
    clockGroup.add(clockFace);

    // Clock border
    const clockBorderGeometry = new THREE.TorusGeometry(1.5, 0.1, 8, 32);
    const clockBorderMaterial = new THREE.MeshLambertMaterial({
      color: 0xbaf742,
      emissive: 0xbaf742,
      emissiveIntensity: 0.3,
    });
    const clockBorder = new THREE.Mesh(clockBorderGeometry, clockBorderMaterial);
    clockGroup.add(clockBorder);

    // Hour markers
    for (let i = 0; i < 12; i++) {
      const angle = (i * Math.PI * 2) / 12;
      const markerGeometry = new THREE.BoxGeometry(0.05, 0.3, 0.05);
      const markerMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.x = Math.cos(angle) * 1.2;
      marker.position.z = Math.sin(angle) * 1.2;
      marker.position.y = 0.1;
      clockGroup.add(marker);
    }

    // Hour hand
    const hourHandGeometry = new THREE.BoxGeometry(0.08, 0.6, 0.02);
    const hourHandMaterial = new THREE.MeshLambertMaterial({
      color: 0xbaf742,
      emissive: 0xbaf742,
      emissiveIntensity: 0.2,
    });
    const hourHand = new THREE.Mesh(hourHandGeometry, hourHandMaterial);
    hourHand.position.y = 0.15;
    clockGroup.add(hourHand);

    // Minute hand
    const minuteHandGeometry = new THREE.BoxGeometry(0.06, 0.9, 0.02);
    const minuteHandMaterial = new THREE.MeshLambertMaterial({
      color: 0xbaf742,
      emissive: 0xbaf742,
      emissiveIntensity: 0.2,
    });
    const minuteHand = new THREE.Mesh(minuteHandGeometry, minuteHandMaterial);
    minuteHand.position.y = 0.15;
    clockGroup.add(minuteHand);

    // Second hand (fast moving)
    const secondHandGeometry = new THREE.BoxGeometry(0.03, 1.1, 0.01);
    const secondHandMaterial = new THREE.MeshLambertMaterial({
      color: 0xbaf742,
      emissive: 0xbaf742,
      emissiveIntensity: 0.4,
    });
    const secondHand = new THREE.Mesh(secondHandGeometry, secondHandMaterial);
    secondHand.position.y = 0.15;
    clockGroup.add(secondHand);

    // Center dot
    const centerDotGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.05, 16);
    const centerDotMaterial = new THREE.MeshLambertMaterial({
      color: 0xbaf742,
      emissive: 0xbaf742,
      emissiveIntensity: 0.3,
    });
    const centerDot = new THREE.Mesh(centerDotGeometry, centerDotMaterial);
    centerDot.position.y = 0.2;
    clockGroup.add(centerDot);

    clockGroup.position.set(-6, 2, 0);
    scene.add(clockGroup);

    // 100% Nachhaltig - Green Recycling Symbol
    const recyclingGroup = new THREE.Group();

    // Create recycling arrows in green
    for (let i = 0; i < 3; i++) {
      const angle = (i * Math.PI * 2) / 3;

      // Arrow body
      const arrowBodyGeometry = new THREE.TorusGeometry(1, 0.2, 8, 16, Math.PI * 0.6);
      const arrowBodyMaterial = new THREE.MeshLambertMaterial({
        color: 0xbaf742,
        emissive: 0xbaf742,
        emissiveIntensity: 0.3,
      });
      const arrowBody = new THREE.Mesh(arrowBodyGeometry, arrowBodyMaterial);
      arrowBody.rotation.z = angle;
      recyclingGroup.add(arrowBody);

      // Arrow head
      const arrowHeadGeometry = new THREE.ConeGeometry(0.3, 0.6, 8);
      const arrowHeadMaterial = new THREE.MeshLambertMaterial({
        color: 0xbaf742,
        emissive: 0xbaf742,
        emissiveIntensity: 0.3,
      });
      const arrowHead = new THREE.Mesh(arrowHeadGeometry, arrowHeadMaterial);
      arrowHead.position.x = Math.cos(angle + Math.PI * 0.3) * 1.2;
      arrowHead.position.z = Math.sin(angle + Math.PI * 0.3) * 1.2;
      arrowHead.rotation.y = -angle - Math.PI * 0.3;
      arrowHead.rotation.z = Math.PI / 2;
      recyclingGroup.add(arrowHead);
    }

    // Center circle
    const centerCircleGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.1, 16);
    const centerCircleMaterial = new THREE.MeshLambertMaterial({
      color: 0xbaf742,
      emissive: 0xbaf742,
      emissiveIntensity: 0.4,
    });
    const centerCircle = new THREE.Mesh(centerCircleGeometry, centerCircleMaterial);
    recyclingGroup.add(centerCircle);

    recyclingGroup.position.set(0, 2, 0);
    scene.add(recyclingGroup);

    // Modulares System - Puzzle pieces in green
    const puzzleGroup = new THREE.Group();

    // Create 4 puzzle pieces
    for (let i = 0; i < 4; i++) {
      const pieceGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.2);
      const pieceMaterial = new THREE.MeshLambertMaterial({
        color: 0xbaf742,
        emissive: 0xbaf742,
        emissiveIntensity: 0.2,
      });
      const piece = new THREE.Mesh(pieceGeometry, pieceMaterial);

      const angle = (i * Math.PI) / 2;
      piece.position.x = Math.cos(angle) * 1.2;
      piece.position.z = Math.sin(angle) * 1.2;
      piece.userData.originalX = piece.position.x;
      piece.userData.originalZ = piece.position.z;
      piece.userData.targetX = Math.cos(angle) * 0.4;
      piece.userData.targetZ = Math.sin(angle) * 0.4;

      puzzleGroup.add(piece);
    }

    puzzleGroup.position.set(6, 2, 0);
    scene.add(puzzleGroup);

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.02;

      // Animate clock hands
      if (clockGroup) {
        // Fast second hand (completes rotation every 2 seconds)
        secondHand.rotation.z = time * 3;

        // Minute hand (slower)
        minuteHand.rotation.z = time * 0.5;

        // Hour hand (very slow)
        hourHand.rotation.z = time * 0.1;

        // Slight bobbing animation for the whole clock
        clockGroup.position.y = 2 + Math.sin(time * 2) * 0.1;
      }

      // Animate recycling symbol rotation
      if (recyclingGroup) {
        recyclingGroup.rotation.y = time * 0.8;
        recyclingGroup.position.y = 2 + Math.sin(time * 1.5) * 0.1;
      }

      // Animate puzzle pieces
      if (puzzleGroup) {
        const puzzlePieces = puzzleGroup.children;
        puzzlePieces.forEach((piece: any, index) => {
          const progress = (Math.sin(time + index) + 1) / 2;
          piece.position.x = piece.userData.originalX + (piece.userData.targetX - piece.userData.originalX) * progress;
          piece.position.z = piece.userData.originalZ + (piece.userData.targetZ - piece.userData.originalZ) * progress;
          piece.rotation.y = time + index;
        });
        puzzleGroup.position.y = 2 + Math.sin(time * 1.2) * 0.1;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
    };
  }, [type]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

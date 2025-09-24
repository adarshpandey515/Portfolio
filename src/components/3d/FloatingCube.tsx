'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

export default function FloatingCube() {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * (hovered ? 1 : 0.5);
      meshRef.current.rotation.y += delta * (hovered ? 0.5 : 0.3);
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.5;
      meshRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.8) * 0.2;
      
      if (clicked) {
        meshRef.current.rotation.z += delta * 2;
      }
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        scale={clicked ? 1.5 : hovered ? 1.2 : 1}
        onClick={() => setClicked(!clicked)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color={hovered ? '#ff6b6b' : clicked ? '#4ecdc4' : '#45b7d1'} 
          wireframe={clicked}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>
      
      {/* Add some orbiting particles */}
      <mesh position={[2, 0, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial 
          color="#ffd93d" 
          emissive="#ffd93d"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      <mesh position={[-2, 1, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial 
          color="#6bcf7f" 
          emissive="#6bcf7f"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      <mesh position={[0, -1.5, 1.5]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial 
          color="#ff6b9d" 
          emissive="#ff6b9d"
          emissiveIntensity={0.4}
        />
      </mesh>
    </group>
  );
}
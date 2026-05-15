import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Sparkles, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useGameStore } from '../store';
import Player from './Player';
import Effects from './Effects';

export default function World() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow />
      <pointLight position={[0, 5, 0]} intensity={2} color="#00f0ff" distance={20} />
      <pointLight position={[-10, 5, -10]} intensity={2} color="#ff003c" distance={20} />

      {/* Cyberpunk Sky */}
      <color attach="background" args={['#020204']} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <fog attach="fog" args={['#020204', 5, 40]} />

      <Player />

      {/* Environment / Rooms */}
      <group>
        {/* Main Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#0a0a0f" roughness={0.1} metalness={0.8} />
        </mesh>
        
        <gridHelper args={[100, 100, '#00f0ff', '#111122']} position={[0, 0.01, 0]} />

        {/* The Ayaan Hub Building structure */}
        <mesh position={[0, 5, -15]} castShadow receiveShadow>
          <boxGeometry args={[30, 10, 10]} />
          <meshStandardMaterial color="#0f0f15" roughness={0.5} metalness={0.8} wireframe={true} />
        </mesh>
        
        {/* Neon Hub Sign */}
        <Html position={[0, 12, -10]} center>
          <div className="text-6xl font-game text-cyber-blue glitch-text" style={{ textShadow: '0 0 20px #00f0ff' }}>
            AYAAN HUB
          </div>
        </Html>

        {/* Interactive Terminals/Rooms */}
        <InteractiveRoom position={[-10, 1.5, -8]} color="#00f0ff" label="ABOUT" roomId="about" />
        <InteractiveRoom position={[-3.3, 1.5, -8]} color="#ff003c" label="PROJECTS" roomId="projects" />
        <InteractiveRoom position={[3.3, 1.5, -8]} color="#fcee0a" label="RESUME" roomId="resume" />
        <InteractiveRoom position={[10, 1.5, -8]} color="#ffffff" label="EXTRAS" roomId="extras" />

        {/* Holograms and Details */}
        <Sparkles count={200} scale={20} size={4} speed={0.4} color="#00f0ff" position={[0, 5, -5]} />
      </group>
      <Effects />
    </>
  );
}

function InteractiveRoom({ position, color, label, roomId }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const { setCurrentRoom, currentRoom } = useGameStore();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.2;
    }
  });

  const handleInteract = () => {
    if (currentRoom !== roomId) {
      setCurrentRoom(roomId);
      document.exitPointerLock?.();
    }
  };

  return (
    <group position={position}>
      <mesh 
        ref={meshRef}
        onClick={handleInteract}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={hovered ? 2 : 0.5}
          wireframe={!hovered}
        />
      </mesh>
      
      <pointLight position={[0, 0, 0]} color={color} intensity={hovered ? 2 : 1} distance={5} />

      {hovered && (
        <Html position={[0, 2, 0]} center>
          <div className="bg-black/80 border border-white p-2 font-game text-white text-xs whitespace-nowrap z-50">
            [CLICK] ENTER {label}
          </div>
        </Html>
      )}
    </group>
  );
}

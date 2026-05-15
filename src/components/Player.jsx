import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls, useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';
import { useGameStore } from '../store';

export default function Player() {
  const { camera } = useThree();
  const [, getKeys] = useKeyboardControls();
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  const { currentRoom } = useGameStore();
  const controlsRef = useRef();

  useEffect(() => {
    if (currentRoom) {
      controlsRef.current?.unlock();
    }
  }, [currentRoom]);

  useFrame((state, delta) => {
    if (currentRoom) return;

    const keys = getKeys();
    const speed = 10;
    
    velocity.current.x -= velocity.current.x * 10.0 * delta;
    velocity.current.z -= velocity.current.z * 10.0 * delta;

    direction.current.z = Number(keys.forward) - Number(keys.backward);
    direction.current.x = Number(keys.right) - Number(keys.left);
    direction.current.normalize();

    if (keys.forward || keys.backward) velocity.current.z -= direction.current.z * speed * delta;
    if (keys.left || keys.right) velocity.current.x -= direction.current.x * speed * delta;

    controlsRef.current?.moveRight(-velocity.current.x * delta);
    controlsRef.current?.moveForward(-velocity.current.z * delta);

    if (keys.forward || keys.backward || keys.left || keys.right) {
      camera.position.y = 2 + Math.sin(state.clock.elapsedTime * 10) * 0.05;
    } else {
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 2, 0.1);
    }
  });

  return (
    <PointerLockControls 
      ref={controlsRef} 
      selector="#root"
    />
  );
}

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { KeyboardControls } from '@react-three/drei';
import { useGameStore } from './store';
import World from './components/World';
import UI from './components/UI';
import IntroSequence from './components/IntroSequence';

export default function App() {
  const gameState = useGameStore(state => state.gameState);
  
  return (
    <>
      <KeyboardControls
        map={[
          { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
          { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
          { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
          { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
          { name: 'jump', keys: ['Space'] },
          { name: 'interact', keys: ['e', 'E', 'Enter'] },
        ]}
      >
        <Canvas shadows camera={{ fov: 75, position: [0, 2, 5] }}>
          <Suspense fallback={null}>
            {gameState !== 'intro' && <World />}
          </Suspense>
        </Canvas>

        <UI />
        
        {gameState === 'intro' && <IntroSequence />}
      </KeyboardControls>
    </>
  );
}

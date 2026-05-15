import React from 'react';
import { EffectComposer, Bloom, Vignette, Noise, Glitch } from '@react-three/postprocessing';
import { useGameStore } from '../store';

export default function Effects() {
  const { currentRoom } = useGameStore();
  
  return (
    <EffectComposer disableNormalPass>
      <Bloom 
        luminanceThreshold={1} 
        mipmapBlur 
        intensity={1.5} 
      />
      <Noise opacity={0.02} />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
      {/* Add glitch effect when entering a room */}
      {currentRoom && (
        <Glitch 
          delay={[1.5, 3.5]}
          duration={[0.1, 0.3]}
          strength={[0.1, 0.3]}
          active={true}
        />
      )}
    </EffectComposer>
  );
}

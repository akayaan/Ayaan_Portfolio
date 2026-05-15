import { create } from 'zustand'

export const useGameStore = create((set) => ({
  gameState: 'intro', // intro, loading, playing, in-room
  currentRoom: null, // about, project, extras, resume
  setGameState: (state) => set({ gameState: state }),
  setCurrentRoom: (room) => set({ currentRoom: room }),
  introProgress: 0,
  setIntroProgress: (progress) => set({ introProgress: progress }),
}))

import React from 'react';
import { useGameStore } from '../store';
import { Terminal, Map, User, Briefcase, FileCode } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import animeStylizationImg from '../../Images/5.jpg';

export default function UI() {
  const { gameState, currentRoom, setCurrentRoom } = useGameStore();

  if (gameState === 'intro') return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-40">
      <div className="scanlines absolute inset-0"></div>
      <div className="crosshair"></div>

      {/* HUD - Top Left */}
      <div className="absolute top-6 left-6 hud-border p-4 w-64 pointer-events-auto">
        <h3 className="text-cyber-blue font-game text-xl border-b border-cyber-blue/30 pb-2 mb-2">SYSTEM.STATUS</h3>
        <div className="flex items-center gap-2 text-sm text-white/80 font-sans mb-1">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          ENGINE: ONLINE
        </div>
        <div className="flex items-center gap-2 text-sm text-white/80 font-sans">
          <Map size={14} className="text-cyber-yellow" />
          LOCATION: {currentRoom ? currentRoom.toUpperCase() : 'MAIN HUB'}
        </div>
      </div>

      {/* Controls Helper - Bottom Left */}
      <div className="absolute bottom-6 left-6 bg-black/50 backdrop-blur-md p-4 border-l-2 border-cyber-pink">
        <p className="text-xs text-white/70 font-game mb-2">CONTROLS</p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          <div><span className="text-cyber-yellow mr-2">[W,A,S,D]</span> Move</div>
          <div><span className="text-cyber-yellow mr-2">[MOUSE]</span> Look</div>
          <div><span className="text-cyber-yellow mr-2">[CLICK]</span> Interact</div>
          <div><span className="text-cyber-yellow mr-2">[ESC]</span> Menu</div>
        </div>
      </div>

      {/* Room Overlays */}
      <AnimatePresence>
        {currentRoom && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl hud-border p-8 bg-black/90 pointer-events-auto max-h-[80vh] overflow-y-auto"
          >
            <button 
              onClick={() => setCurrentRoom(null)}
              className="absolute top-4 right-4 text-cyber-pink hover:text-white transition-colors font-game"
            >
              [X] CLOSE
            </button>
            {renderRoomContent(currentRoom)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function renderRoomContent(room) {
  switch(room) {
    case 'about':
      return (
        <div className="space-y-6">
          <h2 className="text-4xl font-game text-cyber-blue mb-6 border-b border-cyber-blue/30 pb-4 flex items-center gap-4">
            <User className="text-cyber-pink" size={32} />
            ABOUT.Ayaan
          </h2>
          <div className="font-sans text-lg text-gray-300 leading-relaxed space-y-4">
            <p className="typewriter-text border-l-2 border-cyber-blue pl-4">
              Hello, I'm Ayaan Khan, and this is my portfolio showcasing my work as a Unity Developer, Technical Artist, and Game Programmer.
            </p>
            <p>
              I have completed an M.Sc. in Game Technology, where I built strong skills in game design, development, and technical art. My goal is to become a Game Technical Artist and Game Developer, combining creativity with technical expertise to craft engaging and visually immersive experiences.
            </p>
            <p>
              I enjoy exploring the balance between art and technology — whether it's bringing characters and environments to life, optimizing workflows, or experimenting with new game mechanics.
            </p>
            <p className="text-cyber-yellow">
              Outside of academics and game development, I enjoy watching anime, drawing, exploring new places, trying different foods, and learning Japanese.
            </p>
          </div>
        </div>
      );
    case 'projects':
      return (
        <div className="space-y-6">
          <h2 className="text-4xl font-game text-cyber-blue mb-6 border-b border-cyber-blue/30 pb-4 flex items-center gap-4">
            <Briefcase className="text-cyber-pink" size={32} />
            MISSION.Logs
          </h2>
          
          <p className="text-white/90 font-light text-lg leading-relaxed bg-cyber-blue/10 p-4 border-l-4 border-cyber-blue rounded-r-lg shadow-[0_0_20px_rgba(0,255,255,0.15)] backdrop-blur-sm">
            Explore my game development projects, categorized by scope and focus, showcasing full-scale team projects and smaller technical demonstrations. Click on any card to see a detailed breakdown.
          </p>

          <div className="bg-gray-800/80 border border-cyber-pink/50 p-6 relative overflow-hidden group hover:border-cyber-pink transition-all hover:shadow-[0_0_30px_rgba(255,0,255,0.2)] hover:bg-gray-800">
            <div className="absolute top-0 right-0 bg-cyber-pink text-black font-bold px-3 py-1 text-xs shadow-[0_0_15px_rgba(255,0,255,0.4)]">MAIN MISSION</div>
            <h3 className="text-2xl font-game text-white mb-2 drop-shadow-md group-hover:text-cyber-pink transition-colors">SUPERMARKET SHOWDOWN</h3>
            <p className="text-gray-300 mb-4 font-light">Physics Based Ragdoll PVP Party Game // Unity Engine</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <ul className="text-sm space-y-2 text-cyber-blue font-light">
                <li>[+] Ragdoll Physics System</li>
                <li>[+] Multiplayer Systems</li>
                <li>[+] Inventory System</li>
              </ul>
              <ul className="text-sm space-y-2 text-cyber-blue font-light">
                <li>[+] Interactive Environment</li>
                <li>[+] Cart Mechanics</li>
              </ul>
            </div>
            
            <div className="aspect-video w-full bg-black mb-4 flex items-center justify-center border border-gray-700 relative shadow-inner">
              <iframe 
                src="https://player.vimeo.com/video/1132820914?badge=0&autopause=0&player_id=0&app_id=58479" 
                frameBorder="0" 
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write" 
                className="absolute inset-0 w-full h-full opacity-90 group-hover:opacity-100 transition-opacity" 
                title="Supermarket Showdown Gameplay">
              </iframe>
            </div>

            <button className="w-full py-3 bg-cyber-pink/20 hover:bg-cyber-pink/50 text-white font-bold border border-cyber-pink font-game tracking-widest transition-all shadow-[0_0_15px_rgba(255,0,255,0.2)] hover:shadow-[0_0_25px_rgba(255,0,255,0.4)]">
              INITIALIZE PROJECT // ENTER
            </button>
          </div>
        </div>
      );
    case 'resume':
      return (
        <div className="space-y-6">
          <h2 className="text-4xl font-game text-cyber-blue mb-6 border-b border-cyber-blue/30 pb-4 flex items-center gap-4">
            <FileCode className="text-cyber-pink" size={32} />
            AI_TERMINAL.Resume
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-game text-cyber-yellow mb-4">SKILL_TREE</h3>
              <div className="space-y-4">
                <SkillBar name="Unity Engine" level={90} />
                <SkillBar name="C# Programming" level={85} />
                <SkillBar name="Technical Art" level={80} />
                <SkillBar name="Shaders / HLSL" level={75} />
                <SkillBar name="3D Math / Physics" level={80} />
                <SkillBar name="React & WebGL" level={70} />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-game text-cyber-yellow mb-4">EXPERIENCE_LOG</h3>
              <div className="border-l-2 border-cyber-blue/30 pl-4 space-y-6">
                <div>
                  <div className="text-cyber-blue font-bold">M.Sc. Game Technology</div>
                  <div className="text-sm text-gray-400">Academic Completion</div>
                  <p className="text-sm text-gray-300 mt-2">Specialized in game design, development, and technical art optimization workflows.</p>
                </div>
                <div>
                  <div className="text-cyber-pink font-bold">Game Developer</div>
                  <div className="text-sm text-gray-400">Freelance & Personal Projects</div>
                  <p className="text-sm text-gray-300 mt-2">Built comprehensive gameplay systems, physics simulations, and optimized renders.</p>
                </div>
              </div>
              
              <button className="mt-8 w-full py-3 bg-cyber-blue/20 hover:bg-cyber-blue/40 text-cyber-blue border border-cyber-blue font-game tracking-widest transition-all flex items-center justify-center gap-2">
                <Terminal size={18} />
                DOWNLOAD_CV.EXE
              </button>
            </div>
          </div>
        </div>
      );
    case 'extras':
      return (
        <div className="space-y-6">
          <h2 className="text-4xl font-game text-cyber-blue mb-6 border-b border-cyber-blue/30 pb-4 flex items-center gap-4">
            <Map className="text-cyber-pink" size={32} />
            GALLERY.Extras
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square bg-gray-900 border border-cyber-blue/30 flex items-center justify-center relative group overflow-hidden">
              <div className="absolute inset-0 bg-cyber-blue/10 group-hover:bg-cyber-blue/30 transition-colors z-10"></div>
              <span className="text-cyber-blue font-game relative z-20">CONCEPT ART 01</span>
            </div>
            <div className="aspect-square bg-gray-900 border border-cyber-pink/30 flex items-center justify-center relative group overflow-hidden">
              <div className="absolute inset-0 bg-cyber-pink/10 group-hover:bg-cyber-pink/30 transition-colors z-10"></div>
              <span className="text-cyber-pink font-game relative z-20">TECHNICAL RENDER</span>
            </div>
            <div className="aspect-square bg-gray-900 border border-cyber-yellow/30 flex items-center justify-center relative group overflow-hidden">
              <img src={animeStylizationImg} alt="Anime Stylization" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity z-0" />
              <div className="absolute inset-0 bg-cyber-yellow/10 group-hover:bg-transparent transition-colors z-10"></div>
              <span className="text-cyber-yellow font-game relative z-20 bg-black/70 px-2 py-1">ANIME STYLIZATION</span>
            </div>
            <div className="aspect-square bg-gray-900 border border-white/30 flex items-center justify-center relative group overflow-hidden">
              <div className="absolute inset-0 bg-white/10 group-hover:bg-white/30 transition-colors z-10"></div>
              <span className="text-white font-game relative z-20">EXPERIMENT LOG</span>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}

function SkillBar({ name, level }) {
  return (
    <div>
      <div className="flex justify-between text-xs font-game mb-1">
        <span className="text-white">{name}</span>
        <span className="text-cyber-blue">{level}%</span>
      </div>
      <div className="h-1 bg-gray-800 w-full">
        <div className="h-full bg-cyber-blue" style={{ width: `${level}%` }}></div>
      </div>
    </div>
  );
}

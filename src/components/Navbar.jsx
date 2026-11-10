import React, { useState } from 'react';
import { 
  Flame, 
  Calendar, 
  Video, 
  Layers, 
  Palette, 
  Beef, 
  Bot, 
  Settings, 
  LayoutDashboard,
  Volume2,
  VolumeX,
  ShieldCheck
} from 'lucide-react';
import { soundEngine } from '../services/soundEffects';

export default function Navbar({ activeTab, setActiveTab, openSettings, pendingApprovalsCount }) {
  const [isPlayingSizzle, setIsPlayingSizzle] = useState(false);

  const toggleSizzleSound = () => {
    const newState = !isPlayingSizzle;
    setIsPlayingSizzle(newState);
    soundEngine.toggleGrillSizzle(newState);
  };

  const navItems = [
    { id: 'dashboard', label: 'Panel General', icon: LayoutDashboard },
    { id: 'calendar', label: 'Campaña 30 Días', icon: Calendar, badge: pendingApprovalsCount > 0 ? `${pendingApprovalsCount} por aprobar` : null },
    { id: 'commercials', label: 'Estudio Comerciales', icon: Video },
    { id: 'modes', label: '5 Modos de Campaña', icon: Layers },
    { id: 'graphics', label: 'Diseño Gráfico', icon: Palette },
    { id: 'catalog', label: 'Catálogo & Precios', icon: Beef },
    { id: 'ai-agent', label: 'Agente IA Creativo', icon: Bot },
  ];

  return (
    <header className="sticky top-0 z-50 bg-carbon-900/95 backdrop-blur-md border-b border-madera-700/60 shadow-2xl">
      {/* Top Banner with Brand Identity */}
      <div className="bg-gradient-to-r from-madera-900 via-carbon-950 to-madera-900 px-4 py-1.5 border-b border-madera-800/80 flex flex-wrap items-center justify-between text-xs text-gray-400">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-brasa-500 animate-ping"></span>
          <span className="font-brand text-dorado-400 tracking-wider font-semibold">JABALÍ 21</span>
          <span className="text-gray-600">|</span>
          <span className="italic text-gray-300 hidden sm:inline">"EL SABOR DEL FUEGO, LA PASIÓN POR EL ASADO."</span>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleSizzleSound}
            className={`flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium transition-all ${
              isPlayingSizzle 
                ? 'bg-brasa-600/30 text-brasa-400 border border-brasa-500/50' 
                : 'bg-carbon-800 text-gray-400 hover:text-gray-200 border border-carbon-700'
            }`}
            title="Activar o silenciar ambiente sonoro de brasas y parrilla"
          >
            {isPlayingSizzle ? <Volume2 className="w-3.5 h-3.5 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{isPlayingSizzle ? 'Brasas en Vivo' : 'Ambiente Brasas'}</span>
          </button>

          <div className="flex items-center space-x-1 text-olivo-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Modo Seguro: Requiere Aprobación</span>
          </div>

          <button
            onClick={openSettings}
            className="flex items-center space-x-1 text-gray-400 hover:text-dorado-400 transition-colors"
            title="Configuración de APIs y Guardrails"
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">APIs</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('dashboard')} 
            className="flex items-center space-x-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-madera-700 via-carbon-900 to-brasa-900 border border-dorado-500/40 flex items-center justify-center shadow-lg group-hover:border-dorado-400 transition-all glow-ember">
              <span className="text-xl">🐗</span>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-brand font-black text-xl tracking-widest text-gold-gradient">
                  JABALÍ 21
                </span>
                <Flame className="w-4 h-4 text-brasa-500 animate-bounce" />
              </div>
              <span className="text-[10px] tracking-wider text-dorado-400/80 uppercase font-semibold block">
                Agencia de Publicidad IA
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-madera-800/80 text-dorado-300 border border-dorado-500/40 shadow-inner'
                      : 'text-gray-300 hover:text-dorado-400 hover:bg-carbon-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-dorado-400' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-brasa-600 text-white">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-dorado-500 via-brasa-500 to-dorado-500 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mobile / Horizontal scrollable nav for smaller screens */}
        <div className="lg:hidden flex space-x-2 overflow-x-auto py-2 border-t border-carbon-800 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
                  isActive
                    ? 'bg-madera-800 text-dorado-300 border border-dorado-500/40'
                    : 'text-gray-400 hover:bg-carbon-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}

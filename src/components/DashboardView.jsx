import React from 'react';
import { 
  Flame, 
  Calendar, 
  Video, 
  CheckCircle, 
  Clock, 
  Sparkles, 
  AlertTriangle, 
  ArrowRight,
  TrendingUp,
  Share2,
  ShieldCheck,
  Beef,
  Volume2
} from 'lucide-react';
import { BRAND_IDENTITY } from '../data/brandData';
import { soundEngine } from '../services/soundEffects';

export default function DashboardView({ 
  calendarDays, 
  products, 
  setActiveTab, 
  setSelectedDay, 
  onApproveDay 
}) {
  const approvedCount = calendarDays.filter(d => d.status === 'approved').length;
  const pendingCount = calendarDays.filter(d => d.status === 'pending').length;
  const draftCount = calendarDays.filter(d => d.status === 'draft').length;

  // Check if any product is missing a price
  const missingPricesCount = products.filter(p => !p.price || p.price.trim() === '').length;

  // Next post needing attention
  const nextPost = calendarDays.find(d => d.status === 'pending') || calendarDays[0];

  const handlePlayVoiceover = (text) => {
    soundEngine.speakLatinAmericanSpanish(text);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-madera-900 via-carbon-900 to-carbon-950 border border-dorado-500/30 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brasa-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-dorado-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-madera-800/80 border border-dorado-500/40 text-dorado-300 text-xs font-semibold mb-4">
            <Flame className="w-3.5 h-3.5 text-brasa-500 animate-pulse" />
            <span>AGENCIA DE INTELIGENCIA ARTIFICIAL EN VIVO</span>
          </div>

          <h1 className="font-brand text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-wide">
            JABALÍ 21 <span className="text-gold-gradient">STUDIO</span>
          </h1>
          
          <p className="mt-3 text-lg md:text-xl font-display italic text-dorado-200">
            "{BRAND_IDENTITY.slogan}"
          </p>

          <p className="mt-3 text-sm text-gray-300 leading-relaxed max-w-2xl">
            Plataforma integral de marketing, publicidad, diseño gráfico y producción audiovisual cinematográfica. 
            Especializada en cortes premium, asados a las brasas y experiencias gastronómicas de alto impacto.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('commercials')}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-brasa-600 to-madera-600 hover:from-brasa-500 hover:to-madera-500 text-white font-semibold text-sm shadow-lg shadow-brasa-900/40 border border-brasa-400/30 transition-all hover:scale-105"
            >
              <Video className="w-4 h-4" />
              <span>Crear Comercial Cinematográfico</span>
            </button>

            <button
              onClick={() => setActiveTab('calendar')}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-carbon-800 hover:bg-carbon-700 text-dorado-300 font-semibold text-sm border border-dorado-500/30 transition-all"
            >
              <Calendar className="w-4 h-4 text-dorado-400" />
              <span>Ver Plan 30 Días</span>
            </button>

            <button
              onClick={() => setActiveTab('modes')}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-olivo-800/50 hover:bg-olivo-700/50 text-gray-200 font-semibold text-sm border border-olivo-500/40 transition-all"
            >
              <Sparkles className="w-4 h-4 text-olivo-400" />
              <span>5 Modos de Campaña</span>
            </button>
          </div>
        </div>
      </div>

      {/* Alert if prices are missing (strict guardrail) */}
      {missingPricesCount > 0 && (
        <div className="rounded-xl bg-brasa-950/60 border border-brasa-500/50 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-brasa-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm text-brasa-300">
                Regla de Veracidad: Hay {missingPricesCount} productos sin precio registrado
              </h4>
              <p className="text-xs text-gray-300 mt-0.5">
                La IA tiene estrictamente prohibido inventar precios o promociones no autorizadas. 
                Configure los precios oficiales para habilitar copys y anuncios de venta directa.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('catalog')}
            className="shrink-0 px-4 py-2 bg-brasa-600 hover:bg-brasa-500 text-white text-xs font-bold rounded-lg border border-brasa-400/40 transition-all"
          >
            Registrar Precios en Catálogo
          </button>
        </div>
      )}

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="rounded-xl bg-carbon-900/90 border border-madera-700/50 p-5 shadow-lg relative overflow-hidden group hover:border-dorado-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Campaña Activa</span>
            <div className="p-2 rounded-lg bg-madera-800/80 text-dorado-400 border border-madera-700">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-white font-brand">30</span>
            <span className="text-xs text-gray-400">/ 30 Días Creados</span>
          </div>
          <div className="mt-2 w-full bg-carbon-800 rounded-full h-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-dorado-500 to-brasa-500 h-full w-full"></div>
          </div>
          <span className="mt-2 text-[11px] text-gray-400 block">4 Semanas estratégicas completas</span>
        </div>

        {/* Metric 2 */}
        <div className="rounded-xl bg-carbon-900/90 border border-madera-700/50 p-5 shadow-lg relative overflow-hidden group hover:border-olivo-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Aprobaciones</span>
            <div className="p-2 rounded-lg bg-olivo-900/60 text-olivo-400 border border-olivo-700/50">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-olivo-400 font-brand">{approvedCount}</span>
            <span className="text-xs text-gray-400">Aprobados de 30</span>
          </div>
          <div className="mt-2 w-full bg-carbon-800 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-olivo-500 h-full transition-all duration-500" 
              style={{ width: `${(approvedCount / 30) * 100}%` }}
            ></div>
          </div>
          <span className="mt-2 text-[11px] text-gray-400 block">
            {pendingCount} pendientes de revisión humana
          </span>
        </div>

        {/* Metric 3 */}
        <div className="rounded-xl bg-carbon-900/90 border border-madera-700/50 p-5 shadow-lg relative overflow-hidden group hover:border-brasa-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Catálogo Activo</span>
            <div className="p-2 rounded-lg bg-brasa-900/40 text-brasa-400 border border-brasa-700/50">
              <Beef className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-white font-brand">{products.length}</span>
            <span className="text-xs text-gray-400">Productos & Banquete</span>
          </div>
          <div className="mt-2 flex items-center space-x-1">
            <span className="text-[11px] text-dorado-400 font-medium">Jabalí Insignia</span>
            <span className="text-gray-500 text-xs">•</span>
            <span className="text-[11px] text-gray-300">Arrachera, Chorizo, Chistorra</span>
          </div>
          <span className="mt-2 text-[11px] text-gray-400 block">Diferenciados por sabor y corte</span>
        </div>

        {/* Metric 4 */}
        <div className="rounded-xl bg-carbon-900/90 border border-madera-700/50 p-5 shadow-lg relative overflow-hidden group hover:border-dorado-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Seguridad y Pauta</span>
            <div className="p-2 rounded-lg bg-carbon-800 text-dorado-400 border border-carbon-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline space-x-2">
            <span className="text-2xl font-black text-dorado-400 font-brand">$0.00</span>
            <span className="text-xs text-gray-400">Gasto Involuntario</span>
          </div>
          <div className="mt-2 text-[11px] text-gray-300">
            Protección activa: Cero publicaciones sin confirmación
          </div>
          <span className="mt-2 text-[11px] text-olivo-400 font-semibold block">
            100% Bajo Control del Dueño
          </span>
        </div>
      </div>

      {/* Main 2-Column Section: Today's Spotlight Post + Brand Identity Palette */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spotlight Post for Review (2 Cols) */}
        <div className="lg:col-span-2 rounded-2xl bg-carbon-900 border border-madera-700/60 p-6 shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-carbon-800 pb-3">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-dorado-500/20 text-dorado-400 border border-dorado-500/40">
                Día {nextPost.day} de 30
              </span>
              <span className="text-xs text-gray-400 font-medium">
                Semana {nextPost.week}: {nextPost.weekTheme}
              </span>
            </div>

            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
              nextPost.status === 'approved' 
                ? 'bg-olivo-900/60 text-olivo-400 border border-olivo-700' 
                : 'bg-brasa-900/60 text-brasa-400 border border-brasa-700'
            }`}>
              {nextPost.status === 'approved' ? '✓ Aprobado' : '⏳ Pendiente de Aprobación'}
            </span>
          </div>

          <div>
            <span className="text-xs font-semibold text-dorado-400 uppercase tracking-wider">
              {nextPost.product} • {nextPost.format}
            </span>
            <h3 className="font-brand text-xl font-bold text-white mt-1">
              {nextPost.title}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5 italic">
              Objetivo: {nextPost.objective}
            </p>
          </div>

          {/* Visual Gastronomic Image Banner for Spotlight */}
          <div className="relative rounded-xl overflow-hidden border border-madera-700/60 shadow-lg h-44 group">
            <img 
              src={products.find(p => p.id === nextPost.productId)?.imageUrl || 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&auto=format&fit=crop&q=80'} 
              alt={nextPost.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-3">
              <span className="text-[11px] text-dorado-300 font-semibold bg-black/60 px-2.5 py-0.5 rounded-full border border-dorado-500/30">
                Visual Oficial Asignado • Fotografía Gastronómica
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-carbon-950 border border-carbon-800 space-y-2">
            <span className="text-[11px] font-bold text-gray-400 uppercase">Texto Publicitario (Copy)</span>
            <p className="text-sm text-gray-200 whitespace-pre-line leading-relaxed font-sans">
              {nextPost.copy}
            </p>
            <div className="pt-2 text-xs text-dorado-400/90 font-mono">
              {nextPost.hashtags}
            </div>
          </div>

          {/* Audio & Video direction summary */}
          <div className="p-4 rounded-xl bg-madera-950/40 border border-madera-800/50 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-dorado-300">Voz en Off (Español Latino):</span>
              <button 
                onClick={() => handlePlayVoiceover(nextPost.voiceover)}
                className="flex items-center space-x-1 px-2.5 py-1 rounded bg-madera-800 text-dorado-300 hover:bg-madera-700 border border-dorado-500/30 transition-all"
                title="Escuchar locución con acento latino"
              >
                <Volume2 className="w-3.5 h-3.5 text-dorado-400" />
                <span>Escuchar Locución</span>
              </button>
            </div>
            <p className="text-gray-300 italic">"{nextPost.voiceover}"</p>
            <p className="text-gray-400 text-[11px]">
              <strong className="text-gray-300">Efectos Sonoros:</strong> {nextPost.soundFX}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={() => {
                setSelectedDay(nextPost);
                setActiveTab('calendar');
              }}
              className="flex items-center space-x-1.5 text-xs text-gray-400 hover:text-dorado-400 transition-colors"
            >
              <span>Ver detalles en Calendario Completo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center space-x-2">
              {nextPost.status !== 'approved' && (
                <button
                  onClick={() => onApproveDay(nextPost.day)}
                  className="px-4 py-2 rounded-lg bg-olivo-700 hover:bg-olivo-600 text-white font-bold text-xs shadow-md border border-olivo-400/40 transition-all flex items-center space-x-1.5"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Aprobar Publicación</span>
                </button>
              )}

              <button
                onClick={() => {
                  setSelectedDay(nextPost);
                  setActiveTab('calendar');
                }}
                className="px-4 py-2 rounded-lg bg-carbon-800 hover:bg-carbon-700 text-gray-200 text-xs font-semibold border border-carbon-700"
              >
                Editar Contenido
              </button>
            </div>
          </div>
        </div>

        {/* Brand Identity & Palette Card (1 Col) */}
        <div className="rounded-2xl bg-carbon-900 border border-madera-700/60 p-6 shadow-xl space-y-5">
          <div>
            <h3 className="font-brand text-lg font-bold text-white flex items-center space-x-2">
              <Flame className="w-4 h-4 text-dorado-400" />
              <span>Identidad Visual Jabalí 21</span>
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Estilo rústico, campirano y elegante de marca premium.
            </p>
          </div>

          {/* Color Swatches */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
              Paleta Oficial
            </span>
            <div className="grid grid-cols-1 gap-2">
              {BRAND_IDENTITY.colors.map((color, i) => (
                <div key={i} className="flex items-center space-x-3 p-2 rounded-lg bg-carbon-950 border border-carbon-800">
                  <div 
                    className="w-6 h-6 rounded-md shadow-inner border border-white/20 shrink-0" 
                    style={{ backgroundColor: color.hex }}
                  ></div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-200">{color.name}</span>
                      <span className="text-[10px] font-mono text-gray-400">{color.hex}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 truncate block">{color.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Elements */}
          <div className="space-y-2 pt-2 border-t border-carbon-800">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
              Elementos Visuales del Asador
            </span>
            <div className="flex flex-wrap gap-1.5">
              {BRAND_IDENTITY.visualElements.slice(0, 6).map((elem, i) => (
                <span 
                  key={i} 
                  className="text-[11px] px-2 py-0.5 rounded bg-madera-950 text-dorado-300 border border-madera-800"
                >
                  {elem}
                </span>
              ))}
            </div>
          </div>

          {/* Strict Rules */}
          <div className="pt-2 border-t border-carbon-800">
            <span className="text-[11px] font-bold text-brasa-400 uppercase tracking-wider block mb-1">
              Políticas de Seguridad IA
            </span>
            <ul className="text-[11px] text-gray-300 space-y-1 list-disc list-inside">
              <li>Precios reales sin invención</li>
              <li>Aprobación manual requerida</li>
              <li>Transparencia en renders de video</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 5 Campaign Modes Quick Launcher */}
      <div className="rounded-2xl bg-carbon-900 border border-madera-700/60 p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-brand text-xl font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-dorado-400" />
              <span>Los 5 Modos de Campaña de la Agencia</span>
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Módulos especializados para activar estrategias de marketing a la medida
            </p>
          </div>
          <button
            onClick={() => setActiveTab('modes')}
            className="text-xs font-semibold text-dorado-400 hover:text-dorado-300 flex items-center space-x-1"
          >
            <span>Ver todos los modos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { id: 1, name: "Producto Individual", desc: "Publicidad exclusiva para Jabalí, Arrachera, Chorizo o Chistorra", color: "from-dorado-900/60 to-carbon-900" },
            { id: 2, name: "Parrillada Completa", desc: "Banquete integral combinando todos los cortes al fuego", color: "from-brasa-900/60 to-carbon-900" },
            { id: 3, name: "Comercial Cinematográfico", desc: "Spots de televisión y video gourmet de 15, 30 y 60 segundos", color: "from-madera-900/60 to-carbon-900" },
            { id: 4, name: "Publicidad de Ventas", desc: "Anuncios directos para conseguir pedidos por WhatsApp y envíos", color: "from-olivo-900/60 to-carbon-900" },
            { id: 5, name: "Contenido para Redes", desc: "Reels, TikTok, Carruseles y Stories con ganchos virales", color: "from-carbon-800 to-carbon-900" },
          ].map((mode) => (
            <div
              key={mode.id}
              onClick={() => setActiveTab('modes')}
              className={`p-4 rounded-xl bg-gradient-to-br ${mode.color} border border-madera-700/40 hover:border-dorado-500/60 transition-all cursor-pointer group hover:scale-[1.02] shadow-md`}
            >
              <div className="text-[10px] font-mono text-dorado-400 font-bold uppercase">
                MODO {mode.id}
              </div>
              <h4 className="font-brand font-bold text-sm text-white mt-1 group-hover:text-dorado-300 transition-colors">
                {mode.name}
              </h4>
              <p className="text-[11px] text-gray-400 mt-1.5 leading-snug">
                {mode.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

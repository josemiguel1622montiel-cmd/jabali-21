import React, { useState } from 'react';
import { 
  Layers, 
  Beef, 
  Sparkles, 
  Video, 
  ShoppingBag, 
  Share2, 
  Copy, 
  Check, 
  Flame, 
  Volume2, 
  ArrowRight,
  Send,
  AlertTriangle,
  Download
} from 'lucide-react';
import { INITIAL_PRODUCTS, BRAND_IDENTITY } from '../data/brandData';
import { soundEngine } from '../services/soundEffects';

export default function CampaignModesView({ products, setActiveTab, onAddCustomPost }) {
  const [activeMode, setActiveMode] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState('asado-jabali');
  const [generatedResult, setGeneratedResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [salesPromoText, setSalesPromoText] = useState('');

  // Mode 1: Producto Individual
  const handleGenerateIndividual = (prodId) => {
    const prod = products.find(p => p.id === prodId) || products[0];

    const result = {
      mode: 1,
      modeName: `MODO 1: PRODUCTO INDIVIDUAL (${prod.name})`,
      title: `Especial Gastronómico: El Secreto de ${prod.name}`,
      tagline: prod.tagline,
      hook: `¿Por qué ${prod.name} es el favorito de los verdaderos amantes del fuego?`,
      copy: `Hay cortes que llenan el estómago... y cortes que encienden el alma.\n\n${prod.name} de JABALÍ 21:\n${prod.attributes.map(a => `• ${a}`).join('\n')}\n\nPreparado con la devoción del asador rústico y el respeto por el buen fuego.`,
      hashtags: `#${prod.name.replace(/\s+/g, '')} #Jabali21 #ElSaborDelFuego #CortesPremium #AsadoMexicano`,
      cta: `Haz clic en nuestro enlace para agendar tu pedido antes de que se agote.`,
      voiceover: `No cualquier carne merece llamarse asado. ${prod.name} de Jabalí 21. Sabor auténtico a las brasas.`,
      imagePrompt: prod.imagePrompt,
      recommendedFormat: 'Reel 9:16 & Post Carrusel 1:1',
      productName: prod.name
    };

    setGeneratedResult(result);
  };

  // Mode 2: Parrillada Completa (Banquete)
  const handleGenerateParrillada = () => {
    const result = {
      mode: 2,
      modeName: 'MODO 2: PARRILLADA COMPLETA (EXPERIENCIA TOTAL)',
      title: 'El Banquete Definitivo: 4 Cortes, Un Solo Fuego',
      tagline: 'Jabalí, Arrachera, Chorizo y Chistorra reunidos para hacer historia',
      hook: 'No invites a tus amigos a una carne común. Invítalos a un festín legendario.',
      copy: `¿Por qué conformarte con un solo corte cuando puedes tener el olimpo de la parrilla?\n\n🔥 ASADO DE JABALÍ: Magro, silvestre y con 4 horas a fuego lento.\n🔥 ARRACHERA MARINADA: Suavidad que se corta con tenedor y sellado al hierro.\n🔥 CHORIZO ARGENTINO: El estallido crocante y jugoso que une a la mesa.\n🔥 CHISTORRA TRADICIONAL: Dorada al pimentón, el aperitivo adictivo.\n\nTodo servido sobre tabla artesanal de roble con cebollitas asadas y chiles al rescoldo.`,
      hashtags: `#ParrilladaCompleta #Jabali21 #BanqueteParrillero #CarneAsadaEntreAmigos #FestinDeFuego`,
      cta: `Escríbenos por WhatsApp y reserva tu tabla parrillera completa para este fin de semana.`,
      voiceover: `Cuatro cortes estelares. Un solo fuego sagrado. La Parrillada Completa Jabalí 21: El sabor del fuego, la pasión por el asado.`,
      imagePrompt: `Gigantic luxury barbecue banquet platter on thick dark wooden table with sliced wild boar roast, charred arrachera flank steak, Argentine chorizos, blistered chistorra coil, surrounded by roasted vegetables and fire embers --ar 16:9`,
      recommendedFormat: 'Video 16:9 & Reel 9:16',
      productName: 'Parrillada Completa'
    };

    setGeneratedResult(result);
  };

  // Mode 3: Comercial Cinematográfico (Launch to studio)
  const handleLaunchCommercialMode = () => {
    setActiveTab('commercials');
  };

  // Mode 4: Publicidad de Ventas (Direct Conversion with strict price check)
  const handleGenerateSales = (prodId) => {
    const prod = products.find(p => p.id === prodId) || products[0];

    const hasPrice = prod.price && prod.price.trim() !== '';
    const priceDisplay = hasPrice ? prod.price : '[PRECIO OFICIAL POR CONFIRMAR EN CATÁLOGO]';

    const result = {
      mode: 4,
      modeName: 'MODO 4: PUBLICIDAD DE VENTAS Y CONVERSIÓN',
      title: `Pide tu ${prod.name} para este Fin de Semana`,
      tagline: 'Entregas garantizadas con cadena de frío',
      hook: `¿Ya tienes resuelta la comida del sábado? Asegura tus cortes antes de cerrar pedidos.`,
      copy: `Fin de semana sin buen asado... no es fin de semana. 🥩🔥\n\nAdquiere hoy tu ${prod.name} Jabalí 21:\n• Presentación: ${prod.unit}\n• Precio Oficial: ${priceDisplay}\n${prod.customPromo ? `• Promoción Autorizada: ${prod.customPromo}\n` : ''}• Empacado al vacío grado alimenticio de máxima frescura.\n\nEntregas directas a domicilio.`,
      hashtags: `#PedidosJabali21 #ComprarCarneAsada #CortesADomicilio #ParrilladaEnCasa #CarneGourmet`,
      cta: `Envía un WhatsApp al enlace de nuestro perfil y confirma tu pedido hoy mismo.`,
      voiceover: `Los mejores cortes listos para tu asador. Ordena tu ${prod.name} en Jabalí 21.`,
      imagePrompt: `Vacuum-sealed gourmet package of ${prod.name} with luxury rustic label JABALÍ 21 on charred butcher counter with sprigs of fresh rosemary --ar 1:1`,
      recommendedFormat: 'Anuncio de Conversión Facebook/Instagram Feed (1:1) & Stories (9:16)',
      productName: prod.name,
      missingPrice: !hasPrice
    };

    setGeneratedResult(result);
  };

  // Mode 5: Contenido para Redes
  const handleGenerateSocial = () => {
    const result = {
      mode: 5,
      modeName: 'MODO 5: CONTENIDO VIRAL PARA REDES (TIKTOK & REELS)',
      title: 'Los 3 Mandamientos del Fuego que Todo Parrillero Debe Saber',
      tagline: 'Contenido de autoridad y valor educativo que dispara el engagement',
      hook: 'Si haces esto al encender tu carbón, estás arruinando tu carne.',
      copy: `3 Errores fatales al hacer una parrillada (y cómo resolverlos como un maestro):\n\n1. Poner la carne sobre fuego negro con humo denso (Espera siempre a que las brasas se cubran de ceniza blanca).\n2. Picar los chorizos con tenedor (Deja que el jugo se quede adentro de la tripa).\n3. Cortar la arrachera a favor de la fibra (Córtala siempre a 90 grados contra la veta).\n\n¿Cuál de estos errores cometías antes? Te leemos abajo en los comentarios. 👇`,
      hashtags: `#TipsParrilleros #SecretosDelAsado #ErroresDeCarne #Jabali21 #ParrillerosMexicanos #AprendeAEsAsar`,
      cta: `Comparte este video con tu amigo el que siempre quema la carne.`,
      voiceover: `Hay secretos que separan a un aficionado de un maestro del fuego. Guarda este video para tu próximo asado con Jabalí 21.`,
      imagePrompt: `Visual side by side comparison of black smoking coals vs pure white glowing embers on a rustic barbecue grill, educational infographics style --ar 9:16`,
      recommendedFormat: 'TikTok & Reel 9:16',
      productName: 'Educación & Autoridad'
    };

    setGeneratedResult(result);
  };

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePlayVoice = (text) => {
    soundEngine.speakLatinAmericanSpanish(text);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-carbon-900 border border-madera-700/60 p-6 rounded-2xl shadow-xl">
        <div className="flex items-center space-x-2">
          <Layers className="w-5 h-5 text-dorado-400" />
          <h2 className="font-brand text-2xl font-black text-white">
            Los 5 Modos de Campaña Especializados
          </h2>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Activa estrategias a la medida para producto único, festín completo, anuncios televisivos, conversión directa o viralidad en redes.
        </p>
      </div>

      {/* Mode Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {[
          { id: 1, icon: Beef, label: "Modo 1", title: "Producto Individual", color: "border-dorado-500/50" },
          { id: 2, icon: Flame, label: "Modo 2", title: "Parrillada Completa", color: "border-brasa-500/50" },
          { id: 3, icon: Video, label: "Modo 3", title: "Comercial Cine", color: "border-madera-500/50" },
          { id: 4, icon: ShoppingBag, label: "Modo 4", title: "Publicidad de Ventas", color: "border-olivo-500/50" },
          { id: 5, icon: Share2, label: "Modo 5", title: "Contenido para Redes", color: "border-tierra-500/50" },
        ].map((m) => {
          const Icon = m.icon;
          const isActive = activeMode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => {
                setActiveMode(m.id);
                if (m.id === 1) handleGenerateIndividual(selectedProduct);
                else if (m.id === 2) handleGenerateParrillada();
                else if (m.id === 3) handleLaunchCommercialMode();
                else if (m.id === 4) handleGenerateSales(selectedProduct);
                else if (m.id === 5) handleGenerateSocial();
              }}
              className={`p-4 rounded-xl border text-left transition-all ${
                isActive
                  ? 'bg-madera-900 border-dorado-500 shadow-xl glow-ember'
                  : 'bg-carbon-900 border-carbon-800 hover:border-carbon-700 hover:bg-carbon-850'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-dorado-400">
                  {m.label}
                </span>
                <Icon className={`w-4 h-4 ${isActive ? 'text-dorado-400' : 'text-gray-400'}`} />
              </div>
              <h4 className="font-brand font-bold text-sm text-white mt-1">
                {m.title}
              </h4>
            </button>
          );
        })}
      </div>

      {/* Mode Interactive Config Panel */}
      <div className="bg-carbon-900 border border-madera-700/60 p-6 rounded-2xl shadow-xl space-y-6">
        {/* Controls based on active mode */}
        {activeMode === 1 && (
          <div className="space-y-4">
            <h3 className="font-brand text-lg font-bold text-white flex items-center space-x-2">
              <Beef className="w-4 h-4 text-dorado-400" />
              <span>Modo 1: Generar Publicidad Exclusiva por Producto</span>
            </h3>
            <p className="text-xs text-gray-300">
              Crea contenido hiper-enfocado en las bondades únicas de un solo corte (Asado de Jabalí, Chorizo, Arrachera o Chistorra).
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs text-gray-400">Seleccionar Producto:</span>
              <select
                value={selectedProduct}
                onChange={(e) => {
                  setSelectedProduct(e.target.value);
                  handleGenerateIndividual(e.target.value);
                }}
                className="bg-carbon-950 border border-carbon-700 rounded-lg px-3 py-1.5 text-xs text-white"
              >
                {products.filter(p => p.id !== 'parrillada-completa').map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>

              <button
                onClick={() => handleGenerateIndividual(selectedProduct)}
                className="px-4 py-1.5 rounded-lg bg-dorado-500 hover:bg-dorado-400 text-carbon-950 font-bold text-xs"
              >
                Generar Campaña Individual
              </button>
            </div>
          </div>
        )}

        {activeMode === 2 && (
          <div className="space-y-4">
            <h3 className="font-brand text-lg font-bold text-white flex items-center space-x-2">
              <Flame className="w-4 h-4 text-brasa-500" />
              <span>Modo 2: Campaña de Parrillada Completa (Experiencia Integral)</span>
            </h3>
            <p className="text-xs text-gray-300">
              Combina el Asado de Jabalí, la Arrachera, el Chorizo Argentino y la Chistorra en un festín conjunto que impulse el ticket promedio.
            </p>

            <button
              onClick={handleGenerateParrillada}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-brasa-600 to-madera-600 hover:from-brasa-500 hover:to-madera-500 text-white font-bold text-xs shadow-md"
            >
              Generar Anuncio de Festín Completo
            </button>
          </div>
        )}

        {activeMode === 4 && (
          <div className="space-y-4">
            <h3 className="font-brand text-lg font-bold text-white flex items-center space-x-2">
              <ShoppingBag className="w-4 h-4 text-olivo-400" />
              <span>Modo 4: Publicidad Directa de Ventas & Pedidos</span>
            </h3>
            <p className="text-xs text-gray-300">
              Anuncios enfocados en la llamada a la acción para concretar pedidos por WhatsApp o entregas directas.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs text-gray-400">Producto a Vender:</span>
              <select
                value={selectedProduct}
                onChange={(e) => {
                  setSelectedProduct(e.target.value);
                  handleGenerateSales(e.target.value);
                }}
                className="bg-carbon-950 border border-carbon-700 rounded-lg px-3 py-1.5 text-xs text-white"
              >
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>

              <button
                onClick={() => handleGenerateSales(selectedProduct)}
                className="px-4 py-1.5 rounded-lg bg-olivo-600 hover:bg-olivo-500 text-white font-bold text-xs"
              >
                Generar Anuncio de Ventas
              </button>
            </div>
          </div>
        )}

        {activeMode === 5 && (
          <div className="space-y-4">
            <h3 className="font-brand text-lg font-bold text-white flex items-center space-x-2">
              <Share2 className="w-4 h-4 text-dorado-400" />
              <span>Modo 5: Contenido Viral para Redes (Reels, TikTok, Historias)</span>
            </h3>
            <p className="text-xs text-gray-300">
              Publicaciones educativas, polémicas parrilleras, errores comunes y técnicas con ganchos de 3 segundos para maximizar compartidos.
            </p>

            <button
              onClick={handleGenerateSocial}
              className="px-5 py-2 rounded-lg bg-carbon-800 hover:bg-carbon-700 text-dorado-300 border border-dorado-500/40 font-bold text-xs"
            >
              Generar Contenido Viral
            </button>
          </div>
        )}

        {/* Results Viewer */}
        {generatedResult && (
          <div className="pt-4 border-t border-carbon-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono text-dorado-400 font-bold uppercase">
                  {generatedResult.modeName}
                </span>
                <h4 className="font-brand font-bold text-xl text-white mt-0.5">
                  {generatedResult.title}
                </h4>
                <p className="text-xs text-gray-400 italic">
                  Formato Sugerido: {generatedResult.recommendedFormat}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePlayVoice(generatedResult.voiceover)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-madera-800 text-dorado-300 text-xs font-semibold hover:bg-madera-700 transition-all"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Escuchar Locución</span>
                </button>

                <button
                  onClick={() => handleCopyText(`${generatedResult.copy}\n\n${generatedResult.hashtags}`)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-carbon-800 text-gray-200 text-xs font-semibold hover:bg-carbon-700 border border-carbon-700 transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-olivo-400" />
                      <span className="text-olivo-400">¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Todo</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Warning if price is missing in sales mode */}
            {generatedResult.missingPrice && (
              <div className="p-3 rounded-lg bg-brasa-950/70 border border-brasa-600/70 text-xs flex items-center justify-between gap-3">
                <div className="flex items-center space-x-2 text-brasa-300">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-brasa-400" />
                  <span>
                    El precio oficial de este producto no está registrado en el Catálogo. 
                    El agente NO inventará un precio ficticio.
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab('catalog')}
                  className="shrink-0 px-3 py-1 bg-brasa-600 hover:bg-brasa-500 text-white font-bold rounded text-[11px]"
                >
                  Registrar Precio
                </button>
              </div>
            )}

            {/* Hook */}
            <div className="p-3 rounded-xl bg-brasa-950/40 border border-brasa-800/60 text-xs">
              <span className="text-[10px] font-bold text-brasa-400 uppercase tracking-wider block">
                Gancho de Entrada (Hook):
              </span>
              <p className="text-white font-semibold mt-0.5 italic">
                "{generatedResult.hook}"
              </p>
            </div>

            {/* Copy */}
            <div className="p-4 rounded-xl bg-carbon-950 border border-carbon-800 space-y-2">
              <span className="text-xs font-bold text-gray-300 uppercase">
                Texto Publicitario Completo:
              </span>
              <p className="text-sm text-gray-200 whitespace-pre-line leading-relaxed font-sans">
                {generatedResult.copy}
              </p>
              <div className="pt-2 text-xs text-dorado-400/90 font-mono">
                {generatedResult.hashtags}
              </div>
              <div className="pt-2 text-xs text-olivo-300 font-medium">
                <strong>CTA:</strong> {generatedResult.cta}
              </div>
            </div>

            {/* AI Image Prompt */}
            <div className="p-3 rounded-xl bg-carbon-950 border border-carbon-800 space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase block">
                Prompt Cinematográfico para Generar Imagen:
              </span>
              <p className="text-xs font-mono text-gray-300 bg-carbon-900 p-2 rounded break-words">
                {generatedResult.imagePrompt}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

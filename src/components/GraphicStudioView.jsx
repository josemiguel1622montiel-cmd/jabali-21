import React, { useState, useRef, useEffect } from 'react';
import { 
  Palette, 
  Download, 
  Sparkles, 
  Copy, 
  Check, 
  Image as ImageIcon, 
  Sliders, 
  Smartphone, 
  Square,
  Beef,
  Flame,
  ShieldAlert
} from 'lucide-react';
import { BRAND_IDENTITY } from '../data/brandData';

export default function GraphicStudioView({ products }) {
  const [selectedProduct, setSelectedProduct] = useState('asado-jabali');
  const [headline, setHeadline] = useState('ASADO DE JABALÍ');
  const [subheadline, setSubheadline] = useState('El sabor del fuego, la pasión por el asado.');
  const [badgeText, setBadgeText] = useState('100% CORTES SELECCIONADOS');
  const [format, setFormat] = useState('1:1'); // '1:1' (1080x1080) or '9:16' (1080x1920)
  const [template, setTemplate] = useState('ember-gold'); // 'ember-gold', 'rustic-wood', 'minimal-charcoal'
  const [includePrice, setIncludePrice] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  const canvasRef = useRef(null);

  const currentProduct = products.find(p => p.id === selectedProduct) || products[0];

  // Update defaults when product changes
  useEffect(() => {
    if (currentProduct) {
      setHeadline(currentProduct.name);
      setSubheadline(currentProduct.tagline);
    }
  }, [selectedProduct]);

  // Render on canvas
  useEffect(() => {
    renderCanvas();
  }, [headline, subheadline, badgeText, format, template, includePrice, selectedProduct]);

  const renderCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const width = format === '1:1' ? 800 : 540;
    const height = format === '1:1' ? 800 : 960;

    canvas.width = width;
    canvas.height = height;

    // Background: Deep charcoal / wood gradient
    const bgGrad = ctx.createRadialGradient(
      width / 2, height * 0.75, 40,
      width / 2, height / 2, width * 0.9
    );

    if (template === 'ember-gold') {
      bgGrad.addColorStop(0, '#3d1607'); // warm fire glow
      bgGrad.addColorStop(0.5, '#1e140f');
      bgGrad.addColorStop(1, '#0c0c0e');
    } else if (template === 'rustic-wood') {
      bgGrad.addColorStop(0, '#2c1810');
      bgGrad.addColorStop(0.6, '#1a0d07');
      bgGrad.addColorStop(1, '#0a0a0c');
    } else {
      bgGrad.addColorStop(0, '#222225');
      bgGrad.addColorStop(0.7, '#141416');
      bgGrad.addColorStop(1, '#09090a');
    }

    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Decorative Borders (Aged gold & wood)
    ctx.strokeStyle = '#c5a059';
    ctx.lineWidth = 2;
    ctx.strokeRect(25, 25, width - 50, height - 50);

    ctx.strokeStyle = 'rgba(197, 160, 89, 0.4)';
    ctx.lineWidth = 1;
    ctx.strokeRect(32, 32, width - 64, height - 64);

    // Corner ornaments
    drawCornerOrnaments(ctx, width, height);

    // Brand Header: JABALÍ 21
    ctx.fillStyle = '#c5a059';
    ctx.font = 'bold 16px Cinzel, serif';
    ctx.textAlign = 'center';
    ctx.fillText('EST. 2024 • PARRILLA CAMPIRANA', width / 2, 70);

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 36px Cinzel, serif';
    ctx.fillText('JABALÍ 21', width / 2, 115);

    // Gold divider line
    ctx.beginPath();
    ctx.moveTo(width / 2 - 120, 132);
    ctx.lineTo(width / 2 + 120, 132);
    ctx.strokeStyle = '#c5a059';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Central Visual Graphic (Stylized meat & grill silhouette)
    drawCentralEmblem(ctx, width / 2, height * 0.44, width * 0.35);

    // Badge
    if (badgeText) {
      const badgeY = height * 0.62;
      ctx.fillStyle = 'rgba(234, 88, 12, 0.2)';
      ctx.fillRect(width / 2 - 140, badgeY - 16, 280, 28);
      ctx.strokeStyle = '#ea580c';
      ctx.lineWidth = 1;
      ctx.strokeRect(width / 2 - 140, badgeY - 16, 280, 28);

      ctx.fillStyle = '#f3dea0';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.fillText(badgeText.toUpperCase(), width / 2, badgeY + 3);
    }

    // Headline (Product Name)
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px Cinzel, serif';
    ctx.fillText(headline.toUpperCase(), width / 2, height * 0.72);

    // Subheadline / Tagline
    ctx.fillStyle = '#d1d5db';
    ctx.font = 'italic 15px Inter, sans-serif';
    wrapText(ctx, `"${subheadline}"`, width / 2, height * 0.78, width - 120, 22);

    // Optional Price Tag (Only if verified!)
    if (includePrice && currentProduct.price) {
      const priceY = height * 0.85;
      ctx.fillStyle = '#c5a059';
      ctx.font = 'bold 20px Cinzel, serif';
      ctx.fillText(`${currentProduct.price} (${currentProduct.unit})`, width / 2, priceY);
    }

    // Footer Slogan
    ctx.fillStyle = '#9e7c38';
    ctx.font = 'bold 12px Cinzel, serif';
    ctx.fillText('EL SABOR DEL FUEGO, LA PASIÓN POR EL ASADO', width / 2, height - 50);
  };

  const drawCornerOrnaments = (ctx, w, h) => {
    ctx.fillStyle = '#c5a059';
    const size = 12;
    // 4 corners
    [[32, 32], [w - 32, 32], [32, h - 32], [w - 32, h - 32]].forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const drawCentralEmblem = (ctx, cx, cy, radius) => {
    // Outer glow ring
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(197, 160, 89, 0.35)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Inner ember circle
    const innerGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, radius);
    innerGrad.addColorStop(0, 'rgba(234, 88, 12, 0.3)');
    innerGrad.addColorStop(0.7, 'rgba(61, 35, 20, 0.5)');
    innerGrad.addColorStop(1, 'rgba(17, 17, 19, 0.8)');
    ctx.fillStyle = innerGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, radius - 4, 0, Math.PI * 2);
    ctx.fill();

    // Boar / Grill symbol
    ctx.font = `${radius * 0.65}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🐗', cx, cy - 8);
    ctx.textBaseline = 'alphabetic'; // reset
  };

  function wrapText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }

  const handleDownloadPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `Jabali21_${selectedProduct}_${format === '1:1' ? 'feed' : 'story'}.png`;
    a.click();
  };

  const handleCopyPrompt = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-carbon-900 border border-madera-700/60 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Palette className="w-5 h-5 text-dorado-400" />
            <h2 className="font-brand text-2xl font-black text-white">
              Estudio Gráfico & Generador Visual de Alta Calidad
            </h2>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Diseña imágenes listas para Instagram Feed (1080x1080) y Stories (1080x1920) y genera prompts profesionales para IA.
          </p>
        </div>

        <button
          onClick={handleDownloadPNG}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-dorado-600 to-dorado-500 hover:from-dorado-500 hover:to-dorado-400 text-carbon-950 font-black text-xs shadow-lg transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Descargar Imagen PNG</span>
        </button>
      </div>

      {/* 2-Column: Live Canvas Editor (Left) + Customizer & Prompts (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Canvas Preview (5 Cols) */}
        <div className="lg:col-span-5 bg-carbon-900 border border-madera-700/60 rounded-2xl p-5 shadow-2xl flex flex-col items-center space-y-4">
          <div className="w-full flex items-center justify-between text-xs text-gray-400 border-b border-carbon-800 pb-2">
            <span className="font-bold text-dorado-400 uppercase">Lienzo en Tiempo Real</span>
            <span className="font-mono">{format === '1:1' ? '1080 x 1080 px (Feed)' : '1080 x 1920 px (Story)'}</span>
          </div>

          <div className="bg-carbon-950 p-2 rounded-xl border border-carbon-800 shadow-inner flex items-center justify-center max-w-full overflow-hidden">
            <canvas
              ref={canvasRef}
              className="max-h-[520px] w-auto max-w-full rounded-lg shadow-2xl object-contain"
            />
          </div>

          <div className="w-full flex items-center justify-between pt-2">
            <span className="text-[11px] text-gray-400">
              Paleta: Negro Carbón, Oro Envejecido y Fuego
            </span>
            <button
              onClick={handleDownloadPNG}
              className="text-xs text-dorado-400 font-bold hover:underline flex items-center space-x-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Guardar Archivo</span>
            </button>
          </div>
        </div>

        {/* Customizer Controls & Prompts (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Controls Box */}
          <div className="bg-carbon-900 border border-madera-700/60 rounded-2xl p-6 shadow-xl space-y-4 text-xs">
            <h3 className="font-brand font-bold text-base text-white flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-dorado-400" />
              <span>Personalizar Gráfico de Marca</span>
            </h3>

            {/* Product & Format */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Producto</label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full bg-carbon-950 border border-carbon-700 rounded-lg p-2 text-white"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Formato</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setFormat('1:1')}
                    className={`py-2 rounded-lg font-bold flex items-center justify-center space-x-1 ${
                      format === '1:1'
                        ? 'bg-dorado-500 text-carbon-950'
                        : 'bg-carbon-950 text-gray-300 border border-carbon-700'
                    }`}
                  >
                    <Square className="w-3.5 h-3.5" />
                    <span>1:1 Feed</span>
                  </button>

                  <button
                    onClick={() => setFormat('9:16')}
                    className={`py-2 rounded-lg font-bold flex items-center justify-center space-x-1 ${
                      format === '9:16'
                        ? 'bg-dorado-500 text-carbon-950'
                        : 'bg-carbon-950 text-gray-300 border border-carbon-700'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>9:16 Story</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Template Theme */}
            <div>
              <label className="block text-gray-300 font-semibold mb-1">Estilo de Fondo</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'ember-gold', name: 'Brasas & Fuego' },
                  { id: 'rustic-wood', name: 'Madera de Encino' },
                  { id: 'minimal-charcoal', name: 'Carbón Minimal' },
                ].map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => setTemplate(tpl.id)}
                    className={`py-2 rounded-lg font-semibold text-[11px] ${
                      template === tpl.id
                        ? 'bg-madera-800 text-dorado-300 border border-dorado-500/50'
                        : 'bg-carbon-950 text-gray-400 border border-carbon-800'
                    }`}
                  >
                    {tpl.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Texts */}
            <div className="space-y-3">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Título Principal</label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full bg-carbon-950 border border-carbon-700 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Subtítulo / Frase</label>
                <input
                  type="text"
                  value={subheadline}
                  onChange={(e) => setSubheadline(e.target.value)}
                  className="w-full bg-carbon-950 border border-carbon-700 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Etiqueta Superior (Badge)</label>
                <input
                  type="text"
                  value={badgeText}
                  onChange={(e) => setBadgeText(e.target.value)}
                  className="w-full bg-carbon-950 border border-carbon-700 rounded-lg p-2 text-dorado-300 font-bold"
                />
              </div>

              {/* Price check rule */}
              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="includePriceCheck"
                  checked={includePrice}
                  onChange={(e) => setIncludePrice(e.target.checked)}
                  disabled={!currentProduct.price}
                  className="rounded bg-carbon-950 border-carbon-700 text-dorado-500 focus:ring-0"
                />
                <label htmlFor="includePriceCheck" className="text-gray-300 cursor-pointer">
                  Mostrar precio en el cartel ({currentProduct.price || 'Sin precio en catálogo'})
                </label>
              </div>

              {!currentProduct.price && includePrice && (
                <div className="text-[11px] text-brasa-400 flex items-center space-x-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Registre el precio en el Catálogo para habilitar esta opción.</span>
                </div>
              )}
            </div>
          </div>

          {/* AI Prompts Generator for Photorealistic Rendering (Midjourney / Flux) */}
          <div className="bg-carbon-900 border border-madera-700/60 rounded-2xl p-6 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-brand font-bold text-sm text-white flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-dorado-400" />
                <span>Prompt Fotográfico Profesional para Midjourney v6 / Flux</span>
              </h3>
              <button
                onClick={() => handleCopyPrompt(currentProduct.imagePrompt, 'photoprompt')}
                className="text-xs text-dorado-400 hover:text-dorado-300 flex items-center space-x-1"
              >
                {copiedKey === 'photoprompt' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-olivo-400" />
                    <span className="text-olivo-400">¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Prompt</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed font-mono bg-carbon-950 p-3 rounded-xl border border-carbon-800 break-words">
              {currentProduct.imagePrompt}
            </p>

            <div className="text-[11px] text-gray-400 space-y-1">
              <p><strong>Configuración recomendada:</strong> Calidad 8k, lente 85mm f/1.8 macro, iluminación claroscuro rústico con humo denso y brasas de fondo.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

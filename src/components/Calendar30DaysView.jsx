import React, { useState } from 'react';
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  Filter, 
  Share2, 
  Copy, 
  Volume2, 
  VolumeX, 
  Edit3, 
  Sparkles, 
  Video, 
  FileText, 
  Download,
  AlertCircle,
  Check,
  ChevronRight,
  Flame
} from 'lucide-react';
import { soundEngine } from '../services/soundEffects';

export default function Calendar30DaysView({ 
  calendarDays, 
  setCalendarDays, 
  selectedDay, 
  setSelectedDay, 
  products 
}) {
  const [selectedWeek, setSelectedWeek] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [copiedId, setCopiedId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Filter logic
  const filteredDays = calendarDays.filter((d) => {
    if (selectedWeek !== 'all' && d.week !== parseInt(selectedWeek)) return false;
    if (selectedProduct !== 'all' && d.productId !== selectedProduct) return false;
    if (selectedStatus !== 'all' && d.status !== selectedStatus) return false;
    return true;
  });

  const activeDay = selectedDay || filteredDays[0] || calendarDays[0];

  const handleCopyText = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePlayVoice = (text) => {
    if (isSpeaking) {
      soundEngine.stopVoiceover();
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    soundEngine.speakLatinAmericanSpanish(
      text, 
      () => setIsSpeaking(true), 
      () => setIsSpeaking(false)
    );
  };

  const handleApprove = (dayNum) => {
    setCalendarDays((prev) =>
      prev.map((d) => (d.day === dayNum ? { ...d, status: 'approved' } : d))
    );
    if (activeDay.day === dayNum) {
      setSelectedDay({ ...activeDay, status: 'approved' });
    }
  };

  const handleStartEdit = (day) => {
    setEditForm({ ...day });
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    setCalendarDays((prev) =>
      prev.map((d) => (d.day === editForm.day ? editForm : d))
    );
    setSelectedDay(editForm);
    setIsEditing(false);
  };

  const handleExportMarkdown = () => {
    let md = `# JABALÍ 21 – PLAN DE CAMPAÑA PUBLICITARIA DE 30 DÍAS\n`;
    md += `*El sabor del fuego, la pasión por el asado.*\n\n`;
    md += `Generado por la Agencia de Inteligencia Artificial de Jabalí 21\n\n`;

    [1, 2, 3, 4].forEach((weekNum) => {
      const daysInWeek = calendarDays.filter((d) => d.week === weekNum);
      const theme = daysInWeek[0]?.weekTheme || `Semana ${weekNum}`;
      md += `## SEMANA ${weekNum}: ${theme.toUpperCase()}\n\n`;

      daysInWeek.forEach((d) => {
        md += `### Día ${d.day}: ${d.title} [${d.format}]\n`;
        md += `- **Producto:** ${d.product}\n`;
        md += `- **Objetivo:** ${d.objective}\n`;
        md += `- **Estado:** ${d.status.toUpperCase()}\n`;
        md += `- **Plataformas:** ${d.platforms.join(', ')}\n\n`;
        md += `**Copy para redes:**\n\`\`\`\n${d.copy}\n\n${d.hashtags}\n\`\`\`\n\n`;
        md += `**Guion Técnico / Escena:**\n${d.sceneDescription}\n\n`;
        md += `**Locución (Voz en off):** *"${d.voiceover}"*\n\n`;
        md += `**Efectos sonoros:** ${d.soundFX}\n\n`;
        md += `**Prompt IA Visual:** \`${d.imagePrompt}\`\n\n`;
        md += `---\n\n`;
      });
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Jabali21_Campana_30_Dias.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Controls & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-carbon-900 border border-madera-700/60 p-5 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-dorado-400" />
            <h2 className="font-brand text-2xl font-black text-white">
              Calendario Publicitario 30 Días
            </h2>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Estructurado en 4 semanas temáticas: Presentación, Arte de la Parrilla, Experiencia y Campaña de Ventas.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportMarkdown}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-carbon-800 hover:bg-carbon-700 text-dorado-300 text-xs font-semibold border border-dorado-500/30 transition-all shadow-sm"
          >
            <Download className="w-4 h-4 text-dorado-400" />
            <span>Descargar Plan en Markdown</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs by Week */}
      <div className="flex flex-wrap gap-2 border-b border-carbon-800 pb-2">
        <button
          onClick={() => setSelectedWeek('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            selectedWeek === 'all'
              ? 'bg-dorado-500 text-carbon-950 shadow-md'
              : 'bg-carbon-900 text-gray-300 hover:bg-carbon-800 border border-carbon-800'
          }`}
        >
          Todos los 30 Días
        </button>

        {[
          { num: 1, title: 'Sem 1: Presentación' },
          { num: 2, title: 'Sem 2: Arte de la Parrilla' },
          { num: 3, title: 'Sem 3: Experiencia y Antojo' },
          { num: 4, title: 'Sem 4: Campaña de Ventas' },
        ].map((w) => (
          <button
            key={w.num}
            onClick={() => setSelectedWeek(w.num.toString())}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedWeek === w.num.toString()
                ? 'bg-dorado-500 text-carbon-950 shadow-md'
                : 'bg-carbon-900 text-gray-300 hover:bg-carbon-800 border border-carbon-800'
            }`}
          >
            {w.title}
          </button>
        ))}
      </div>

      {/* Secondary Filters: Product & Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-carbon-950/60 p-3 rounded-xl border border-carbon-800 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-1.5 text-gray-400">
            <Filter className="w-3.5 h-3.5" />
            <span>Filtrar Producto:</span>
          </div>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="bg-carbon-900 border border-carbon-700 rounded-lg px-2.5 py-1 text-gray-200 focus:outline-none focus:border-dorado-500"
          >
            <option value="all">Todos los productos</option>
            <option value="asado-jabali">Asado de Jabalí (Insignia)</option>
            <option value="chorizo-argentino">Chorizo Argentino</option>
            <option value="arrachera">Arrachera</option>
            <option value="chistorra">Chistorra</option>
            <option value="parrillada-completa">Parrillada Completa</option>
            <option value="marca">Marca Jabalí 21</option>
          </select>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-gray-400">Estado:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-carbon-900 border border-carbon-700 rounded-lg px-2.5 py-1 text-gray-200 focus:outline-none focus:border-dorado-500"
          >
            <option value="all">Todos los estados</option>
            <option value="approved">✓ Aprobados</option>
            <option value="pending">⏳ Pendientes</option>
            <option value="draft">📝 Borradores</option>
          </select>

          <span className="text-gray-500">|</span>
          <span className="text-dorado-400 font-mono font-bold">
            {filteredDays.length} publicaciones
          </span>
        </div>
      </div>

      {/* Main 2-Pane Layout: Days List (Left) + Detailed Inspector (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Days Scrollable List (5 Cols) */}
        <div className="lg:col-span-5 space-y-3 max-h-[750px] overflow-y-auto pr-1">
          {filteredDays.map((d) => {
            const isSelected = activeDay?.day === d.day;
            return (
              <div
                key={d.day}
                onClick={() => {
                  setSelectedDay(d);
                  setIsEditing(false);
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-madera-900/90 border-dorado-500 shadow-xl glow-ember'
                    : 'bg-carbon-900/90 border-carbon-800 hover:border-madera-700 hover:bg-carbon-850'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-black font-brand bg-dorado-500/20 text-dorado-400 border border-dorado-500/40">
                      DÍA {d.day}
                    </span>
                    <span className="text-[11px] text-gray-400">Semana {d.week}</span>
                  </div>

                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      d.status === 'approved'
                        ? 'bg-olivo-900/70 text-olivo-400 border border-olivo-700/60'
                        : d.status === 'pending'
                        ? 'bg-brasa-900/70 text-brasa-400 border border-brasa-700/60'
                        : 'bg-carbon-800 text-gray-400 border border-carbon-700'
                    }`}
                  >
                    {d.status === 'approved' ? '✓ Aprobado' : d.status === 'pending' ? '⏳ Revisión' : 'Borrador'}
                  </span>
                </div>

                <h4 className="font-brand font-bold text-sm text-white mt-2 line-clamp-1">
                  {d.title}
                </h4>

                <div className="mt-1 flex items-center justify-between text-xs text-gray-400">
                  <span className="text-dorado-300 font-medium">{d.product}</span>
                  <span className="text-gray-500 text-[11px]">{d.format}</span>
                </div>

                <p className="mt-2 text-xs text-gray-300 line-clamp-2 leading-relaxed font-sans">
                  {d.copy}
                </p>

                {isSelected && (
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 text-dorado-400">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Detailed Inspector Pane (7 Cols) */}
        <div className="lg:col-span-7 bg-carbon-900 border border-madera-700/70 rounded-2xl p-6 shadow-2xl space-y-5">
          {activeDay ? (
            <>
              {/* Day Header with Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-carbon-800 pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 rounded-lg text-xs font-black font-brand bg-dorado-500 text-carbon-950">
                      DÍA {activeDay.day}
                    </span>
                    <span className="text-xs text-dorado-400 font-semibold">
                      Semana {activeDay.week}: {activeDay.weekTheme}
                    </span>
                  </div>
                  <h3 className="font-brand text-xl font-bold text-white mt-2">
                    {activeDay.title}
                  </h3>
                </div>

                <div className="flex items-center space-x-2">
                  {activeDay.status !== 'approved' && (
                    <button
                      onClick={() => handleApprove(activeDay.day)}
                      className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-olivo-700 hover:bg-olivo-600 text-white font-bold text-xs shadow-md border border-olivo-500/50 transition-all"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Aprobar Día</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleStartEdit(activeDay)}
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-carbon-800 hover:bg-carbon-700 text-gray-200 text-xs font-semibold border border-carbon-700 transition-all"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-dorado-400" />
                    <span>Editar</span>
                  </button>
                </div>
              </div>

              {/* Meta details */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-carbon-950 border border-carbon-800">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Producto</span>
                  <span className="font-semibold text-dorado-300 mt-0.5 block">{activeDay.product}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-carbon-950 border border-carbon-800">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Formato</span>
                  <span className="font-semibold text-gray-200 mt-0.5 block">{activeDay.format}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-carbon-950 border border-carbon-800 col-span-2 sm:col-span-1">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Objetivo</span>
                  <span className="font-semibold text-gray-200 mt-0.5 block">{activeDay.objective}</span>
                </div>
              </div>

              {/* Platforms */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-gray-400 mr-1">Canales optimizados:</span>
                {activeDay.platforms.map((plat, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2.5 py-0.5 rounded-md bg-madera-950 text-dorado-300 border border-madera-800 font-medium"
                  >
                    {plat}
                  </span>
                ))}
              </div>

              {/* Hook of 3 seconds */}
              {activeDay.hook && (
                <div className="p-3 rounded-xl bg-brasa-950/40 border border-brasa-800/60 text-xs space-y-1">
                  <span className="font-bold text-brasa-400 uppercase tracking-wider text-[10px] flex items-center space-x-1">
                    <Flame className="w-3.5 h-3.5" />
                    <span>Gancho Inicial de 3 Segundos (Hook Viral)</span>
                  </span>
                  <p className="text-white font-medium italic">"{activeDay.hook}"</p>
                </div>
              )}

              {/* Visual Post Image Preview */}
              <div className="relative rounded-xl overflow-hidden border border-madera-700/60 shadow-lg group">
                <img 
                  src={products.find(p => p.id === activeDay.productId)?.imageUrl || 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&auto=format&fit=crop&q=80'} 
                  alt={activeDay.title} 
                  className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent flex flex-col justify-between p-3.5 pointer-events-none">
                  <div className="flex justify-between items-center">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-carbon-900/90 text-dorado-300 border border-dorado-500/40 shadow">
                      Fotografía Gastronómica Oficial
                    </span>
                    <span className="text-[10px] text-gray-300 bg-black/70 px-2.5 py-0.5 rounded-full font-mono border border-white/10">
                      {activeDay.format}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-dorado-400 font-bold uppercase tracking-wider block">
                      {activeDay.product}
                    </span>
                    <span className="text-white text-sm font-brand font-bold drop-shadow-md">
                      {activeDay.title}
                    </span>
                  </div>
                </div>
              </div>

              {/* Copywriting Section */}
              <div className="p-4 rounded-xl bg-carbon-950 border border-carbon-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center space-x-1.5">
                    <FileText className="w-4 h-4 text-dorado-400" />
                    <span>Texto Publicitario (Copy de Redes)</span>
                  </span>
                  <button
                    onClick={() => handleCopyText(`${activeDay.copy}\n\n${activeDay.hashtags}`, `copy-${activeDay.day}`)}
                    className="flex items-center space-x-1 text-xs text-dorado-400 hover:text-dorado-300 transition-colors"
                  >
                    {copiedId === `copy-${activeDay.day}` ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-olivo-400" />
                        <span className="text-olivo-400">¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-sm text-gray-200 whitespace-pre-line leading-relaxed font-sans bg-carbon-900/60 p-3 rounded-lg border border-carbon-800/80">
                  {activeDay.copy}
                </p>

                <div className="pt-2 border-t border-carbon-800">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Hashtags Segmentados</span>
                    <button
                      onClick={() => handleCopyText(activeDay.hashtags, `hash-${activeDay.day}`)}
                      className="text-[11px] text-dorado-400 hover:underline"
                    >
                      {copiedId === `hash-${activeDay.day}` ? '¡Copiados!' : 'Copiar hashtags'}
                    </button>
                  </div>
                  <p className="text-xs text-dorado-400/90 font-mono break-words">
                    {activeDay.hashtags}
                  </p>
                </div>

                <div className="p-2.5 rounded bg-madera-950/60 border border-madera-800 text-xs">
                  <span className="text-gray-400 font-semibold">Llamado a la Acción (CTA): </span>
                  <span className="text-dorado-200 font-medium">{activeDay.cta}</span>
                </div>
              </div>

              {/* Audiovisual / Storyboard Scene Direction */}
              <div className="p-4 rounded-xl bg-carbon-950 border border-madera-800/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-dorado-300 uppercase tracking-wider flex items-center space-x-1.5">
                    <Video className="w-4 h-4 text-brasa-500" />
                    <span>Dirección Audiovisual & Storyboard</span>
                  </span>

                  <button
                    onClick={() => handlePlayVoice(activeDay.voiceover)}
                    className="flex items-center space-x-1.5 px-3 py-1 rounded bg-madera-800 hover:bg-madera-700 text-dorado-300 text-xs font-semibold border border-dorado-500/40 transition-all shadow-sm"
                  >
                    {isSpeaking ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5 text-brasa-400 animate-pulse" />
                        <span>Detener Voz</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-dorado-400" />
                        <span>Escuchar Voz en Off</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-xs space-y-2">
                  <div>
                    <span className="text-gray-400 font-semibold block">Descripción de Escena y Cámara:</span>
                    <p className="text-gray-300 italic mt-0.5 leading-relaxed">
                      {activeDay.sceneDescription}
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-carbon-900 border border-carbon-800">
                    <span className="text-dorado-400 font-semibold block text-[11px]">
                      Guion de Voz en Off (Español Latino):
                    </span>
                    <p className="text-white text-xs mt-0.5 font-display italic">
                      "{activeDay.voiceover}"
                    </p>
                  </div>

                  <div>
                    <span className="text-gray-400 font-semibold block text-[11px]">
                      Foley & Efectos de Sonido:
                    </span>
                    <p className="text-gray-300 text-xs mt-0.5">{activeDay.soundFX}</p>
                  </div>
                </div>
              </div>

              {/* AI Image Generation Prompt */}
              <div className="p-3 rounded-xl bg-carbon-950 border border-carbon-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-olivo-400 uppercase tracking-wider flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Prompt Cinematográfico para Midjourney / Flux</span>
                  </span>
                  <button
                    onClick={() => handleCopyText(activeDay.imagePrompt, `prompt-${activeDay.day}`)}
                    className="text-[11px] text-dorado-400 hover:underline"
                  >
                    {copiedId === `prompt-${activeDay.day}` ? '¡Copiado!' : 'Copiar Prompt'}
                  </button>
                </div>
                <p className="text-xs font-mono text-gray-300 bg-carbon-900 p-2.5 rounded border border-carbon-800 break-words">
                  {activeDay.imagePrompt}
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-20 text-gray-500">
              Seleccione un día para inspeccionar el contenido completo.
            </div>
          )}
        </div>
      </div>

      {/* Edit Day Modal */}
      {isEditing && editForm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-carbon-900 border border-dorado-500/50 rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-carbon-800 pb-3">
              <h3 className="font-brand text-lg font-bold text-white">
                Editar Publicación Día {editForm.day}: {editForm.title}
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="text-gray-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Título de la Campaña</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full bg-carbon-950 border border-carbon-700 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Gancho de 3 Segundos (Hook)</label>
                <input
                  type="text"
                  value={editForm.hook || ''}
                  onChange={(e) => setEditForm({ ...editForm, hook: e.target.value })}
                  className="w-full bg-carbon-950 border border-carbon-700 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Texto Publicitario (Copy)</label>
                <textarea
                  rows={5}
                  value={editForm.copy}
                  onChange={(e) => setEditForm({ ...editForm, copy: e.target.value })}
                  className="w-full bg-carbon-950 border border-carbon-700 rounded-lg p-2 text-white font-sans"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Hashtags</label>
                <input
                  type="text"
                  value={editForm.hashtags}
                  onChange={(e) => setEditForm({ ...editForm, hashtags: e.target.value })}
                  className="w-full bg-carbon-950 border border-carbon-700 rounded-lg p-2 text-dorado-300 font-mono"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Guion de Voz en Off (Español Latino)</label>
                <textarea
                  rows={2}
                  value={editForm.voiceover}
                  onChange={(e) => setEditForm({ ...editForm, voiceover: e.target.value })}
                  className="w-full bg-carbon-950 border border-carbon-700 rounded-lg p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Estado de Aprobación</label>
                  <select
                    value={editForm.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                    className="w-full bg-carbon-950 border border-carbon-700 rounded-lg p-2 text-white"
                  >
                    <option value="draft">Borrador</option>
                    <option value="pending">Pendiente de Aprobación</option>
                    <option value="approved">Aprobado</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Llamado a la Acción (CTA)</label>
                  <input
                    type="text"
                    value={editForm.cta}
                    onChange={(e) => setEditForm({ ...editForm, cta: e.target.value })}
                    className="w-full bg-carbon-950 border border-carbon-700 rounded-lg p-2 text-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-carbon-800">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-lg bg-carbon-800 hover:bg-carbon-700 text-gray-300 text-xs font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-5 py-2 rounded-lg bg-dorado-500 hover:bg-dorado-400 text-carbon-950 text-xs font-bold shadow-md"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

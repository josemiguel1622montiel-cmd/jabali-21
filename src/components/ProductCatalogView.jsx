import React, { useState } from 'react';
import { 
  Beef, 
  Edit3, 
  Check, 
  AlertTriangle, 
  ShieldCheck, 
  DollarSign, 
  Package, 
  Tag, 
  Sparkles,
  Info
} from 'lucide-react';

export default function ProductCatalogView({ products, setProducts }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleStartEdit = (product) => {
    setEditingId(product.id);
    setEditForm({ ...product });
  };

  const handleSave = () => {
    setProducts((prev) =>
      prev.map((p) => (p.id === editForm.id ? editForm : p))
    );
    setEditingId(null);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-carbon-900 border border-madera-700/60 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Beef className="w-5 h-5 text-dorado-400" />
            <h2 className="font-brand text-2xl font-black text-white">
              Catálogo Oficial, Precios & Promociones
            </h2>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Administración estricta de productos cárnicos. Los precios y promociones registrados aquí son la única fuente oficial que utiliza la IA.
          </p>
        </div>

        {/* Safety Badge */}
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-olivo-950/60 border border-olivo-500/50 text-xs text-olivo-300">
          <ShieldCheck className="w-4 h-4 text-olivo-400" />
          <span>Regla Activa: Prohibido Inventar Datos Comerciales</span>
        </div>
      </div>

      {/* Strict Policy Banner */}
      <div className="rounded-xl bg-gradient-to-r from-madera-950 via-carbon-900 to-madera-950 border border-dorado-500/40 p-4 flex items-start space-x-3 shadow-lg">
        <Info className="w-5 h-5 text-dorado-400 shrink-0 mt-0.5" />
        <div className="text-xs text-gray-300 space-y-1">
          <p className="font-semibold text-dorado-300">
            Compromiso de Veracidad Comercial Jabalí 21:
          </p>
          <p>
            El agente de inteligencia artificial nunca asumirá ni inventará precios, ingredientes, disponibilidad ni descuentos. 
            Si un anuncio de venta no cuenta con un precio aquí registrado, solicitará al usuario ingresarlo antes de redactar o generar el material.
          </p>
        </div>
      </div>

      {/* Save Success Alert */}
      {saveSuccess && (
        <div className="rounded-xl bg-olivo-950 border border-olivo-500 p-3 text-xs text-olivo-200 flex items-center space-x-2 animate-fadeIn">
          <Check className="w-4 h-4 text-olivo-400" />
          <span>¡Catálogo actualizado con éxito! Los copys y generadores ahora usarán estos datos oficiales.</span>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((prod) => {
          const isEditing = editingId === prod.id;
          const hasPrice = prod.price && prod.price.trim() !== '';

          return (
            <div
              key={prod.id}
              className={`rounded-2xl border p-6 shadow-xl transition-all ${
                prod.isFlagship
                  ? 'bg-gradient-to-br from-madera-950/90 via-carbon-900 to-carbon-950 border-dorado-500/60'
                  : 'bg-carbon-900/90 border-carbon-800'
              }`}
            >
              {isEditing ? (
                /* Edit Mode */
                <div className="space-y-4 text-xs">
                  <div className="flex items-center justify-between border-b border-carbon-800 pb-2">
                    <h3 className="font-brand font-bold text-base text-dorado-300">
                      Editando {editForm.name}
                    </h3>
                    <span className="text-gray-400">{editForm.badge}</span>
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Precio Oficial</label>
                    <input
                      type="text"
                      placeholder="Ej. $480.00 MXN o $350 por kg"
                      value={editForm.price || ''}
                      onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                      className="w-full bg-carbon-950 border border-carbon-700 rounded-lg p-2 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Unidad o Presentación</label>
                    <input
                      type="text"
                      value={editForm.unit || ''}
                      onChange={(e) => setEditForm({ ...editForm, unit: e.target.value })}
                      className="w-full bg-carbon-950 border border-carbon-700 rounded-lg p-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Disponibilidad en Inventario</label>
                    <select
                      value={editForm.inStock ? 'true' : 'false'}
                      onChange={(e) => setEditForm({ ...editForm, inStock: e.target.value === 'true' })}
                      className="w-full bg-carbon-950 border border-carbon-700 rounded-lg p-2 text-white"
                    >
                      <option value="true">En Stock (Disponible para entrega)</option>
                      <option value="false">Sobre Pedido / Lotes Limitados</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Promoción Autorizada (Opcional)</label>
                    <input
                      type="text"
                      placeholder="Ej. 10% de descuento en la compra de 2 kg o Paquete con carbón gratis"
                      value={editForm.customPromo || ''}
                      onChange={(e) => setEditForm({ ...editForm, customPromo: e.target.value })}
                      className="w-full bg-carbon-950 border border-carbon-700 rounded-lg p-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Descripción Gastronómica</label>
                    <textarea
                      rows={3}
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      className="w-full bg-carbon-950 border border-carbon-700 rounded-lg p-2 text-white"
                    />
                  </div>

                  <div className="flex items-center justify-end space-x-2 pt-2 border-t border-carbon-800">
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-3 py-1.5 rounded-lg bg-carbon-800 text-gray-300 hover:bg-carbon-700"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-1.5 rounded-lg bg-dorado-500 hover:bg-dorado-400 text-carbon-950 font-bold"
                    >
                      Guardar Datos Oficiales
                    </button>
                  </div>
                </div>
              ) : (
                /* View Mode */
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-full bg-dorado-500/20 text-dorado-400 border border-dorado-500/40">
                      {prod.badge}
                    </span>

                    <button
                      onClick={() => handleStartEdit(prod)}
                      className="flex items-center space-x-1 text-xs text-gray-400 hover:text-dorado-400 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Editar Ficha</span>
                    </button>
                  </div>

                  <div>
                    <h3 className="font-brand font-black text-xl text-white">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-dorado-300 italic mt-0.5">
                      "{prod.tagline}"
                    </p>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed font-sans">
                    {prod.description}
                  </p>

                  {/* Attributes list */}
                  <div className="space-y-1.5 pt-2 border-t border-carbon-800 text-[11px] text-gray-300">
                    {prod.attributes.map((attr, idx) => (
                      <div key={idx} className="flex items-start space-x-1.5">
                        <span className="text-dorado-400">✦</span>
                        <span>{attr}</span>
                      </div>
                    ))}
                  </div>

                  {/* Commercial Focus */}
                  <div className="p-3 rounded-xl bg-carbon-950/80 border border-carbon-800 text-xs">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      Enfoque Publicitario Asignado por el Agente:
                    </span>
                    <p className="text-gray-200 mt-1 italic leading-relaxed">
                      {prod.commercialFocus}
                    </p>
                  </div>

                  {/* Price & Stock Card */}
                  <div className="p-3.5 rounded-xl bg-madera-950/60 border border-madera-800/80 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-gray-400 block uppercase font-bold">
                        Precio Oficial
                      </span>
                      {hasPrice ? (
                        <div className="font-brand font-bold text-base text-dorado-300 mt-0.5">
                          {prod.price} <span className="text-[11px] text-gray-400 font-sans">({prod.unit})</span>
                        </div>
                      ) : (
                        <div className="text-brasa-400 font-semibold text-xs flex items-center space-x-1 mt-0.5">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Sin registrar (La IA solicitará precio)</span>
                        </div>
                      )}
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 block uppercase font-bold">
                        Disponibilidad
                      </span>
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold mt-0.5 ${
                        prod.inStock
                          ? 'bg-olivo-900/60 text-olivo-400 border border-olivo-700/60'
                          : 'bg-carbon-800 text-gray-400'
                      }`}>
                        {prod.inStock ? 'Disponible' : 'Sobre Pedido'}
                      </span>
                    </div>
                  </div>

                  {/* Promo if any */}
                  {prod.customPromo && (
                    <div className="p-2.5 rounded-lg bg-dorado-950/40 border border-dorado-700/50 text-xs flex items-center space-x-2 text-dorado-300">
                      <Tag className="w-3.5 h-3.5 text-dorado-400" />
                      <span><strong>Promo Autorizada:</strong> {prod.customPromo}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

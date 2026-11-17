import React, { useState } from 'react';

const commercialVideo = '/Jabal%C3%AD_drinking_horchata_in_desert_bf773679.mp4';

export default function JabaliCommercialModal({ isOpen, onClose }) {
  const [hasVideoError, setHasVideoError] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-3 backdrop-blur-sm sm:p-6" onClick={onClose}>
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="jabali-spot-title"
        onClick={(event) => event.stopPropagation()}
        className="max-h-[96vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-dorado-500/50 bg-carbon-950 p-3 shadow-2xl sm:p-5"
      >
        <div className="flex items-center justify-between gap-3 px-1 pb-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-dorado-400 sm:text-xs">Comercial JABALÍ 21</p>
            <h2 id="jabali-spot-title" className="font-brand text-lg font-black text-white sm:text-xl">Una historia de sabor en el desierto</h2>
          </div>
          <button onClick={onClose} aria-label="Cerrar comercial" className="px-2 text-2xl text-gray-300 hover:text-white">✕</button>
        </div>

        <div className="relative aspect-video overflow-hidden rounded-xl border border-carbon-700 bg-black">
          {!hasVideoError ? (
            <video
              key={commercialVideo}
              className="h-full w-full object-contain"
              autoPlay
              muted
              playsInline
              controls
              preload="auto"
              onError={() => setHasVideoError(true)}
              aria-label="Comercial de Jabalí 21: un jabalí descubre una parrillada y agua de horchata en el desierto"
            >
              <source src={commercialVideo} type="video/mp4" />
              Tu navegador no puede reproducir este video.
            </video>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
              <span className="text-5xl" aria-hidden="true">🎬</span>
              <p className="text-lg font-bold text-white">No se pudo cargar el comercial.</p>
              <p className="text-sm text-gray-300">Revisa que el archivo MP4 esté en la carpeta public del proyecto.</p>
            </div>
          )}
        </div>

        <p className="mt-3 text-center text-xs text-gray-400">El video inicia silenciado; activa el sonido desde los controles para escuchar el comercial.</p>
      </section>
    </div>
  );
}

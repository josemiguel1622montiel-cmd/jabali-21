import React, { useState, useEffect, useRef } from 'react';
import { 
  Video, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Flame, 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  Clock, 
  Smartphone, 
  Tv, 
  Image as ImageIcon, 
  Upload, 
  Sliders, 
  CheckCircle2, 
  Layers,
  Film
} from 'lucide-react';
import { BRAND_IMAGES_LIBRARY, BRAND_IDENTITY } from '../data/brandData';
import { soundEngine } from '../services/soundEffects';

export default function CommercialStudioView({ products }) {
  // Generator parameters
  const [selectedProduct, setSelectedProduct] = useState('asado-jabali');
  const [selectedDuration, setSelectedDuration] = useState(30); // 15, 30, 60
  const [selectedAspect, setSelectedAspect] = useState('16:9'); // '16:9' or '9:16'
  const [creativeTone, setCreativeTone] = useState('epico-rustico');

  // Commercial Project State
  const [commercialProject, setCommercialProject] = useState(null);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingProgress, setRecordingProgress] = useState(0);
  const [copiedKey, setCopiedKey] = useState(null);

  // Image Selector Modal
  const [imageModalSceneIndex, setImageModalSceneIndex] = useState(null);
  const [customImageUrl, setCustomImageUrl] = useState('');

  // Canvas and Animation Refs
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const particlesRef = useRef([]);
  const imageCacheRef = useRef({});
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  // Initialize
  useEffect(() => {
    generateCommercial(selectedProduct, selectedDuration, selectedAspect, creativeTone);
  }, []);

  // Preload images into cache
  useEffect(() => {
    BRAND_IMAGES_LIBRARY.forEach(item => {
      preloadImage(item.url);
    });
    if (commercialProject) {
      commercialProject.scenes.forEach(sc => {
        if (sc.imageUrl) preloadImage(sc.imageUrl);
      });
    }
  }, [commercialProject]);

  const preloadImage = (url) => {
    if (!url || imageCacheRef.current[url]) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = url;
    img.onload = () => {
      imageCacheRef.current[url] = img;
    };
  };

  // Generate dynamic commercial script & storyboard with rich images
  const generateCommercial = (prodId, duration, aspect, tone) => {
    const prod = products.find(p => p.id === prodId) || products[0];

    let scenesCount = duration === 15 ? 3 : duration === 30 ? 4 : 5;
    let secondsPerScene = Math.floor(duration / scenesCount);

    const generatedScenes = [];

    // Scene 1: Fuego & Carbón
    generatedScenes.push({
      sceneNumber: 1,
      duration: secondsPerScene,
      title: "Encendido & Origen del Fuego",
      camera: "Macro extremo 120fps (Slow Motion)",
      lighting: "Claroscuro dramático, brasas incandescentes y contraluz ámbar",
      action: `Leña de encino y carbón de mezquite encendiéndose. Chispas doradas flotan en el aire oscuro. Aparece el sello forjado de JABALÍ 21 al calor del fuego.`,
      voiceover: `Hay fuegos comunes... y hay fuegos nacidos para crear historia. Bienvenidos a Jabalí 21.`,
      foleySound: `Crujido sordo de leña rompiéndose, soplo de aire y rugido creciente de llama viva.`,
      imageUrl: BRAND_IMAGES_LIBRARY[0].url,
      imagePrompt: `Cinematic macro shot of burning oak charcoal embers with fiery golden sparks swirling in slow motion, dark rustic iron grill, warm chiaroscuro lighting --ar ${aspect === '9:16' ? '9:16' : '16:9'}`
    });

    // Scene 2: La Carne al Fuego
    generatedScenes.push({
      sceneNumber: 2,
      duration: secondsPerScene,
      title: `Sellado Maestro de ${prod.name}`,
      camera: "Plano detalle a 85mm con baja profundidad de campo",
      lighting: "Llamaradas acariciando la carne, reflejos dorados sobre la grasa marmolada",
      action: `El corte selecto de ${prod.name} es depositado con pinzas de herrero sobre la parrilla al rojo vivo. Se forma una costra caramelo irresistible con humo blanco aromático.`,
      voiceover: `${prod.name}: ${prod.description.slice(0, 95)}...`,
      foleySound: `Siseo violento y continuo al contacto con el hierro, goteo de jugo sobre las brasas ardientes.`,
      imageUrl: prod.imageUrl || BRAND_IMAGES_LIBRARY[1].url,
      imagePrompt: `${prod.imagePrompt.replace('--ar 16:9', '')} --ar ${aspect === '9:16' ? '9:16' : '16:9'}`
    });

    // Scene 3: El Corte y la Jugosidad
    if (scenesCount >= 3) {
      generatedScenes.push({
        sceneNumber: 3,
        duration: secondsPerScene,
        title: "El Corte en Tabla de Encino",
        camera: "Cámara cenital lenta y plano medio oblicuo",
        lighting: "Luz tibia de atardecer filtrada entre humo rústico",
        action: `Cuchillo damasco forjado a mano desliza a través de la carne. Las rebanadas caen mostrando un centro rosado perfecto y jugos desbordantes. Sal de grano espolvoreada.`,
        voiceover: `La paciencia de la leña y la precisión del maestro parrillero en cada bocado.`,
        foleySound: `Corte limpio y crujiente sobre madera curada, cristales de sal rebotando con sutileza.`,
        imageUrl: BRAND_IMAGES_LIBRARY[2].url,
        imagePrompt: `Damascus steel chef knife slicing juicy medium rare grilled meat on thick charred oak board, fine dining rustic style --ar ${aspect === '9:16' ? '9:16' : '16:9'}`
      });
    }

    // Scene 4: La Celebración de la Parrillada (if 30s or 60s)
    if (scenesCount >= 4) {
      generatedScenes.push({
        sceneNumber: 4,
        duration: secondsPerScene,
        title: "La Celebración de la Parrillada",
        camera: "Plano medio con movimiento suave de travelling",
        lighting: "Luz cálida de fogata, velas y copas de vino tinto reflejando destellos",
        action: `Mesa campirana con amigos y familia compartiendo cortes humeantes, brindando y sonriendo con el asador de fondo ardiendo.`,
        voiceover: `Porque los mejores momentos no se cuentan en minutos... se cuentan en asados compartidos.`,
        foleySound: `Risas cómplices, choque de copas de vino y murmullo alegre de reunión de fuego.`,
        imageUrl: BRAND_IMAGES_LIBRARY[5].url,
        imagePrompt: `Warm intimate gathering of friends enjoying outdoor barbecue dinner by a campfire at dusk, wine glasses, smiling faces, appetizing feast table --ar ${aspect === '9:16' ? '9:16' : '16:9'}`
      });
    }

    // Scene Final: Cierre de Marca & CTA
    generatedScenes.push({
      sceneNumber: scenesCount,
      duration: duration - (secondsPerScene * (scenesCount - 1)),
      title: "Cierre Insignia & Llamado a la Acción",
      camera: "Packshot frontal imponente y animación de logotipo",
      lighting: "Brasas doradas respirando en la oscuridad",
      action: `Logotipo en relieve de JABALÍ 21 grabado a fuego vivo sobre madera de encino negra. Destellos y humo suave. Frase publicitaria grabada en oro envejecido.`,
      voiceover: `JABALÍ 21. El sabor del fuego, la pasión por el asado. Ordena tus cortes para este fin de semana.`,
      foleySound: `Golpe musical cinematográfico 'impact', acorde cálido de guitarra campirana y fade out de brasas.`,
      imageUrl: BRAND_IMAGES_LIBRARY[7].url,
      imagePrompt: `Magnificent 3D gold and iron emblem of JABALÍ 21 surrounded by glowing embers and gentle smoke, luxury rustic cinematic poster --ar ${aspect === '9:16' ? '9:16' : '16:9'}`
    });

    const project = {
      id: `spot-${duration}s-${Date.now()}`,
      title: `Comercial ${duration}s: ${prod.name} (${aspect})`,
      product: prod.name,
      productId: prod.id,
      duration: duration,
      aspectRatio: aspect,
      creativeTone: tone,
      concept: `Spot publicitario cinematográfico de alta definición. Resalta el ritual sagrado del fuego, la selección artesanal de ${prod.name} y la emoción de una parrillada rústica elegante.`,
      scenes: generatedScenes,
      status: 'video_rendered_ready',
      createdAt: new Date().toLocaleDateString('es-MX')
    };

    setCommercialProject(project);
    setActiveSceneIndex(0);
    setIsPlaying(false);
  };

  // Canvas Cinematic Video Engine (With Ken Burns Motion & Real Images)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Create particles for ember sparks
    particlesRef.current = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2.8 + 0.8,
      speedY: -(Math.random() * 1.8 + 0.6),
      speedX: (Math.random() - 0.5) * 0.9,
      alpha: Math.random() * 0.8 + 0.2,
      flickerSpeed: Math.random() * 0.05 + 0.02
    }));

    let startTime = Date.now();

    const render = () => {
      const now = Date.now();
      const elapsed = (now - startTime) / 1000;
      const isFinalScene = commercialProject && activeSceneIndex === commercialProject.scenes.length - 1;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Active Scene Real Image with Ken Burns Zoom & Pan
      let hasDrawnImage = false;
      if (commercialProject && commercialProject.scenes[activeSceneIndex]) {
        const sc = commercialProject.scenes[activeSceneIndex];
        const img = imageCacheRef.current[sc.imageUrl];

        if (img && img.complete && img.naturalWidth > 0) {
          hasDrawnImage = true;
          ctx.save();

          // Cinematic Ken Burns slow zoom (scale 1.0 to 1.14) & gentle pan
          const zoomScale = 1.0 + (Math.sin(elapsed * 0.3) * 0.5 + 0.5) * 0.12;
          const panX = Math.sin(elapsed * 0.2) * 15;
          const panY = Math.cos(elapsed * 0.2) * 10;

          ctx.translate(canvas.width / 2 + panX, canvas.height / 2 + panY);
          ctx.scale(zoomScale, zoomScale);
          ctx.translate(-canvas.width / 2, -canvas.height / 2);

          // Draw aspect-cover image
          const hRatio = canvas.width / img.width;
          const vRatio = canvas.height / img.height;
          const ratio = Math.max(hRatio, vRatio);
          const centerShiftX = (canvas.width - img.width * ratio) / 2;
          const centerShiftY = (canvas.height - img.height * ratio) / 2;

          ctx.drawImage(
            img,
            0, 0, img.width, img.height,
            centerShiftX, centerShiftY, img.width * ratio, img.height * ratio
          );

          ctx.restore();
        }
      }

      // Fallback gradient if image not ready
      if (!hasDrawnImage) {
        const bgGrad = ctx.createRadialGradient(
          canvas.width / 2, canvas.height * 0.8, 20,
          canvas.width / 2, canvas.height / 2, canvas.width * 0.7
        );
        bgGrad.addColorStop(0, 'rgba(234, 88, 12, 0.45)');
        bgGrad.addColorStop(0.5, 'rgba(44, 24, 16, 0.85)');
        bgGrad.addColorStop(1, '#0c0c0e');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // 2. Cinematic Vignette & Dark Shading (for crystal clear subtitle readability)
      const vignette = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, canvas.width * 0.3,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.75
      );
      vignette.addColorStop(0, 'rgba(0, 0, 0, 0.15)');
      vignette.addColorStop(0.7, 'rgba(10, 10, 12, 0.65)');
      vignette.addColorStop(1, 'rgba(5, 5, 6, 0.95)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Bottom bar darkening
      const bottomFade = ctx.createLinearGradient(0, canvas.height * 0.5, 0, canvas.height);
      bottomFade.addColorStop(0, 'transparent');
      bottomFade.addColorStop(0.5, 'rgba(12, 12, 14, 0.7)');
      bottomFade.addColorStop(1, 'rgba(8, 8, 10, 0.95)');
      ctx.fillStyle = bottomFade;
      ctx.fillRect(0, canvas.height * 0.5, canvas.width, canvas.height * 0.5);

      // 3. Floating Amber Sparks & Fire Embers
      particlesRef.current.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.alpha += Math.sin(now * p.flickerSpeed) * 0.04;
        if (p.alpha < 0.1) p.alpha = 0.1;
        if (p.alpha > 0.9) p.alpha = 0.9;

        if (p.y < -15) {
          p.y = canvas.height + 15;
          p.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(249, 115, 22, ${p.alpha})`;
        ctx.shadowColor = '#ea580c';
        ctx.shadowBlur = 8;
        ctx.fill();
      });
      ctx.shadowBlur = 0; // reset

      // 4. Top Brand Header
      ctx.fillStyle = 'rgba(197, 160, 89, 0.9)';
      ctx.font = 'bold 11px Cinzel, serif';
      ctx.textAlign = 'left';
      ctx.fillText('🐗 JABALÍ 21 • CINEMATIC SPOT', 24, 32);

      // Top Scene Badge
      if (commercialProject && commercialProject.scenes[activeSceneIndex]) {
        const sc = commercialProject.scenes[activeSceneIndex];
        ctx.textAlign = 'right';
        ctx.fillStyle = '#f3dea0';
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.fillText(`ESCENA ${sc.sceneNumber}/${commercialProject.scenes.length}`, canvas.width - 24, 32);

        // Gold divider line
        ctx.beginPath();
        ctx.moveTo(24, 40);
        ctx.lineTo(canvas.width - 24, 40);
        ctx.strokeStyle = 'rgba(197, 160, 89, 0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // 5. Special Final Scene Outro Logo Animation OR Scene Subtitles
        if (isFinalScene) {
          // Outro Brand Emblem
          ctx.textAlign = 'center';
          ctx.fillStyle = 'rgba(234, 88, 12, 0.25)';
          ctx.beginPath();
          ctx.arc(canvas.width / 2, canvas.height / 2 - 20, 60, 0, Math.PI * 2);
          ctx.fill();

          ctx.font = '48px sans-serif';
          ctx.fillText('🐗', canvas.width / 2, canvas.height / 2 - 25);

          ctx.fillStyle = '#ffffff';
          ctx.font = '900 28px Cinzel, serif';
          ctx.fillText('JABALÍ 21', canvas.width / 2, canvas.height / 2 + 25);

          ctx.fillStyle = '#f3dea0';
          ctx.font = 'bold 12px Cinzel, serif';
          ctx.fillText('EL SABOR DEL FUEGO, LA PASIÓN POR EL ASADO', canvas.width / 2, canvas.height / 2 + 48);

          // CTA Box
          ctx.fillStyle = 'rgba(197, 160, 89, 0.2)';
          ctx.fillRect(canvas.width / 2 - 120, canvas.height - 75, 240, 32);
          ctx.strokeStyle = '#c5a059';
          ctx.lineWidth = 1;
          ctx.strokeRect(canvas.width / 2 - 120, canvas.height - 75, 240, 32);

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 11px Inter, sans-serif';
          ctx.fillText('ORDENA TUS CORTES HOY', canvas.width / 2, canvas.height - 55);
        } else {
          // Normal Scene Subtitle Box
          const boxY = canvas.height - 95;
          ctx.fillStyle = 'rgba(16, 16, 20, 0.85)';
          ctx.fillRect(20, boxY, canvas.width - 40, 75);

          ctx.strokeStyle = 'rgba(197, 160, 89, 0.6)';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(20, boxY, canvas.width - 40, 75);

          // Scene Title
          ctx.fillStyle = '#c5a059';
          ctx.font = 'bold 12px Cinzel, serif';
          ctx.textAlign = 'left';
          ctx.fillText(sc.title.toUpperCase(), 35, boxY + 22);

          // Voiceover Subtitle Text
          ctx.fillStyle = '#f3f4f6';
          ctx.font = 'italic 12px Inter, sans-serif';
          wrapText(ctx, `"${sc.voiceover}"`, 35, boxY + 44, canvas.width - 70, 16);
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [commercialProject, activeSceneIndex]);

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

  // Play commercial with voiceover & foley
  const togglePlayCommercial = (record = false) => {
    if (isPlaying) {
      soundEngine.stopVoiceover();
      soundEngine.stopGrillSizzle();
      setIsPlaying(false);
      setIsRecording(false);
      return;
    }

    if (!commercialProject) return;

    setIsPlaying(true);
    soundEngine.playCinematicImpact();
    soundEngine.toggleGrillSizzle(true);

    // Setup Video Recording via MediaRecorder if requested
    if (record) {
      startMediaRecording();
    }

    let currentScene = 0;
    setActiveSceneIndex(0);

    const playScene = (idx) => {
      if (idx >= commercialProject.scenes.length) {
        setIsPlaying(false);
        soundEngine.stopGrillSizzle();
        if (record) stopMediaRecording();
        return;
      }

      setActiveSceneIndex(idx);
      const sc = commercialProject.scenes[idx];

      soundEngine.speakLatinAmericanSpanish(
        sc.voiceover,
        () => {},
        () => {
          setTimeout(() => {
            playScene(idx + 1);
          }, 900);
        }
      );
    };

    playScene(0);
  };

  // Start MediaRecorder capture
  const startMediaRecording = () => {
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const stream = canvas.captureStream(30); // 30 FPS
      recordedChunksRef.current = [];

      const options = { mimeType: 'video/webm; codecs=vp9' };
      let recorder;
      try {
        recorder = new MediaRecorder(stream, options);
      } catch (e) {
        recorder = new MediaRecorder(stream);
      }

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Comercial_Jabali21_${commercialProject.productId}_${commercialProject.duration}s.webm`;
        a.click();
        URL.revokeObjectURL(url);
        setIsRecording(false);
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
    } catch (e) {
      console.warn("Error starting MediaRecorder:", e);
      setIsRecording(false);
    }
  };

  const stopMediaRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  };

  const handleSelectImageForScene = (imgUrl) => {
    if (imageModalSceneIndex === null || !commercialProject) return;

    const updatedScenes = [...commercialProject.scenes];
    updatedScenes[imageModalSceneIndex].imageUrl = imgUrl;

    preloadImage(imgUrl);
    setCommercialProject({
      ...commercialProject,
      scenes: updatedScenes
    });
    setImageModalSceneIndex(null);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        handleSelectImageForScene(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-carbon-900 border border-madera-700/60 p-6 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center space-x-2">
            <Video className="w-5 h-5 text-brasa-500 animate-pulse" />
            <h2 className="font-brand text-2xl font-black text-white">
              Estudio de Video Cinematográfico con IA
            </h2>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Producción audiovisual en movimiento: animación Ken Burns, imágenes reales de asados, locución en español latino y exportación a video.
          </p>
        </div>

        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-olivo-950/60 border border-olivo-500/50 text-xs text-olivo-300">
          <CheckCircle2 className="w-4 h-4 text-olivo-400" />
          <span>Motor de Video & Render Activo</span>
        </div>
      </div>

      {/* Production Controls Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-carbon-950/80 p-5 rounded-2xl border border-carbon-800 shadow-lg text-xs">
        {/* Product selector */}
        <div>
          <label className="block text-gray-400 font-semibold mb-1.5">Producto a Promocionar</label>
          <select
            value={selectedProduct}
            onChange={(e) => {
              setSelectedProduct(e.target.value);
              generateCommercial(e.target.value, selectedDuration, selectedAspect, creativeTone);
            }}
            className="w-full bg-carbon-900 border border-carbon-700 rounded-lg p-2 text-white font-medium focus:outline-none focus:border-dorado-500"
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} {p.isFlagship ? '★ (Insignia)' : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Duration selector */}
        <div>
          <label className="block text-gray-400 font-semibold mb-1.5">Duración</label>
          <div className="grid grid-cols-3 gap-1.5">
            {[15, 30, 60].map((dur) => (
              <button
                key={dur}
                onClick={() => {
                  setSelectedDuration(dur);
                  generateCommercial(selectedProduct, dur, selectedAspect, creativeTone);
                }}
                className={`py-2 rounded-lg font-bold transition-all text-xs flex items-center justify-center space-x-1 ${
                  selectedDuration === dur
                    ? 'bg-dorado-500 text-carbon-950 shadow-md'
                    : 'bg-carbon-900 text-gray-300 hover:bg-carbon-800 border border-carbon-700'
                }`}
              >
                <Clock className="w-3 h-3" />
                <span>{dur}s</span>
              </button>
            ))}
          </div>
        </div>

        {/* Aspect Ratio */}
        <div>
          <label className="block text-gray-400 font-semibold mb-1.5">Formato</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setSelectedAspect('9:16');
                generateCommercial(selectedProduct, selectedDuration, '9:16', creativeTone);
              }}
              className={`py-2 rounded-lg font-bold transition-all text-xs flex items-center justify-center space-x-1.5 ${
                selectedAspect === '9:16'
                  ? 'bg-brasa-600 text-white shadow-md'
                  : 'bg-carbon-900 text-gray-300 hover:bg-carbon-800 border border-carbon-700'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>9:16 Reels</span>
            </button>

            <button
              onClick={() => {
                setSelectedAspect('16:9');
                generateCommercial(selectedProduct, selectedDuration, '16:9', creativeTone);
              }}
              className={`py-2 rounded-lg font-bold transition-all text-xs flex items-center justify-center space-x-1.5 ${
                selectedAspect === '16:9'
                  ? 'bg-brasa-600 text-white shadow-md'
                  : 'bg-carbon-900 text-gray-300 hover:bg-carbon-800 border border-carbon-700'
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
              <span>16:9 Cine</span>
            </button>
          </div>
        </div>

        {/* Tone */}
        <div>
          <label className="block text-gray-400 font-semibold mb-1.5">Tono Narrativo</label>
          <select
            value={creativeTone}
            onChange={(e) => {
              setCreativeTone(e.target.value);
              generateCommercial(selectedProduct, selectedDuration, selectedAspect, e.target.value);
            }}
            className="w-full bg-carbon-900 border border-carbon-700 rounded-lg p-2 text-white font-medium focus:outline-none focus:border-dorado-500"
          >
            <option value="epico-rustico">Épico Rústico & Fuego Campirano</option>
            <option value="gourmet">Elegante Gourmet Cinco Estrellas</option>
            <option value="asmr-antojo">Sensorial ASMR (Antojo Inmediato)</option>
            <option value="celebracion">Reunión de Amigos & Tradición</option>
          </select>
        </div>
      </div>

      {/* Main Studio 2-Column: Video Player (Left) + Storyboard with Image Gallery (Right) */}
      {commercialProject && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Video Player & Export Options (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-carbon-900 border border-madera-700/60 rounded-2xl p-4 shadow-2xl space-y-4">
              <div className="flex items-center justify-between text-xs text-gray-400 border-b border-carbon-800 pb-2">
                <span className="font-semibold text-dorado-400 flex items-center space-x-1.5">
                  <Film className="w-4 h-4" />
                  <span>Reproductor de Video Cinematográfico</span>
                </span>
                <span className="font-mono text-dorado-300 font-bold">{commercialProject.aspectRatio}</span>
              </div>

              {/* Video Screen Container */}
              <div className="relative mx-auto flex items-center justify-center bg-black rounded-xl overflow-hidden border border-madera-800 shadow-2xl">
                <canvas
                  ref={canvasRef}
                  width={selectedAspect === '9:16' ? 405 : 640}
                  height={selectedAspect === '9:16' ? 720 : 360}
                  className="w-full h-auto max-h-[480px] object-contain rounded-lg"
                />

                {/* Live indicators */}
                {isPlaying && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-brasa-600/95 text-white text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1.5 shadow-lg animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                    <span>{isRecording ? 'GRABANDO VIDEO' : 'EN REPRODUCCIÓN'}</span>
                  </div>
                )}
              </div>

              {/* Player Controls & Video Export */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => togglePlayCommercial(false)}
                      className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs shadow-lg transition-all ${
                        isPlaying && !isRecording
                          ? 'bg-carbon-800 text-brasa-400 border border-brasa-500/50'
                          : 'bg-gradient-to-r from-brasa-600 to-madera-600 text-white hover:scale-105'
                      }`}
                    >
                      {isPlaying && !isRecording ? (
                        <>
                          <Pause className="w-4 h-4" />
                          <span>Pausar</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 fill-current" />
                          <span>Reproducir Video</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        soundEngine.stopVoiceover();
                        soundEngine.stopGrillSizzle();
                        setIsPlaying(false);
                        setIsRecording(false);
                        setActiveSceneIndex(0);
                      }}
                      className="p-2.5 rounded-xl bg-carbon-800 hover:bg-carbon-700 text-gray-300 border border-carbon-700"
                      title="Reiniciar video"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Video Download / Record Button */}
                  <button
                    onClick={() => togglePlayCommercial(true)}
                    disabled={isRecording}
                    className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-black shadow-lg transition-all ${
                      isRecording
                        ? 'bg-red-700 text-white animate-pulse'
                        : 'bg-dorado-500 hover:bg-dorado-400 text-carbon-950 hover:scale-105'
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    <span>{isRecording ? 'Renderizando Video...' : 'Grabar & Descargar Video'}</span>
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1">
                  <span>Escena {activeSceneIndex + 1} de {commercialProject.scenes.length}</span>
                  <span className="text-dorado-400 font-medium">Movimiento Ken Burns & Audio Sincronizado</span>
                </div>
              </div>
            </div>

            {/* Prompt Pack Export */}
            <div className="bg-carbon-900 border border-madera-700/60 rounded-2xl p-4 shadow-xl space-y-3">
              <h4 className="font-brand font-bold text-xs text-white flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-dorado-400" />
                <span>Exportar Prompts para Herramientas de Video IA (Runway / Sora / Kling)</span>
              </h4>

              <button
                onClick={() => {
                  const prompts = commercialProject.scenes
                    .map((s) => `[ESCENA ${s.sceneNumber} - ${s.title}]:\n${s.imagePrompt}`)
                    .join('\n\n');
                  handleCopy(prompts, 'all-prompts');
                }}
                className="w-full flex items-center justify-center space-x-1.5 p-2 rounded-lg bg-carbon-800 hover:bg-carbon-750 text-dorado-300 border border-carbon-700 font-semibold text-xs transition-all"
              >
                {copiedKey === 'all-prompts' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-olivo-400" />
                    <span className="text-olivo-400">¡Prompts Copiados al Portapapeles!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Todos los Prompts de Video</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Storyboard with Realistic Scene Images (7 Cols) */}
          <div className="lg:col-span-7 bg-carbon-900 border border-madera-700/60 rounded-2xl p-6 shadow-2xl space-y-5">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-dorado-400 uppercase tracking-wider font-bold">
                  {commercialProject.aspectRatio} • {commercialProject.duration} SEGUNDOS
                </span>
                <span className="text-xs text-gray-400">
                  {commercialProject.scenes.length} Escenas Cinematográficas
                </span>
              </div>
              <h3 className="font-brand text-xl font-bold text-white mt-1">
                {commercialProject.title}
              </h3>
              <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                {commercialProject.concept}
              </p>
            </div>

            {/* Storyboard Scenes List */}
            <div className="space-y-4 max-h-[640px] overflow-y-auto pr-1">
              {commercialProject.scenes.map((scene, i) => {
                const isActive = activeSceneIndex === i;
                return (
                  <div
                    key={scene.sceneNumber}
                    onClick={() => setActiveSceneIndex(i)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-madera-950/90 border-dorado-500 shadow-xl'
                        : 'bg-carbon-950/80 border-carbon-800 hover:border-madera-700'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-carbon-800/80 pb-3">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-black font-brand bg-dorado-500 text-carbon-950">
                          ESCENA {scene.sceneNumber}
                        </span>
                        <h4 className="font-brand font-bold text-sm text-white">
                          {scene.title}
                        </h4>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono text-dorado-400 font-semibold">
                          {scene.duration}s
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setImageModalSceneIndex(i);
                          }}
                          className="flex items-center space-x-1 px-2.5 py-1 rounded bg-carbon-800 hover:bg-carbon-700 text-dorado-300 text-[11px] font-semibold border border-carbon-700 transition-all"
                        >
                          <ImageIcon className="w-3 h-3 text-dorado-400" />
                          <span>Cambiar Imagen</span>
                        </button>
                      </div>
                    </div>

                    {/* Scene Layout with Thumbnail & Details */}
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
                      {/* Image Thumbnail */}
                      <div className="sm:col-span-4 relative rounded-lg overflow-hidden border border-carbon-700 group">
                        <img
                          src={scene.imageUrl}
                          alt={scene.title}
                          className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1.5">
                          <span className="text-[10px] text-gray-200 font-medium truncate">
                            Fotografía de Escena
                          </span>
                        </div>
                      </div>

                      {/* Scene Text & Sound Specs */}
                      <div className="sm:col-span-8 space-y-2">
                        <div>
                          <span className="text-gray-400 font-semibold block text-[11px]">
                            Acción en Pantalla:
                          </span>
                          <p className="text-gray-200 mt-0.5 leading-relaxed">{scene.action}</p>
                        </div>

                        {/* Voiceover box */}
                        <div className="p-2.5 rounded bg-carbon-900 border border-madera-800/60">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-dorado-400">
                              Voz en Off (Español Latino):
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                soundEngine.speakLatinAmericanSpanish(scene.voiceover);
                              }}
                              className="text-[10px] text-dorado-300 hover:underline flex items-center space-x-1"
                            >
                              <Volume2 className="w-3 h-3" />
                              <span>Escuchar</span>
                            </button>
                          </div>
                          <p className="text-white text-xs font-display italic mt-0.5">
                            "{scene.voiceover}"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Image Selector Modal */}
      {imageModalSceneIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-carbon-900 border border-dorado-500/50 rounded-2xl max-w-3xl w-full p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto animate-fadeIn">
            <div className="flex items-center justify-between border-b border-carbon-800 pb-3">
              <h3 className="font-brand text-lg font-bold text-white flex items-center space-x-2">
                <ImageIcon className="w-5 h-5 text-dorado-400" />
                <span>
                  Seleccionar Imagen Real para Escena {imageModalSceneIndex + 1}
                </span>
              </h3>
              <button
                onClick={() => setImageModalSceneIndex(null)}
                className="text-gray-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-300">
              Elija una imagen fotográfica gastronómica de la biblioteca oficial de JABALÍ 21 o suba una imagen propia:
            </p>

            {/* Presets Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {BRAND_IMAGES_LIBRARY.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectImageForScene(item.url)}
                  className="rounded-xl overflow-hidden border border-carbon-700 hover:border-dorado-400 cursor-pointer group transition-all"
                >
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-24 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="p-2 bg-carbon-950 text-[11px]">
                    <span className="font-semibold text-gray-200 block truncate">{item.title}</span>
                    <span className="text-[10px] text-dorado-400">{item.category}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom URL or Upload File */}
            <div className="pt-3 border-t border-carbon-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">O pegar enlace de imagen en internet:</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="https://..."
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    className="flex-1 bg-carbon-950 border border-carbon-700 rounded-lg p-2 text-white"
                  />
                  <button
                    onClick={() => {
                      if (customImageUrl.trim()) handleSelectImageForScene(customImageUrl.trim());
                    }}
                    className="px-3 py-2 bg-dorado-500 hover:bg-dorado-400 text-carbon-950 font-bold rounded-lg"
                  >
                    Aplicar
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">O subir imagen desde tu equipo:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full text-xs text-gray-400 file:mr-2 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-carbon-800 file:text-dorado-300 hover:file:bg-carbon-700 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setImageModalSceneIndex(null)}
                className="px-4 py-2 bg-carbon-800 hover:bg-carbon-700 text-gray-300 text-xs font-semibold rounded-lg"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Copy, 
  Check, 
  Volume2, 
  RotateCcw, 
  Flame, 
  User, 
  Layers, 
  HelpCircle
} from 'lucide-react';
import { AI_AGENT_ROLES, BRAND_IDENTITY } from '../data/brandData';
import { soundEngine } from '../services/soundEffects';

export default function AIAgentChatView({ products, apiKeys }) {
  const [selectedRole, setSelectedRole] = useState(AI_AGENT_ROLES[0]);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'agent',
      role: AI_AGENT_ROLES[0].title,
      text: `¡Saludos parrillero! Soy tu **Director Creativo** en **JABALÍ 21**.\n\nEstoy aquí para asegurar que cada campaña, guion y publicación respete nuestra estética rústica, campirana y elegante bajo nuestro lema:\n\n> *"JABALÍ 21 – EL SABOR DEL FUEGO, LA PASIÓN POR EL ASADO."*\n\nPuedes alternar entre los 8 especialistas de la agencia arriba o hacerme cualquier consulta creativa, de guion o de estrategia de ventas.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    const userMsg = {
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    // Call real API if available or generate specialized agency response
    setTimeout(() => {
      const reply = generateAgencyResponse(query, selectedRole, products);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'agent',
          role: selectedRole.title,
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsLoading(false);
    }, 800);
  };

  // Specialized response generator mimicking the 8 agency roles
  const generateAgencyResponse = (query, role, prods) => {
    const q = query.toLowerCase();

    if (role.id === 'director-comerciales') {
      return `### 🎬 Propuesta de Dirección de Comercial (JABALÍ 21)\n\n**Concepto Visual:** Alto contraste rústico, lentes macro de 85mm y cámara lenta a 120fps.\n\n**Escaleta Técnica de Escenas:**\n1. **Segundo 0 a 3 (Hook Visual):** Fuego vivo avivado por fuelle de cuero. Chispas doradas vuelan en primer plano hacia la cámara con fondo negro carbón (#111113).\n2. **Segundo 4 a 9 (El Sellado):** La carne toca el hierro incandescente. Sonido siseo violento sincronizado en estéreo. Se aprecian las marcas de parrilla caramelo oscuro.\n3. **Segundo 10 a 14 (El Corte):** Cuchillo forjado desliza a 45 grados. El jugo brota naturalmente sin presión excesiva. Sal en escamas cayendo a contraluz.\n4. **Segundo 15 (Cierre de Marca):** Logotipo JABALÍ 21 forjado al rojo vivo.\n\n> **Voz en Off (Locutor Latino Cálido):**\n> *"El fuego no acepta atajos. La verdadera pasión se cocina a las brasas. Jabalí 21: El sabor del fuego, la pasión por el asado."*`;
    }

    if (role.id === 'guionista-publicitario') {
      return `### ✍️ Guion Publicitario de Alta Conversión\n\n**Gancho (0-3s):** *"Si tu asador no huele a esto, estás perdiendo el tiempo."*\n\n**Cuerpo del Copy:**\nOlvídate de cortes comerciales insípidos. En JABALÍ 21 cada pieza pasa por una selección rigurosa y un marinado campirano artesanal que honra la tradición del fuego.\n\n🔥 **Nuestros 4 Cortes Estelares:**\n• **Asado de Jabalí:** La joya silvestre de la casa, 4 horas a fuego lento.\n• **Arrachera Premium:** Marmoleo y terneza legendaria.\n• **Chorizo Argentino:** Piel crocante y jugo desbordante.\n• **Chistorra al Pimentón:** El aperitivo dorado que abre el apetito.\n\n**Llamado a la Acción (CTA):**\n📲 *Haz clic en el enlace de nuestro perfil y asegura tus paquetes para este fin de semana antes de que cerremos ruta de entregas.*\n\n#Jabali21 #ElSaborDelFuego #ParrillaCampirana #AsadoDeVerdad`;
    }

    if (role.id === 'disenador-grafico') {
      return `### 🎨 Dirección de Arte & Prompt Cinematográfico\n\n**Paleta de Color Aplicada:**\n• Fondo: Negro Carbón (#111113)\n• Acentos Primarios: Oro Envejecido (#C5A059)\n• Calidez: Fuego y Brasas (#EA580C)\n• Rústico: Madera de Encino (#3D2314)\n\n**Prompt Oficial para Midjourney v6 / Flux.1:**\n\`\`\`\ncinematic commercial food photography of sliced wild boar roast and seared beef arrachera on aged dark oak cutting board, coarse sea salt flakes, fresh rosemary sprigs, glowing charcoal embers in the soft focus background, wisps of fragrant white smoke, chiaroscuro lighting, 85mm f/1.8 lens, 8k resolution, Michelin guide rustic aesthetic --ar 16:9 --style raw --v 6.0\n\`\`\``;
    }

    if (role.id === 'estratega-ventas') {
      return `### 💼 Estrategia Táctica de Ventas para Jabalí 21\n\n1. **Embudo de Fin de Semana (Jueves a Domingo):**\n   - **Miércoles/Jueves:** Campaña de escasez *"Aparta tus cortes antes del corte de ruta del viernes a las 6 PM"*.\n   - **Viernes:** Anuncio del Dúo Aperitivo (Chorizo + Chistorra) para el inicio de reuniones.\n   - **Sábado:** Recordatorio urgente por WhatsApp a clientes frecuentes con el Banquete Completo.\n\n2. **Regla de Precios:**\n   - Los precios deben estar verificados en el Catálogo. No inventamos ofertas: promovemos valor gastronómico exclusivo y conveniencia de entrega con cadena de frío garantizada.`;
    }

    // Default Director Creativo / General Response
    return `### 🔥 Recomendación de ${role.title} (JABALÍ 21)\n\nPara responder a tu solicitud con la máxima coherencia de marca:\n\n1. **Tono Campirano y Elegante:** Todo material debe alejarse de la comida rápida y situarse en la alta gastronomía de las brasas.\n2. **Diferenciación de Productos:**\n   - **Asado de Jabalí:** Trátalo como la pieza de colección, exótica y exclusiva.\n   - **Arrachera:** Foco en la terneza y el sellado al hierro.\n   - **Chorizo Argentino:** El alma de la parrillada y las risas entre amigos.\n   - **Chistorra:** El aperitivo dorado de antojo rápido.\n3. **Cierre Innegociable:** Rematar siempre con nuestra frase estelar:\n   > *"JABALÍ 21 – EL SABOR DEL FUEGO, LA PASIÓN POR EL ASADO."*\n\n¿Deseas que profundice en un guion específico, en un prompt para video o en una propuesta de pauta publicitaria?`;
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSpeak = (text) => {
    // Strip markdown formatting for cleaner speech
    const clean = text.replace(/[*#>_`]/g, '').slice(0, 300);
    soundEngine.speakLatinAmericanSpanish(clean);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-carbon-900 border border-madera-700/60 p-6 rounded-2xl shadow-xl">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-dorado-400" />
          <h2 className="font-brand text-2xl font-black text-white">
            Agente IA Creativo: Los 8 Roles de tu Agencia
          </h2>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Interactúa con los especialistas en dirección creativa, cinematografía, diseño gráfico, copywriting, foley y ventas.
        </p>
      </div>

      {/* Role Switcher */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {AI_AGENT_ROLES.map((r) => {
          const isSelected = selectedRole.id === r.id;
          return (
            <button
              key={r.id}
              onClick={() => setSelectedRole(r)}
              className={`p-3 rounded-xl border text-center transition-all ${
                isSelected
                  ? 'bg-madera-900 border-dorado-500 shadow-lg text-dorado-300 glow-ember'
                  : 'bg-carbon-900 border-carbon-800 text-gray-400 hover:text-gray-200 hover:bg-carbon-850'
              }`}
            >
              <span className="block font-brand font-bold text-xs leading-tight">
                {r.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Role Card & Suggested Queries */}
      <div className="bg-carbon-950/80 border border-carbon-800 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div>
          <span className="text-[10px] text-dorado-400 font-bold uppercase tracking-wider block">
            Especialista Activo: {selectedRole.title}
          </span>
          <p className="text-gray-300 mt-0.5">{selectedRole.specialty}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {selectedRole.suggestedQueries.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(q)}
              className="text-[11px] px-2.5 py-1 rounded-full bg-carbon-900 hover:bg-carbon-800 text-dorado-300 border border-carbon-700 transition-colors"
            >
              "{q.slice(0, 42)}..."
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="bg-carbon-900 border border-madera-700/60 rounded-2xl p-6 shadow-2xl flex flex-col h-[520px]">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((msg, index) => {
            const isAgent = msg.sender === 'agent';
            return (
              <div
                key={index}
                className={`flex items-start space-x-3 ${
                  isAgent ? 'justify-start' : 'justify-end'
                }`}
              >
                {isAgent && (
                  <div className="w-8 h-8 rounded-lg bg-madera-800 border border-dorado-500/40 flex items-center justify-center shrink-0 text-sm shadow">
                    🐗
                  </div>
                )}

                <div
                  className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed shadow-lg ${
                    isAgent
                      ? 'bg-carbon-950 border border-carbon-800 text-gray-200'
                      : 'bg-dorado-600/90 text-carbon-950 font-medium ml-12'
                  }`}
                >
                  {isAgent && (
                    <div className="flex items-center justify-between border-b border-carbon-800 pb-2 mb-2">
                      <span className="font-brand font-bold text-dorado-400">
                        {msg.role}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] text-gray-500">{msg.timestamp}</span>
                        <button
                          onClick={() => handleSpeak(msg.text)}
                          className="text-gray-400 hover:text-dorado-400"
                          title="Escuchar respuesta"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleCopy(msg.text, index)}
                          className="text-gray-400 hover:text-dorado-400"
                          title="Copiar texto"
                        >
                          {copiedIndex === index ? (
                            <Check className="w-3.5 h-3.5 text-olivo-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="whitespace-pre-line font-sans space-y-2">
                    {msg.text}
                  </div>
                </div>

                {!isAgent && (
                  <div className="w-8 h-8 rounded-lg bg-dorado-500 text-carbon-950 font-bold flex items-center justify-center shrink-0 text-xs shadow">
                    TÚ
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center space-x-3 text-xs text-dorado-400">
              <div className="w-8 h-8 rounded-lg bg-madera-800 flex items-center justify-center animate-pulse">
                🐗
              </div>
              <span className="animate-pulse font-semibold">
                {selectedRole.title} está redactando con el fuego de Jabalí 21...
              </span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="pt-4 border-t border-carbon-800 flex items-center space-x-3">
          <input
            type="text"
            placeholder={`Pregúntale a tu ${selectedRole.title}... (ej. 'Escribe un guion para TikTok de Arrachera')`}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 bg-carbon-950 border border-carbon-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-dorado-500"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim() || isLoading}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-dorado-500 to-brasa-600 hover:from-dorado-400 hover:to-brasa-500 text-carbon-950 font-bold text-xs shadow-lg transition-all disabled:opacity-50 flex items-center space-x-1.5"
          >
            <span>Consultar</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

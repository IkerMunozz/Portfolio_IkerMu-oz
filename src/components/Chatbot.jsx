import { useState, useRef, useEffect } from 'react';
import { Send, X, MessageSquare, Loader2, Sparkles } from 'lucide-react';

const API_URL = '';

// Render bot messages with simple formatting
function FormattedText({ text }) {
  const lines = text.split('\n');
  
  return (
    <div className="leading-relaxed">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-2" />;
        return (
          <div key={i} className={line.startsWith('- ') ? 'ml-2' : ''}>
            {line}
          </div>
        );
      })}
    </div>
  );
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: '¡Hola! Soy el asistente del portfolio de Iker Muñoz. Pregúntame sobre su experiencia, skills, proyectos o formación.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      if (data.error) {
        setMessages(prev => [...prev, { role: 'bot', text: `Error: ${data.error}` }]);
      } else {
        setMessages(prev => [...prev, { role: 'bot', text: data.reply }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'bot',
        text: 'No puedo conectar con el servidor. Asegúrate de que el backend está ejecutándose en puerto 3001.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = [
    '¿Cuál es su experiencia?',
    '¿Qué skills tiene?',
    '¿Qué proyectos ha hecho?',
    '¿Cuál es su formación?'
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full shadow-lg shadow-cyan-500/30 flex items-center justify-center hover:scale-110 transition-transform duration-300 active:scale-95"
        aria-label="Open chat"
      >
        <MessageSquare size={20} className="text-white" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-16 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] max-w-[22rem] sm:w-80 sm:max-w-none sm:h-[32rem] h-[26rem] bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border-b border-slate-700/50 px-3 py-2.5 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <Sparkles size={16} className="text-cyan-400 flex-shrink-0" />
          <span className="font-semibold text-xs sm:text-sm truncate">Asistente CV</span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 hover:bg-slate-700/50 rounded-lg transition-colors flex-shrink-0"
        >
          <X size={16} className="text-slate-400" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5 min-h-0">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[88%] rounded-xl px-2.5 py-1.5 text-xs sm:text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white'
                  : 'bg-slate-800 text-slate-300 border border-slate-700/50'
              }`}
            >
              {msg.role === 'user' ? msg.text : <FormattedText text={msg.text} />}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 border border-slate-700/50 rounded-xl px-2.5 py-1.5 flex items-center gap-2">
              <Loader2 size={12} className="text-cyan-400 animate-spin" />
              <span className="text-slate-400 text-xs">Pensando...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick questions */}
      {messages.length <= 2 && (
        <div className="px-2.5 pb-2 flex-shrink-0 flex flex-wrap gap-1">
          {quickQuestions.map(q => (
            <button
              key={q}
              onClick={() => { setInput(q); }}
              className="text-[10px] sm:text-xs px-2 py-0.5 bg-slate-800 border border-slate-700/50 rounded-full text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="border-t border-slate-700/50 p-2.5 flex gap-2 flex-shrink-0">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Pregúntame..."
          className="flex-1 bg-slate-800 border border-slate-700/50 rounded-lg px-3 py-1.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
          className="p-1.5 sm:p-2 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg disabled:opacity-40 transition-all active:scale-95"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}

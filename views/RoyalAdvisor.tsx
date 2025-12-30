
import React, { useState, useRef, useEffect } from 'react';
import { useKingdom } from '../KingdomContext';
import { BrutalCard, BrutalButton, BrutalInput } from '../components/UI';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'advisor';
  content: string;
}

const RoyalAdvisor: React.FC = () => {
  const { activeKingdom: kingdom } = useKingdom();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!kingdom) return null;

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        role: 'advisor',
        content: `Saudações, Majestade! Sou seu Conselheiro Real, iluminado pela sabedoria do Gemini, para o reino de ${kingdom.stats.name}. Como posso auxiliar na vossa soberania hoje?`
      }]);
    }
  }, [kingdom.stats.name, messages.length]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      setMessages(prev => [...prev, 
        { role: 'user', content: userMessage }, 
        { role: 'advisor', content: "Perdão, Majestade, mas a 'API_KEY' não foi encontrada nos selos reais do Netlify. Sem ela, minha visão do destino está turva." }
      ]);
      setInput('');
      return;
    }

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey });
      
      const systemInstruction = `
        Você é o Conselheiro Real do reino de ${kingdom.stats.name}. Sua personalidade é formal, leal e extremamente sábia.
        REGRAS DE OURO (SISTEMA KINGMAKER):
        1. TAMANHO E RECURSOS: Tamanho determina o Dado de Recursos (d4 aldeia até d12 império). PR (Pontos de Recurso) são a base. 1 PR não gasto = 1 XP.
        2. RUÍNAS: Corrupção, Crime, Deterioração, Conflito. Limiar = 10 + Nível. Exceder aumenta Penalidade de Ruína (penalidade de item em testes).
        3. DESORDEM (Unrest): 1-4 pts = -1; 5-9 = -2; 10-14 = -3; 15-19 = -4. 20+ = Anarquia.
        4. CONSUMO: Pago com Alimentos ou 5 PR/unidade faltante.
        Contexto Atual: Nível ${kingdom.stats.level}, PR: ${kingdom.stats.resources.rp}, Desordem: ${kingdom.stats.unrest}.
        Responda como "Majestade" ou "Soberano". Seja estratégico, imersivo e cite regras quando necessário.
      `;

      const chat = ai.chats.create({
        model: "gemini-3-pro-preview",
        config: { systemInstruction },
      });

      // Enviamos o histórico de mensagens para o chat (convertendo o formato)
      const responseStream = await chat.sendMessageStream({ 
        message: userMessage 
      });

      let advisorContent = "";
      setMessages(prev => [...prev, { role: 'advisor', content: "" }]);

      for await (const chunk of responseStream) {
        const text = chunk.text;
        if (text) {
          advisorContent += text;
          setMessages(prev => {
            const last = prev[prev.length - 1];
            return [...prev.slice(0, -1), { ...last, content: advisorContent }];
          });
        }
      }
    } catch (error) {
      console.error("Erro no Gemini Advisor:", error);
      setMessages(prev => [...prev, { role: 'advisor', content: "Majestade, os ventos do destino sopram contra nós. Houve uma falha na conexão com os oráculos. Verifique se a Chave da Coroa (API_KEY) ainda é válida." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[70vh] gap-6">
      <div className="border-b-4 border-black dark:border-white pb-4">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter font-display">Conselheiro Gemini</h1>
        <p className="text-sm opacity-80 mt-2 font-bold uppercase tracking-widest">Consultoria Real & Sabedoria Profética</p>
      </div>
      <BrutalCard className="flex-grow flex flex-col p-0 overflow-hidden h-full">
        <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 bg-gray-50 dark:bg-black/20">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 border-4 border-black shadow-brutal ${msg.role === 'user' ? 'bg-accent text-white' : 'bg-white dark:bg-surface-dark text-black dark:text-white'}`}>
                <div className="text-[10px] font-black uppercase mb-1 opacity-50">{msg.role === 'user' ? 'Vossa Majestade' : 'Conselheiro Real'}</div>
                <div className="text-sm font-medium leading-relaxed whitespace-pre-wrap">{msg.content}</div>
              </div>
            </div>
          ))}
          {isTyping && <div className="animate-pulse p-3 bg-white dark:bg-surface-dark border-4 border-black text-xs font-black uppercase">O conselheiro está consultando os astros...</div>}
        </div>
        <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-surface-dark border-t-4 border-black flex gap-4">
          <BrutalInput 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            placeholder="Pergunte ao Gemini sobre o destino do reino..." 
            className="flex-grow text-sm" 
            disabled={isTyping} 
          />
          <BrutalButton type="submit" disabled={isTyping || !input.trim()}>Consultar</BrutalButton>
        </form>
      </BrutalCard>
    </div>
  );
};

export default RoyalAdvisor;

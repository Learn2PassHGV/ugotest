import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, User, Bot, Loader2, CheckCircle2 } from 'lucide-react';
import { sendLead, containsContactDetails, fetchChatReply } from '../lib/leads';

const OFFICE_PHONE_DISPLAY = '0845 8333 456';
const OFFICE_PHONE_TEL = 'tel:08458333456';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export function ConciergeChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [leadSent, setLeadSent] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sentCountRef = useRef(0); // number of messages already forwarded

  const initChat = () => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'initial',
          role: 'model',
          text: 'Good day, I am the UGO booking assistant. Tell me your journey, dates and group size, and Alan and Sasha’s team will send you a personal quote.',
        },
      ]);
    }
  };

  useEffect(() => {
    if (isOpen) initChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /** Forward the transcript to the business once contact details exist. */
  const maybeForwardLead = async (all: ChatMessage[]) => {
    const hasContact = all.some((m) => m.role === 'user' && containsContactDetails(m.text));
    const hasNewContent = all.length > sentCountRef.current;
    if (!hasContact || !hasNewContent) return;
    sentCountRef.current = all.length;
    const result = await sendLead({
      type: 'concierge',
      transcript: all.map((m) => ({ role: m.role === 'user' ? 'user' : 'bot', text: m.text })),
    });
    if (result.ok) {
      setLeadSent(true);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          id: `fallback-${Date.now()}`,
          role: 'model',
          text: `I could not reach our booking system just now — to make sure you are looked after, please call the team directly on ${OFFICE_PHONE_DISPLAY}.`,
        },
      ]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: userText };
    const withUser = [...messages, userMsg];
    setMessages(withUser);
    setIsLoading(true);

    const reply = await fetchChatReply(
      withUser.map((m) => ({ role: m.role === 'user' ? 'user' : 'bot', text: m.text }))
    );
    const modelText =
      reply?.text ||
      `I am having a technical issue connecting right now — please call our team directly on ${OFFICE_PHONE_DISPLAY} and they will help straight away.`;

    const withReply: ChatMessage[] = [
      ...withUser,
      { id: `${Date.now()}-m`, role: 'model', text: modelText },
    ];
    setMessages(withReply);
    setIsLoading(false);

    void maybeForwardLead(withReply);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-brass hover:bg-brass-dark text-white p-4 rounded-full shadow-2xl transition-all duration-300 z-50 flex items-center justify-center animate-bounce-slow"
          aria-label="Open chat with the UGO booking assistant"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 w-full sm:w-[380px] h-[85vh] sm:h-[600px] sm:max-h-[80vh] bg-stone-50 rounded-t-2xl sm:rounded-sm shadow-2xl z-50 flex flex-col border border-slate-200 overflow-hidden font-sans">
          {/* Header */}
          <div className="bg-slate-900 text-stone-50 p-4 flex justify-between items-center shrink-0">
            <div>
              <h3 className="font-serif text-lg font-medium text-brass">UGO Booking Assistant</h3>
              <p className="text-xs text-slate-400 font-light tracking-widest uppercase">
                Family-run · St Albans
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors p-1"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery confirmation ribbon */}
          {leadSent && (
            <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-2 flex items-center gap-2 shrink-0">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-xs text-emerald-800">
                Your details have been sent to Alan &amp; Sasha’s team — they will be in touch.
              </span>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-stone-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-brass text-white'}`}
                >
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div
                  className={`px-4 py-3 rounded-sm max-w-[80%] text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-slate-900 text-stone-50'
                      : 'bg-white text-slate-800 border border-slate-200 shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 flex-row">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-brass text-white">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
                <div className="px-4 py-3 rounded-sm bg-white text-slate-800 border border-slate-200 shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                  <span
                    className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  ></span>
                  <span
                    className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.4s' }}
                  ></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-200 shrink-0">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message the team..."
                className="flex-1 bg-stone-50 border border-slate-300 rounded-sm py-3 px-4 text-sm text-slate-800 focus:outline-none focus:border-brass focus:ring-1 focus:ring-brass transition-colors"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white p-3 rounded-sm transition-colors flex items-center justify-center"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="mt-2 text-[10px] text-slate-400 leading-snug">
              Prefer to talk?{' '}
              <a href={OFFICE_PHONE_TEL} className="text-brass font-semibold hover:underline">
                Call {OFFICE_PHONE_DISPLAY}
              </a>{' '}
              · Details you share here are emailed to our family team so they can quote you.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

/**
 * ChatBot Component - Versión 3.0
 * Sistema de menús por ID + búsqueda de texto mejorada
 */

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { faqDatabase, CONTACT_INFO } from '../../data/faqChatbot';
import './ChatBot.css';

// ─── Mapa de menú principal ───────────────────────────────────────────────────
const MAIN_MENU = [
  { label: '🛒 Productos',        section: 'productos',               icon: '🛒' },
  { label: '💳 Comprar / Pagar',  section: 'compra-pago',             icon: '💳' },
  { label: '🛡️ Garantía',        section: 'garantía-soporte',        icon: '🛡️' },
  { label: '👤 Mi Cuenta',        section: 'cuenta-auth',             icon: '👤' },
  { label: '📦 Pedidos y Envío',  section: 'compra-pago',             icon: '📦', filter: 'envío' },
  { label: '🔧 Mantenimiento',    section: 'cuidado-uso',             icon: '🔧' },
  { label: '💼 Distribuidores',   section: 'negocio-distribuidores',  icon: '💼' },
  { label: '✏️ Registrar Equipo', section: 'registro-equipo',         icon: '✏️' },
  { label: '📝 Blog',             section: 'blog-info',               icon: '📝' },
  { label: '⚖️ Políticas',        section: 'políticas-legal',         icon: '⚖️' },
  { label: '💬 Contactar',        action: 'whatsapp',                 icon: '💬' },
];

// Normaliza texto eliminando acentos y pasando a minúsculas
const normalize = (str) =>
  str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

// Palabras vacías que no aportan al matching
const STOPWORDS = new Set([
  'que', 'como', 'cual', 'donde', 'cuanto', 'cuantos', 'cuantas',
  'hay', 'tiene', 'tienen', 'puedo', 'puede', 'para', 'con', 'sin',
  'una', 'uno', 'los', 'las', 'del', 'por', 'sobre', 'qué', 'cómo',
  'cuál', 'dónde', 'nécessito', 'necesito', 'quiero',
]);

const ChatBot = () => {
  const navigate = useNavigate();

  const makeWelcome = () => ({
    id: 1,
    type: 'bot',
    text: '¡Hola! Soy el asistente virtual de HomeLife 🏥\n\n¿En qué te puedo ayudar hoy?',
    timestamp: new Date(),
    hasMainMenu: true,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([makeWelcome()]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // ─── Búsqueda por texto ────────────────────────────────────────────────────
  const searchFAQ = (userInput) => {
    const normalizedInput = normalize(userInput);
    const words = normalizedInput.split(/\s+/).filter(w => w.length > 2 && !STOPWORDS.has(w));

    if (words.length === 0) return null;

    let results = [];

    faqDatabase.forEach(faq => {
      let score = 0;
      const normQuestion = normalize(faq.question);
      const normKeywords = faq.keywords.map(normalize);

      // Coincidencia exacta de la pregunta completa
      if (normQuestion === normalizedInput) {
        score += 1000;
      } else if (normQuestion.includes(normalizedInput)) {
        score += 600;
      }

      words.forEach(word => {
        // Coincidencia exacta en keywords
        if (normKeywords.includes(word)) score += 80;

        // Coincidencia parcial en keywords
        normKeywords.forEach(kw => {
          if (kw.includes(word) && word.length >= 4) score += 30;
          else if (word.includes(kw) && kw.length >= 4) score += 20;
        });

        // Coincidencia en la pregunta
        if (normQuestion.includes(word) && word.length >= 4) score += 25;
      });

      if (score > 0) results.push({ faq, score });
    });

    results.sort((a, b) => b.score - a.score);
    return results.length > 0 && results[0].score >= 60 ? results[0].faq : null;
  };

  // ─── Obtener FAQs de una sección ──────────────────────────────────────────
  const getFAQsBySection = (section, filterWord = null) => {
    let list = faqDatabase.filter(f => f.section === section);
    if (filterWord) {
      const norm = normalize(filterWord);
      list = list.filter(f =>
        f.keywords.some(k => normalize(k).includes(norm)) ||
        normalize(f.question).includes(norm)
      );
    }
    return list;
  };

  // ─── Añadir mensaje del bot ────────────────────────────────────────────────
  const pushBotMessage = (msgProps) => {
    setMessages(prev => [
      ...prev,
      { id: Date.now(), type: 'bot', timestamp: new Date(), ...msgProps },
    ]);
  };

  // ─── Responder con un FAQ concreto por id ─────────────────────────────────
  const answerFAQ = (faqId) => {
    const faq = faqDatabase.find(f => f.id === faqId);
    if (!faq) return;
    setIsLoading(true);
    setTimeout(() => {
      pushBotMessage({
        text: faq.answer,
        faqId: faq.id,
        navigation: faq.navigation,
        relatedSection: faq.section,
        showRelated: true,
        showBackMenu: true,
      });
      setIsLoading(false);
    }, 350);
  };

  // ─── Mostrar lista de preguntas de una sección ────────────────────────────
  const showSection = (section, filterWord = null, label = null) => {
    const faqs = getFAQsBySection(section, filterWord);
    if (faqs.length === 0) {
      pushBotMessage({
        text: 'No encontré preguntas en esta sección. ¿Quieres que te comunique con un asesor?',
        showContactOptions: true,
        showBackMenu: true,
      });
      return;
    }
    pushBotMessage({
      text: label ? `Aquí están los temas de "${label}":` : 'Selecciona la pregunta que mejor describe tu duda:',
      faqList: faqs,
      showBackMenu: true,
    });
  };

  // ─── Manejar clic en menú principal ───────────────────────────────────────
  const handleMenuClick = (item) => {
    if (item.action === 'whatsapp') {
      handleWhatsAppContact();
      return;
    }
    setMessages(prev => [
      ...prev,
      { id: Date.now(), type: 'user', text: item.label, timestamp: new Date() },
    ]);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showSection(item.section, item.filter || null, item.label);
    }, 300);
  };

  // ─── Manejar envío de texto libre ─────────────────────────────────────────
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    setMessages(prev => [
      ...prev,
      { id: Date.now(), type: 'user', text: userText, timestamp: new Date() },
    ]);
    setInputValue('');
    setIsLoading(true);

    setTimeout(() => {
      const match = searchFAQ(userText);
      if (match) {
        pushBotMessage({
          text: match.answer,
          faqId: match.id,
          navigation: match.navigation,
          relatedSection: match.section,
          showRelated: true,
          showBackMenu: true,
        });
      } else {
        pushBotMessage({
          text: 'No encontré una respuesta exacta a tu pregunta 🤔\n\nPuedes explorar los temas del menú o hablar directamente con un asesor.',
          showContactOptions: true,
          hasMainMenu: true,
        });
      }
      setIsLoading(false);
    }, 450);
  };

  // ─── Navegación interna ────────────────────────────────────────────────────
  const handleNavigation = (url) => {
    if (url === '#chatbot-contact') {
      handleWhatsAppContact();
    } else {
      navigate(url);
      setIsOpen(false);
    }
  };

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent('Hola, necesito ayuda con un producto HomeLife.');
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${message}`, '_blank');
  };

  const resetToMainMenu = () => {
    setMessages([makeWelcome()]);
    setInputValue('');
  };

  // ─── Render de lista de FAQs ──────────────────────────────────────────────
  const renderFaqList = (faqs) => (
    <div className="chatbot-faq-list">
      {faqs.map(faq => (
        <button
          key={faq.id}
          className="chatbot-faq-item"
          onClick={() => answerFAQ(faq.id)}
        >
          {faq.question}
        </button>
      ))}
    </div>
  );

  // ─── Render del menú principal ────────────────────────────────────────────
  const renderMainMenu = () => (
    <div className="chatbot-menu-grid">
      {MAIN_MENU.map((item, idx) => (
        <button
          key={idx}
          className="chatbot-menu-item"
          onClick={() => handleMenuClick(item)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );

  // ─── Render de FAQs relacionados ──────────────────────────────────────────
  const renderRelated = (section) => {
    const related = getFAQsBySection(section).slice(0, 3);
    if (!related.length) return null;
    return (
      <div className="chatbot-related">
        <p className="chatbot-related-title">También podría interesarte:</p>
        <div className="chatbot-related-items">
          {related.map(faq => (
            <button
              key={faq.id}
              className="chatbot-related-item"
              onClick={() => answerFAQ(faq.id)}
            >
              {faq.question.length > 45 ? faq.question.substring(0, 45) + '…' : faq.question}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // ─── JSX principal ─────────────────────────────────────────────────────────
  return (
    <>
      {/* Botón flotante */}
      <button
        className="chatbot-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir chat de soporte"
        aria-expanded={isOpen}
        title="Chat de soporte - HomeLife"
      >
        <span className="chatbot-icon">
          {isOpen ? '✕' : (
            <svg viewBox="0 0 24 24" width="52" height="52" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )}
        </span>
        {!isOpen && <span className="chatbot-badge">?</span>}
      </button>

      {/* Modal del chat */}
      {isOpen && (
        <div className="chatbot-container">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-content">
              <h3>HomeLife Asistente</h3>
              <p className="chatbot-status">Respuestas instantáneas • {faqDatabase.length} temas</p>
            </div>
            <button
              className="chatbot-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar chat"
            >
              ✕
            </button>
          </div>

          {/* Mensajes */}
          <div className="chatbot-messages">
            {messages.map(message => (
              <div
                key={message.id}
                className={`chatbot-message ${message.type === 'user' ? 'user-message' : 'bot-message'}`}
              >
                {message.type === 'bot' && <div className="chatbot-avatar">🏥</div>}

                <div className="chatbot-message-content">
                  <div className="chatbot-message-text">{message.text}</div>

                  {/* Lista de FAQs (modo menú de sección) */}
                  {message.faqList && renderFaqList(message.faqList)}

                  {/* Menú principal */}
                  {message.hasMainMenu && renderMainMenu()}

                  {/* Botón de navegación */}
                  {message.navigation && (
                    <button
                      className="chatbot-nav-btn"
                      onClick={() => handleNavigation(message.navigation.link)}
                    >
                      🔗 {message.navigation.label}
                    </button>
                  )}

                  {/* FAQs relacionados */}
                  {message.showRelated && message.relatedSection && renderRelated(message.relatedSection)}

                  {/* Contacto WhatsApp */}
                  {message.showContactOptions && (
                    <div className="chatbot-contact-options">
                      <button className="chatbot-whatsapp-btn" onClick={handleWhatsAppContact}>
                        💬 Contactar por WhatsApp
                      </button>
                    </div>
                  )}

                  {/* Volver al menú */}
                  {message.showBackMenu && (
                    <button className="chatbot-back-menu-btn" onClick={resetToMainMenu}>
                      ⬅️ Menú principal
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Loading */}
            {isLoading && (
              <div className="chatbot-message bot-message">
                <div className="chatbot-avatar">🏥</div>
                <div className="chatbot-loading">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="chatbot-input-form">
            <input
              ref={inputRef}
              type="text"
              placeholder="O escribe tu pregunta aquí..."
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              disabled={isLoading}
              className="chatbot-input"
              aria-label="Campo de entrada para preguntas"
              maxLength="500"
            />
            <button
              type="submit"
              className="chatbot-send-btn"
              disabled={isLoading || !inputValue.trim()}
              aria-label="Enviar mensaje"
            >
              ➤
            </button>
          </form>

          {/* Footer */}
          <div className="chatbot-footer">
            <p className="chatbot-footer-text">
              ¿Necesitas atención inmediata?{' '}
              <button className="chatbot-footer-link" onClick={handleWhatsAppContact}>
                Escríbenos por WhatsApp
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;

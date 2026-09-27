import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Bot, User, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    question: "What is IEEE?",
    answer: <span>IEEE stands for <strong className="text-ieee-blue dark:text-ieee-blue-light">Institute of Electrical and Electronics Engineers</strong>. It's the world's largest non-profit technical organization, dedicated to advancing technology for the benefit of humanity, with over <strong className="text-ieee-blue dark:text-ieee-blue-light">3,285 student branches</strong> worldwide.</span>,
  },
  {
    question: "How can IEEE help me improve my skills?",
    answer: <span>IEEE offers immense opportunities whether you are a volunteer or not. We help you through our <strong className="text-ieee-blue dark:text-ieee-blue-light">events, workshops, and publications</strong>. Just make sure to follow our channels to get instant updates.</span>,
  },
  {
    question: "What are the benefits of volunteering with IEEE?",
    answer: <span>Volunteering gives you the chance to play a key role in your chapter's future. From technical activities to membership development, you build <strong className="text-ieee-blue dark:text-ieee-blue-light">teamwork, leadership, and networking skills</strong> that significantly impact your career and society.</span>,
  },
  {
    question: "What membership benefits does IEEE offer?",
    answer: <span>IEEE delivers exclusive access to the industry's most essential <strong className="text-ieee-blue dark:text-ieee-blue-light">technical information, networking opportunities, and career development tools</strong>. Memberships typically range from US$13.5 to US$27 annually for students.</span>,
  },
  {
    question: "When is your recruitment period?",
    answer: <span>We recruit passionate volunteers every year! Our main recruitment drive typically happens at the <strong className="text-ieee-blue dark:text-ieee-blue-light">end of the winter semester</strong>. Keep an eye on our social media platforms for the exact dates.</span>,
  }
];

const cinematicEase = [0.25, 0.46, 0.45, 0.94];

const TypingIndicator = () => (
  <div className="flex gap-1.5 px-2 py-2 items-center h-6">
    {[0, 0.15, 0.3].map((delay, i) => (
      <motion.div 
        key={i}
        className="w-1.5 h-1.5 rounded-full bg-ieee-blue/60 dark:bg-ieee-blue-light/60" 
        animate={{ y: [0, -4, 0] }} 
        transition={{ duration: 0.6, repeat: Infinity, delay }} 
      />
    ))}
  </div>
);

const ChatBubble = ({ id, type, children, delay = 0, isTyping = false, isHighlighted = false }) => {
  const isUser = type === 'user';
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: cinematicEase, delay }}
      className={`flex gap-3 w-full max-w-2xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'} mb-6 group`}
    >
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-lg ${isUser ? 'bg-gradient-to-br from-gray-600 to-gray-800' : 'bg-gradient-to-br from-ieee-blue to-ieee-blue-dark'}`}>
        {isUser ? <User className="w-4 h-4 md:w-5 md:h-5 text-white" /> : <Bot className="w-4 h-4 md:w-5 md:h-5 text-white" />}
      </div>
      
      {/* Bubble */}
      <div 
        className={`relative px-5 py-4 md:px-6 rounded-3xl shadow-xl transition-all duration-300 ${isUser ? 'bg-gray-800 border border-gray-700 rounded-tr-sm text-white group-hover:shadow-gray-900/50' : 'bg-white border border-gray-100 dark:bg-[#0f172a] dark:border-white/10 rounded-tl-sm text-gray-800 dark:text-gray-200 group-hover:shadow-ieee-blue/20'} ${isHighlighted ? 'ring-4 ring-ieee-blue/50 dark:ring-ieee-blue-light/50 shadow-ieee-blue/30 scale-[1.02] translate-y-[-2px]' : ''}`}
      >
        {isTyping ? <TypingIndicator /> : <div className="text-[15px] md:text-base leading-relaxed">{children}</div>}
      </div>
    </motion.div>
  );
};

const FAQ = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [highlightedMessageId, setHighlightedMessageId] = useState(null);
  const chatContainerRef = useRef(null);
  const heroRef = useRef(null);

  // Initial greeting
  useEffect(() => {
    const timer = setTimeout(() => {
      setChatHistory([{ type: 'bot', id: 'greeting', content: "Hello! I'm the IEEE MNU Assistant. Which question would you like me to answer today?" }]);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Cinematic Hero Entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.faq-hero-element', 
        { y: 40, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, stagger: 0.15, ease: 'power3.out' }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chatHistory, isTyping]);

  const handleAskQuestion = (index) => {
    if (isTyping) return;
    
    // Check if the answer already exists in chat
    const existingAnswer = chatHistory.find(msg => msg.type === 'bot' && msg.faqIndex === index);
    
    if (existingAnswer) {
      // Highlight the message
      setHighlightedMessageId(existingAnswer.id);
      setTimeout(() => setHighlightedMessageId(null), 800); // Small duration
      
      // Scroll exactly to that message
      const element = document.getElementById(existingAnswer.id);
      if (element && chatContainerRef.current) {
        const container = chatContainerRef.current;
        const containerTop = container.getBoundingClientRect().top;
        const elementTop = element.getBoundingClientRect().top;
        container.scrollTo({
          top: container.scrollTop + (elementTop - containerTop) - 20,
          behavior: 'smooth'
        });
      }
      return;
    }
    
    const faq = FAQS[index];
    const newHistory = [...chatHistory, { type: 'user', id: `q-${Date.now()}`, content: faq.question }];
    setChatHistory(newHistory);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setChatHistory(prev => [...prev, { type: 'bot', id: `a-${Date.now()}`, content: faq.answer, faqIndex: index }]);
    }, 1200); // Simulated typing delay
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#000a12] pb-24 transition-colors duration-300">
      
      {/* Cinematic Hero */}
      <div ref={heroRef} className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ieee-blue/10 to-transparent dark:from-ieee-blue/5" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="faq-hero-element inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ieee-blue/10 dark:bg-ieee-blue/20 text-ieee-blue dark:text-ieee-blue-light text-sm font-bold mb-6">
            <MessageCircle className="w-4 h-4" /> Conversational FAQ
          </div>
          <h1 className="faq-hero-element text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            How can we <span className="text-transparent bg-clip-text bg-gradient-to-r from-ieee-blue to-accent-teal">help you?</span>
          </h1>
          <p className="faq-hero-element text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Select a question below to chat with our interactive assistant.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl grid lg:grid-cols-12 gap-8">
        
        {/* Questions Sidebar */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4 ml-2">Suggested Topics</h3>
          {FAQS.map((faq, index) => (
            <motion.button
              key={index}
              onClick={() => handleAskQuestion(index)}
              disabled={isTyping}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="w-full text-left p-4 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-md hover:border-ieee-blue/30 dark:hover:border-ieee-blue/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm md:text-base font-semibold text-gray-800 dark:text-gray-200 group-hover:text-ieee-blue dark:group-hover:text-ieee-blue-light transition-colors">
                  {faq.question}
                </span>
                <Sparkles className="w-4 h-4 text-gray-400 group-hover:text-ieee-blue transition-colors opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 duration-300" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-7 bg-gray-100/50 dark:bg-[#0a1120] rounded-3xl border border-gray-200 dark:border-white/10 p-4 md:p-8 h-[500px] lg:h-[600px] flex flex-col shadow-inner relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-ieee-blue/5 rounded-full filter blur-3xl pointer-events-none" />
          
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <AnimatePresence initial={false}>
              {chatHistory.map((msg) => (
                <ChatBubble key={msg.id} id={msg.id} type={msg.type} isHighlighted={highlightedMessageId === msg.id}>
                  {msg.content}
                </ChatBubble>
              ))}
              {isTyping && (
                <ChatBubble key="typing" type="bot" isTyping={true} />
              )}
            </AnimatePresence>
            <div className="h-4" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default FAQ;

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Users, BookOpen, Award, Network, Lightbulb, Globe,
  TrendingUp, Sparkles, CheckCircle, Info, GraduationCap, ChevronRight
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BENEFITS = [
  {
    icon: Users,
    title: 'Global Community',
    description: 'Join a community of over 420,000 technology and engineering professionals united by a common desire to continuously learn, interact, collaborate, and innovate.',
    gradient: 'from-blue-500 to-indigo-600'
  },
  {
    icon: TrendingUp,
    title: 'Stay Current',
    description: 'Get the resources and opportunities you need to keep on top of changes in technology and advance your career.',
    gradient: 'from-teal-400 to-emerald-500'
  },
  {
    icon: Award,
    title: 'Standards Development',
    description: 'Get involved in standards development and shape the future of technology across industries.',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: Network,
    title: 'Professional Networking',
    description: 'Network with other professionals in your local area or within a specific technical interest to build lasting connections.',
    gradient: 'from-orange-400 to-red-500'
  },
  {
    icon: Lightbulb,
    title: 'Mentorship',
    description: 'Be mentored by professional engineers and technologists who can guide your career development.',
    gradient: 'from-cyan-400 to-blue-500'
  },
  {
    icon: BookOpen,
    title: 'Technical Library Access',
    description: 'Obtain access to the largest library of electrical engineering, computer science, and electronics technical literature as well as the latest technology trends.',
    gradient: 'from-emerald-400 to-teal-500'
  },
  {
    icon: Globe,
    title: 'Global Collaboration',
    description: 'Collaborate with IEEE colleagues and member groups, online or in person, to build a support group for your profession.',
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    icon: Sparkles,
    title: 'And So Much More!',
    description: 'Discover countless opportunities for growth, learning, and professional development through IEEE membership.',
    gradient: 'from-amber-400 to-orange-500'
  },
];

const STATS = [
  { value: '420K+', label: 'Members Worldwide' },
  { value: '160+', label: 'Countries' },
  { value: '5M+', label: 'Technical Documents' },
];

const Membership = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    // Advanced staggered reveal for benefits
    const ctx = gsap.context(() => {
      gsap.fromTo('.benefit-card',
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.benefits-grid',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo('.eligibility-card',
        { y: 50, opacity: 0, rotateX: 10 },
        {
          y: 0, opacity: 1, rotateX: 0,
          duration: 1,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: '.eligibility-card',
            start: 'top 85%'
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-50 dark:bg-[#000a12] transition-colors duration-300 overflow-hidden">

      {/* Cinematic Parallax Hero */}
      <motion.div style={{ y: heroY, opacity }} className="relative pt-32 pb-24 md:pt-48 md:pb-32 px-4 flex flex-col items-center justify-center min-h-[70vh]">
        <div className="absolute inset-0 bg-gradient-to-b from-ieee-blue/20 via-[#000a12]/50 to-[#000a12] z-0 pointer-events-none dark:from-ieee-blue/10 dark:via-[#000a12] dark:to-[#000a12]" />

        <div className="relative z-10 max-w-5xl mx-auto text-center transform-gpu">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl mb-8"
          >
            <GraduationCap className="w-5 h-5 text-ieee-blue dark:text-ieee-blue-light" />
            <span className="text-sm font-bold tracking-wide text-gray-800 dark:text-white uppercase">Trusted by Students Worldwide</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter"
          >
            Empower Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-ieee-blue to-accent-teal">Future.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 font-light leading-relaxed"
          >
            Unlock your potential and join the world's largest technical professional organization dedicated to advancing technology for humanity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-wrap justify-center gap-4 md:gap-8"
          >
            {STATS.map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-xl backdrop-blur-sm w-40 md:w-48 transform transition-transform hover:-translate-y-2">
                <span className="text-3xl md:text-4xl font-black text-ieee-blue dark:text-ieee-blue-light mb-2">{stat.value}</span>
                <span className="text-xs md:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Benefits Grid */}
      <div className="relative z-20 container mx-auto px-4 py-24 max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">Why Join IEEE?</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-ieee-blue to-accent-teal mx-auto rounded-full" />
        </div>

        <div className="benefits-grid grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <div key={i} className="benefit-card group relative p-8 rounded-3xl bg-white dark:bg-[#0a1120] border border-gray-100 dark:border-white/5 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform-gpu will-change-transform">
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${benefit.gradient} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out`} />
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${benefit.gradient} shadow-lg transform group-hover:-translate-y-2 group-hover:rotate-3 transition-all duration-500`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{benefit.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Call to Action */}
      <div className="relative z-20 container mx-auto px-4 pb-24 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-10 md:p-14 rounded-[3rem] bg-gradient-to-br from-ieee-blue to-accent-teal shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/10 opacity-10 mix-blend-overlay"></div>
          <div className="absolute -inset-10 bg-white/20 blur-3xl rounded-full transform group-hover:scale-150 transition-transform duration-700 ease-out opacity-0 group-hover:opacity-100"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Ready to Take the Next Step?</h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-medium">
              Join the world's largest technical professional organization and start building your future today.
            </p>
            
            <a 
              href="https://www.ieee.org/membership" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-ieee-blue font-bold text-lg shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] hover:scale-105 transition-all duration-300"
            >
              Join IEEE Now
              <ChevronRight className="w-6 h-6" />
            </a>
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default Membership;

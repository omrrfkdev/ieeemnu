import React, { useEffect, useState } from 'react';
import TeamMemberCard from './TeamMemberCard';
import { motion, useScroll, useSpring } from 'framer-motion';

const TeamBoard = ({ teamMembers }) => {
  const { scrollYProgress } = useScroll();
  const [activeId, setActiveId] = useState('');

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Handle scrolling to hash on load
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setActiveId(id);
        }
      }, 500); // Wait for page transitions to finish
    }
  }, []);

  // Update active dot based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const elements = teamMembers.map(m => document.getElementById(m.id));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      let found = false;
      for (let i = elements.length - 1; i >= 0; i--) {
        const el = elements[i];
        // offsetTop is relative to offsetParent, we use getBoundingClientRect for reliability
        if (el && el.getBoundingClientRect().top + window.scrollY <= scrollPosition) {
          setActiveId(teamMembers[i].id);
          found = true;
          break;
        }
      }

      // If we're at the very top (before the first person), highlight the first dot
      if (!found && teamMembers.length > 0) {
        setActiveId(teamMembers[0].id);
      }
    };

    // Run once on mount to set initial state
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [teamMembers]);

  return (
    <div className="bg-[#0a192f] min-h-screen relative selection:bg-[#b89865]/30 selection:text-white">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#b89865] origin-left z-50"
        style={{ scaleX }}
      />

      {/* Abstract Background pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{ backgroundImage: 'radial-gradient(#b89865 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4 relative z-10 pt-32"
      >
        <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 tracking-tight">
          Heartfelt <span className="text-[#b89865] italic">Appreciation</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl font-light">
          حبيت اوصلكم رسالة شكر بسيطة انا عارف انها متلقش بمقامكم
        </p>
      </motion.div>

      {/* Side Navigation Dots */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-4 hidden lg:flex">
        {teamMembers.map((member) => (
          <a
            key={member.id}
            href={`#${member.id}`}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(member.id);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              window.history.pushState(null, '', `#${member.id}`);
              setActiveId(member.id);
            }}
            className="group relative flex items-center justify-end w-8 h-8"
          >
            <span
              className={`absolute right-6 px-3 py-1 bg-[#0d1f3d] border border-[#b89865]/30 text-white text-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-lg ${activeId === member.id ? 'text-[#b89865]' : ''
                }`}
            >
              {member.name}
            </span>
            <div
              className={`w-3 h-3 rounded-full transition-all duration-300 border border-[#b89865] ${activeId === member.id
                ? 'bg-[#b89865] scale-150'
                : 'bg-transparent hover:bg-[#b89865]/50 hover:scale-125'
                }`}
            />
          </a>
        ))}
      </div>

      {/* Team Members List */}
      <div className="relative z-10 pb-12">
        {teamMembers.map((member, index) => (
          <TeamMemberCard
            key={index}
            id={member.id}
            name={member.name}
            title={member.title}
            message={member.message}
            image={member.image}
            isReversed={index % 2 !== 0}
          />
        ))}
      </div>

      {/* Quran Aya Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 py-24 flex flex-col items-center justify-center text-center px-4"
      >
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cairo:wght@300;400;500;600;700&display=swap');
            .font-amiri {
              font-family: 'Amiri', serif;
            }
            .font-cairo {
              font-family: 'Cairo', sans-serif;
            }
          `}
        </style>

        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#b89865] to-transparent mb-12" />

          <h2
            className="font-amiri text-3xl md:text-5xl lg:text-6xl text-[#b89865] mb-8 leading-relaxed text-center"
            dir="rtl"
            style={{ textShadow: '0 4px 24px rgba(184, 152, 101, 0.2)' }}
          >
            ﴿ إِنَّا لَا نُضِيعُ أَجْرَ مَنْ أَحْسَنَ عَمَلًا ﴾
          </h2>

          <p className="text-gray-400 font-light tracking-widest text-sm md:text-base uppercase mb-12">
            [سورة الكهف: 30]
          </p>

          <p className="text-gray-300/80 italic font-serif text-lg md:text-xl max-w-2xl">
            "Indeed, We will not allow to be lost the reward of any who did well in deeds."
          </p>

          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#b89865] to-transparent mt-12" />
        </div>
      </motion.div>
    </div>
  );
};

export default TeamBoard;

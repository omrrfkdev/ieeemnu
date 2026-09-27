import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const TeamMemberCard = ({ id, name, title, message, image, isReversed }) => {
  return (
    <div id={id} className="relative min-h-screen w-full flex items-center justify-center py-20 px-6 md:px-12 lg:px-24 overflow-hidden scroll-mt-20">
      
      {/* Background blobs (subtle) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className={`absolute w-96 h-96 rounded-full blur-[100px] -z-10 bg-gradient-to-tr from-[#1a365d] to-[#b89865]/20 ${
          isReversed ? 'right-0 top-1/4' : 'left-0 top-1/4'
        }`}
      />

      <div className={`max-w-6xl w-full flex flex-col gap-12 lg:gap-24 items-center ${
        isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
      }`}>
        
        {/* Image Side */}
        <motion.div 
          initial={{ opacity: 0, x: isReversed ? 100 : -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative w-full lg:w-1/2 flex justify-center"
        >
          {/* Decorative background shape for image */}
          <div className="absolute inset-0 bg-[#b89865]/10 rounded-[2.5rem] transform -rotate-3 scale-95" />
          
          <div className="relative z-10 w-full max-w-md aspect-[4/5] rounded-[2rem] overflow-hidden border border-[#b89865]/20 shadow-2xl group">
            <img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              loading="lazy"
            />
            {/* Elegant overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-transparent to-transparent opacity-80" />
            
            <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <p className="text-[#b89865] font-serif italic text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                In appreciation of
              </p>
            </div>
          </div>
        </motion.div>

        {/* Message Side */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-full lg:w-1/2 relative z-10"
        >
          {/* Floating Message Box */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative bg-[#0d1f3d]/80 backdrop-blur-xl p-10 lg:p-14 rounded-3xl border border-[#b89865]/30 shadow-2xl"
          >
            {/* Large Decorative Quote */}
            <Quote 
              className="absolute -top-6 -left-6 w-16 h-16 text-[#b89865] opacity-20 transform -rotate-12" 
              strokeWidth={1}
            />

            <div className="mb-8" dir="ltr">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-2 tracking-wide font-cairo">
                THANK YOU
              </h2>
              <h3 className="text-xl md:text-2xl text-[#b89865] uppercase tracking-wide font-cairo font-medium">
                {name}
              </h3>
            </div>

            {/* Dotted separator */}
            <div className="w-full h-[1px] bg-gradient-to-r from-[#b89865]/50 via-[#b89865]/20 to-transparent mb-8" />

            <div className="space-y-6" dir="rtl">
              <p className="text-gray-300 text-lg md:text-xl lg:text-2xl leading-[1.8] font-cairo font-light text-right text-justify">
                {message}
              </p>
            </div>
          </motion.div>
        </motion.div>
        
      </div>
    </div>
  );
};

export default TeamMemberCard;

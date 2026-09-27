/**
 * MemberCard3D Component
 * Interactive 3D card effect using CSS transforms (no external assets required)
 */

import { useRef, useState, useEffect, memo } from 'react';
import { Linkedin, Mail } from 'lucide-react';

/**
 * 3D Member Card with tilt effect, drop/bounce animation, and lanyard-style design
 */
const MemberCard3D = memo(function MemberCard3D({ 
  member,
  className = ''
}) {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [animationPhase, setAnimationPhase] = useState('dropping'); // 'dropping', 'bouncing', 'idle'
  const [swingAngle, setSwingAngle] = useState(0);

  // Drop and bounce animation on mount or member change
  useEffect(() => {
    setAnimationPhase('dropping');
    setSwingAngle(0);
    
    // Start bounce after drop
    const dropTimer = setTimeout(() => {
      setAnimationPhase('bouncing');
    }, 400);

    // Start swing/settle after bounce
    const bounceTimer = setTimeout(() => {
      setAnimationPhase('swinging');
      // Swing animation
      let angle = 15;
      let direction = 1;
      let swingCount = 0;
      
      const swingInterval = setInterval(() => {
        setSwingAngle(angle * direction);
        direction *= -1;
        angle *= 0.7; // Dampen the swing
        swingCount++;
        
        if (swingCount > 8 || angle < 1) {
          clearInterval(swingInterval);
          setSwingAngle(0);
          setAnimationPhase('idle');
        }
      }, 150);

      return () => clearInterval(swingInterval);
    }, 800);

    return () => {
      clearTimeout(dropTimer);
      clearTimeout(bounceTimer);
    };
  }, [member.id]); // Re-trigger when member changes

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 15;
    const rotateX = ((centerY - e.clientY) / (rect.height / 2)) * 15;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Get initials from name
  const initials = member.name.split(' ').map(n => n[0]).join('');

  // Calculate animation styles based on phase
  const getAnimationStyles = () => {
    const baseRotation = animationPhase === 'idle' && !isHovered 
      ? `rotateZ(${swingAngle}deg)` 
      : `rotateZ(${swingAngle + rotation.y * 0.3}deg)`;
    
    switch (animationPhase) {
      case 'dropping':
        return {
          transform: `translateY(-300px) ${baseRotation}`,
          opacity: 0,
        };
      case 'bouncing':
        return {
          transform: `translateY(0) ${baseRotation}`,
          opacity: 1,
        };
      case 'swinging':
        return {
          transform: `translateY(0) ${baseRotation}`,
          opacity: 1,
        };
      default:
        return {
          transform: `translateY(0) rotateZ(${isHovered ? rotation.y * 0.3 : 0}deg)`,
          opacity: 1,
        };
    }
  };

  const containerStyles = getAnimationStyles();

  return (
    <div className={`perspective-1000 ${className}`}>
      {/* Animated Container for drop effect */}
      <div 
        className="transition-all ease-out"
        style={{
          ...containerStyles,
          transitionDuration: animationPhase === 'dropping' ? '0ms' : animationPhase === 'bouncing' ? '500ms' : '150ms',
          transitionTimingFunction: animationPhase === 'bouncing' ? 'cubic-bezier(0.34, 1.56, 0.64, 1)' : 'ease-out',
        }}
      >
        {/* Lanyard String */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            {/* Lanyard clip */}
            <div className="w-8 h-4 bg-gradient-to-b from-gray-400 to-gray-500 rounded-t-lg mx-auto shadow-md" />
            {/* Lanyard string */}
            <div 
              className="w-1 bg-gradient-to-b from-ieee-blue via-accent-teal to-ieee-blue mx-auto transition-all duration-300"
              style={{ 
                height: animationPhase === 'bouncing' ? '60px' : isHovered ? '60px' : '80px',
                transform: `rotateZ(${swingAngle * 0.5 + rotation.y * 0.5}deg)`
              }}
            />
          </div>
        </div>

        {/* 3D Card */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative w-80 mx-auto cursor-grab active:cursor-grabbing transition-transform duration-200 ease-out"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${isHovered ? 'scale(1.05)' : 'scale(1)'}`,
            transformStyle: 'preserve-3d',
          }}
        >
        {/* Card Front */}
        <div 
          className="relative bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl overflow-hidden border-4 border-ieee-blue/20"
          style={{
            boxShadow: isHovered 
              ? `${rotation.y * 2}px ${-rotation.x * 2}px 30px rgba(0, 102, 161, 0.3), 0 25px 50px rgba(0, 0, 0, 0.25)`
              : '0 10px 30px rgba(0, 0, 0, 0.2)',
          }}
        >
          {/* Card Header with gradient */}
          <div className="h-24 bg-gradient-to-r from-ieee-blue via-ieee-blue-dark to-accent-teal relative overflow-hidden">
            {/* Decorative pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-2 left-4 w-16 h-16 border-2 border-white rounded-full" />
              <div className="absolute top-6 right-8 w-8 h-8 border-2 border-white rounded-full" />
              <div className="absolute bottom-2 left-1/2 w-12 h-12 border-2 border-white rounded-full" />
            </div>
            {/* IEEE Logo placeholder */}
            <div className="absolute top-3 left-4 text-white font-bold text-sm tracking-wider">
              IEEE
            </div>
            {/* Clip hole */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-4 bg-gray-300 dark:bg-gray-600 rounded-b-full shadow-inner" />
          </div>

          {/* Profile Photo */}
          <div className="relative -mt-16 flex justify-center">
            <div 
              className="w-32 h-32 rounded-full bg-gradient-to-br from-ieee-blue to-accent-teal flex items-center justify-center text-4xl font-bold text-white shadow-xl border-4 border-white dark:border-gray-800 overflow-hidden relative"
              style={{
                transform: `translateZ(20px)`,
              }}
            >
              {member.image ? (
                <img 
                  src={member.image} 
                  alt={member.name}
                  loading="lazy"
                  className="absolute object-cover object-top"
                  style={{ 
                    width: '200%', 
                    height: '200%', 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)' 
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <span 
                className={`absolute inset-0 flex items-center justify-center text-3xl font-bold text-white ${member.image ? 'hidden' : ''}`}
              >
                {initials}
              </span>
            </div>
          </div>

          {/* Member Info */}
          <div className="p-6 pt-4 text-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              {member.name}
            </h3>
            <p className="text-ieee-blue dark:text-ieee-blue-light font-semibold text-sm mb-3">
              {member.position}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
              {member.bio}
            </p>

            {/* Social Links */}
            <div className="flex justify-center gap-3">
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#0077B5] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md"
                style={{ transform: `translateZ(10px)` }}
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${member.email}`}
                className="w-10 h-10 bg-ieee-blue rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md"
                style={{ transform: `translateZ(10px)` }}
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Card Footer */}
          <div className="bg-gray-100 dark:bg-gray-800 px-6 py-3 text-center border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              IEEE Student Branch Member
            </p>
          </div>
        </div>

          {/* 3D Shadow effect */}
          <div 
            className="absolute inset-0 bg-black/20 rounded-2xl blur-xl -z-10 transition-all duration-200"
            style={{
              transform: `translateZ(-20px) translateX(${rotation.y}px) translateY(${-rotation.x}px)`,
            }}
          />
        </div>

        {/* Swing animation hint */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Move your mouse over the card to interact
        </p>
      </div>
    </div>
  );
});

export default MemberCard3D;

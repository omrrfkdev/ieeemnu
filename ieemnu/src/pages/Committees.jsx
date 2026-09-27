/**
 * Committees Page
 * Display branch committees with animated images and descriptions
 * Uses image preloading to prevent animation tearing
 */

import { Users, Target, Megaphone, Camera, GraduationCap, Truck } from 'lucide-react';
import ScrollFloat from '../components/animations/ScrollFloat';
import ScrollReveal from '../components/animations/ScrollReveal';
import PageLoader from '../components/common/PageLoader';
import usePageLoader from '../hooks/usePageLoader';
import { LazyImage } from '../components/gallery';
import { COMMITTEES } from '../constants';

/**
 * Icon mapping for committee data
 */
const iconMap = {
  Megaphone,
  Camera,
  Users,
  Target,
  GraduationCap,
  Truck,
};

/**
 * Animated floating shape component
 */
const FloatingShape = ({ className, delay = 0 }) => (
  <div
    className={`absolute rounded-full opacity-20 blur-3xl animate-pulse ${className}`}
    style={{ animationDelay: `${delay}s`, animationDuration: '4s' }}
  />
);

/**
 * Committee card component with animations
 */
const CommitteeSection = ({ committee, index }) => {
  const isEven = index % 2 === 0;
  const Icon = iconMap[committee.icon];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background decorative shapes */}
      <FloatingShape
        className={`w-96 h-96 bg-gradient-to-r ${committee.color} ${isEven ? '-left-48 top-0' : '-right-48 bottom-0'}`}
        delay={index * 0.5}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}>
          {/* Image Section with Animation */}
          <div className="w-full lg:w-1/2 relative">
            <ScrollFloat
              animationDuration={1.2}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
            >
              <div className="relative group">
                {/* Animated glow background */}
                <div
                  className={`absolute -inset-4 bg-gradient-to-r ${committee.color} rounded-3xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-700`}
                />
                
                {/* Floating animation container */}
                <div className="relative animate-float">
                  {/* Image container with border */}
                  <div className={`relative rounded-2xl overflow-hidden ${committee.shadowColor} shadow-2xl`}>
                    {/* Gradient border */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${committee.color} p-1 rounded-2xl`}>
                      <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl" />
                    </div>
                    
                    {/* Image */}
                    <LazyImage
                      src={committee.image}
                      alt={committee.name}
                      className="relative z-10 w-full h-auto object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                      wrapperClassName="relative z-10"
                    />
                    
                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -translate-x-full group-hover:translate-x-full" />
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className={`absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r ${committee.color} rounded-full opacity-60 blur-xl animate-pulse`} />
                <div className={`absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r ${committee.color} rounded-full opacity-40 blur-xl animate-pulse`} style={{ animationDelay: '1s' }} />
              </div>
            </ScrollFloat>
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2 space-y-6">
            {/* Icon and Title */}
            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              baseRotation={5}
              blurStrength={10}
              animationDuration={1}
              stagger={0.03}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-4 rounded-2xl bg-gradient-to-r ${committee.color} ${committee.shadowColor} shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  {committee.name}
                </h2>
              </div>
            </ScrollReveal>

            {/* Description */}
            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              baseRotation={3}
              blurStrength={8}
              animationDuration={1}
              stagger={0.02}
            >
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {committee.description}
              </p>
            </ScrollReveal>

            {/* Responsibilities */}
            <ScrollFloat
              animationDuration={1}
              ease="power3.out"
              scrollStart="center bottom+=30%"
              scrollEnd="bottom bottom-=20%"
            >
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Key Responsibilities:
                </h3>
                <div className="flex flex-wrap gap-3">
                  {committee.responsibilities.map((item, i) => (
                    <span
                      key={i}
                      className={`px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${committee.color} text-white shadow-md ${committee.shadowColor} transform hover:scale-105 transition-transform duration-300`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollFloat>
          </div>
        </div>
      </div>
    </section>
  );
};

// Collect all committee images for preloading
const COMMITTEE_IMAGES = COMMITTEES.map(c => c.image);

/**
 * Committees page component
 */
const Committees = () => {
  const { isLoading } = usePageLoader(COMMITTEE_IMAGES, 300);

  return (
    <div className="committees-page relative">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-ieee-blue via-ieee-blue-dark to-accent-purple text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent-teal rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-accent-orange rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-accent-purple rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>

        {/* Dot Grid Pattern */}
        <div className="absolute inset-0 opacity-10 z-0 pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Our Committees
            </h1>

            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto">
              Discover the dedicated teams that power our IEEE Student Branch and drive innovation forward
            </p>
          </div>
        </div>

      </section>

      {/* Committees Sections */}
      <div className="bg-transparent">
        {COMMITTEES.map((committee, index) => (
          <div
            key={committee.id}
            className={index % 2 === 1 ? 'bg-gray-50 dark:bg-gray-800/50' : ''}
          >
            <CommitteeSection committee={committee} index={index} />
          </div>
        ))}
      </div>

     

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(45deg);
          }
          to {
            transform: rotate(405deg);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Committees;

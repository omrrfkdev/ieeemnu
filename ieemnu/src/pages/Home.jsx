/**
 * Home Page
 * Landing page with hero section, stats, featured events, and CTA
 */

import { useEffect, useRef, useMemo, useCallback, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar, Users, Award, Code } from 'lucide-react';
import Button from '../components/common/Button';
import Card, { CardBody } from '../components/common/Card';
import ScrollReveal from '../components/animations/ScrollReveal';
import CountUp from '../components/animations/CountUp';
import LogoLoop from '../components/animations/LogoLoop';
import Countdown from '../components/common/Countdown';
import { STATS } from '../constants';
import { useStaggerAnimation } from '../hooks/useScrollAnimation';

// Lazy load heavy animation components
const Silk = lazy(() => import('../components/animations/Silk'));
const MagicBentoCard = lazy(() => import('../components/animations/MagicBento'));
const MagicBentoGrid = lazy(() => 
  import('../components/animations/MagicBento').then(module => ({ default: module.MagicBentoGrid }))
);

// Loading fallback component
const LoadingFallback = ({ height = '200px' }) => (
  <div 
    className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"
    style={{ minHeight: height }}
  >
    <div className="w-8 h-8 border-4 border-ieee-blue border-t-transparent rounded-full animate-spin" />
  </div>
);

// Sponsor logos data - using image URLs
const sponsorLogos = [
  { 
    src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", 
    alt: "Google", 
    title: "Google", 
    href: "https://google.com" 
  },
  { 
    src: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg", 
    alt: "Microsoft", 
    title: "Microsoft", 
    href: "https://microsoft.com" 
  },
  { 
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", 
    alt: "Amazon", 
    title: "Amazon", 
    href: "https://amazon.com" 
  },
  { 
    src: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg", 
    alt: "Meta", 
    title: "Meta", 
    href: "https://meta.com" 
  },
  { 
    src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", 
    alt: "Apple", 
    title: "Apple", 
    href: "https://apple.com" 
  },
  { 
    src: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg", 
    alt: "IBM", 
    title: "IBM", 
    href: "https://ibm.com" 
  },
  { 
    src: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282006-2020%29.svg", 
    alt: "Intel", 
    title: "Intel", 
    href: "https://intel.com" 
  },
  { 
    src: "https://upload.wikimedia.org/wikipedia/sco/2/21/Nvidia_logo.svg", 
    alt: "NVIDIA", 
    title: "NVIDIA", 
    href: "https://nvidia.com" 
  },
];

// Collaborator logos data - using image URLs
const collaboratorLogos = [
  { 
    src: "https://upload.wikimedia.org/wikipedia/commons/2/21/IEEE_logo.svg", 
    alt: "IEEE", 
    title: "IEEE Headquarters", 
    href: "https://ieee.org" 
  },
  { 
    src: "https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg", 
    alt: "MIT", 
    title: "MIT", 
    href: "https://mit.edu" 
  },
  { 
    src: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Stanford_Cardinal_logo.svg", 
    alt: "Stanford", 
    title: "Stanford University", 
    href: "https://stanford.edu" 
  },
  { 
    src: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Association_for_Computing_Machinery_%28ACM%29_logo.svg", 
    alt: "ACM", 
    title: "ACM", 
    href: "https://acm.org" 
  },
  { 
    src: "https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg", 
    alt: "NASA", 
    title: "NASA", 
    href: "https://nasa.gov" 
  },
  { 
    src: "https://upload.wikimedia.org/wikipedia/en/a/ae/CERN_logo.svg", 
    alt: "CERN", 
    title: "CERN", 
    href: "https://cern.ch" 
  },
  { 
    src: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg", 
    alt: "OpenAI", 
    title: "OpenAI", 
    href: "https://openai.com" 
  },
  { 
    src: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg", 
    alt: "GitHub", 
    title: "GitHub", 
    href: "https://github.com" 
  },
];

gsap.registerPlugin(ScrollTrigger);

/**
 * Home page component
 * Features:
 * - Animated hero section
 * - Member statistics
 * - Featured upcoming events
 * - Call-to-action sections
 * 
 * @returns {JSX.Element} Home page
 */
const Home = () => {
  const heroRef = useRef(null);
  const statsRef = useStaggerAnimation({
    selector: '.stat-card',
    animation: { y: 0, opacity: 1, duration: 0.8 },
    stagger: 0.15,
  });

  const eventsRef = useStaggerAnimation({
    selector: '.event-card',
    animation: { y: 0, opacity: 1, duration: 0.8 },
    stagger: 0.2,
  });

  const featureCardsRef = useStaggerAnimation({
    selector: '.feature-card',
    animation: { y: 0, opacity: 1, scale: 1, duration: 0.8 },
    stagger: 0.15,
  });

  // Hero buttons animation (ScrollReveal handles title/subtitle)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !heroRef.current) return;

    const heroButtons = heroRef.current.querySelector('.hero-buttons');
    if (!heroButtons) return;

    const ctx = gsap.context(() => {
      gsap.from(heroButtons, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 0.8,
        ease: 'power3.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen w-full flex items-center justify-center bg-transparent overflow-hidden"
      >
        {/* Silk Animated Background */}
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<div className="w-full h-full bg-[#060b14]" />}>
            <Silk
              speed={5}
              scale={1}
              color="#3B82F6"
              noiseIntensity={1.5}
              rotation={0}
            />
          </Suspense>
        </div>

        {/* Hero Content with Cinematic Animation */}
        <div className="absolute z-10 flex flex-col items-center justify-center w-full px-4 transform-gpu">
          {/* Logo with fade-in and subtle float */}
          <div 
            className="logo-container animate-fade-in-up"
            style={{ 
              animation: 'fadeInUp 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards, float 6s ease-in-out infinite alternate',
              opacity: 0,
              transform: 'translateY(20px) scale(0.95)',
              willChange: 'transform, opacity'
            }}
          >
            <img 
              src="/logo.png" 
              alt="IEEE MNU Logo" 
              className="w-48 sm:w-64 md:w-80 lg:w-96 object-contain drop-shadow-2xl filter brightness-110"
              style={{ filter: 'drop-shadow(0 0 30px rgba(59, 130, 246, 0.4))' }}
            />
          </div>

          {/* Cinematic Tagline */}
          <h2 
            className="mt-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white uppercase tracking-[0.3em] sm:tracking-[0.4em] font-light text-center px-4"
            style={{ 
              fontFamily: '"Cinzel", "Inter", serif',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.8), 0 0 10px rgba(59, 130, 246, 0.3)',
              animation: 'fadeInUp 1.5s cubic-bezier(0.22, 1, 0.36, 1) 0.5s forwards',
              opacity: 0,
              transform: 'translateY(15px)'
            }}
          >
            Never planned <span className="block sm:inline sm:mx-2 my-2 sm:my-0 text-ieee-blue opacity-80">|</span> Always meant to be
          </h2>

          {/* CTA Buttons */}
          <div 
            className="hero-buttons mt-12 flex flex-col sm:flex-row gap-4 justify-center opacity-0"
            style={{ 
              animation: 'fadeInUp 1s cubic-bezier(0.22, 1, 0.36, 1) 1s forwards',
            }}
          >
            <Button
              as={Link}
              to="/events"
              size="lg"
              variant="secondary"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
            >
              Explore Events
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex items-start justify-center p-2"
            style={{ animation: 'bounce 2s infinite' }}>
            <div className="w-1 h-2 bg-white/80 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="w-full">
        <Countdown />
      </section>

      {/* Counts Section - commented out */}
      {/*
      <section className="py-20 bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, index) => {
              // Parse the stat value to extract number and suffix (e.g., "150+" -> 150, "+")
              const numericValue = parseInt(stat.value.replace(/[^0-9]/g, ''), 10);
              const suffix = stat.value.replace(/[0-9]/g, '');
              
              return (
                <Card
                  key={index}
                  className="stat-card text-center p-8"
                  variant="elevated"
                >
                  <div className="text-4xl md:text-5xl font-bold text-ieee-blue dark:text-ieee-blue-light mb-2">
                    <CountUp
                      from={0}
                      to={numericValue}
                      duration={2}
                      delay={index * 0.2}
                      separator=","
                      className=""
                    />
                    <span>{suffix}</span>
                  </div>
                  <ScrollReveal
                    as="div"
                    className="text-gray-600 dark:text-gray-400 font-medium"
                    baseOpacity={0}
                    enableBlur={true}
                    baseRotation={5}
                    blurStrength={8}
                    animationDuration={0.8}
                    stagger={0.02}
                  >
                    {stat.label}
                  </ScrollReveal>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      */}

      {/* About Preview Section */}
      <section className="py-20 bg-slate-100/50 dark:bg-white/[0.02]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <ScrollReveal
                as="h2"
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
                animationDuration={1}
                stagger={0.03}
              >
                Who We Are
              </ScrollReveal>
              <ScrollReveal
                as="p"
                className="text-lg text-gray-600 dark:text-gray-300 mb-6"
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
                animationDuration={1}
                stagger={0.02}
              >
                We are a vibrant community of students passionate about technology, innovation, and making a positive impact on the world. As part of the world's largest technical professional organization, we provide opportunities for learning, networking, and professional development.
              </ScrollReveal>
              <ScrollReveal
                as="p"
                className="text-lg text-gray-600 dark:text-gray-300 mb-8"
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
                animationDuration={1}
                stagger={0.02}
              >
                Through workshops, competitions, projects, and events, we help our members develop technical skills, leadership abilities, and professional connections that last a lifetime.
              </ScrollReveal>
            </div>
            <Suspense fallback={<LoadingFallback height="400px" />}>
            <MagicBentoGrid
              className="grid-cols-2 gap-4"
              enableSpotlight={true}
              spotlightRadius={300}
              glowColor="0, 102, 161"
            >
              <MagicBentoCard
                className="feature-card"
                enableStars={true}
                enableSpotlight={true}
                enableBorderGlow={true}
                enableTilt={true}
                enableMagnetism={true}
                clickEffect={true}
                glowColor="0, 102, 161"
              >
                <div className="magic-bento-card__header">
                  <Users className="magic-bento-card__icon w-12 h-12 text-ieee-blue" />
                </div>
                <div className="magic-bento-card__content">
                  <ScrollReveal
                    as="h3"
                    className="magic-bento-card__title"
                    baseOpacity={0}
                    enableBlur={true}
                    baseRotation={5}
                    blurStrength={10}
                    animationDuration={0.8}
                    stagger={0.03}
                  >
                    Community
                  </ScrollReveal>
                  <ScrollReveal
                    as="p"
                    className="magic-bento-card__description"
                    baseOpacity={0}
                    enableBlur={true}
                    baseRotation={5}
                    blurStrength={10}
                    animationDuration={0.8}
                    stagger={0.02}
                  >
                    Connect with like-minded students and professionals
                  </ScrollReveal>
                </div>
              </MagicBentoCard>
              <MagicBentoCard
                className="feature-card"
                enableStars={true}
                enableSpotlight={true}
                enableBorderGlow={true}
                enableTilt={true}
                enableMagnetism={true}
                clickEffect={true}
                glowColor="0, 184, 212"
              >
                <div className="magic-bento-card__header">
                  <Code className="magic-bento-card__icon w-12 h-12 text-accent-teal" />
                </div>
                <div className="magic-bento-card__content">
                  <ScrollReveal
                    as="h3"
                    className="magic-bento-card__title"
                    baseOpacity={0}
                    enableBlur={true}
                    baseRotation={5}
                    blurStrength={10}
                    animationDuration={0.8}
                    stagger={0.03}
                  >
                    Projects
                  </ScrollReveal>
                  <ScrollReveal
                    as="p"
                    className="magic-bento-card__description"
                    baseOpacity={0}
                    enableBlur={true}
                    baseRotation={5}
                    blurStrength={10}
                    animationDuration={0.8}
                    stagger={0.02}
                  >
                    Work on real-world technical projects
                  </ScrollReveal>
                </div>
              </MagicBentoCard>
              <MagicBentoCard
                className="feature-card"
                enableStars={true}
                enableSpotlight={true}
                enableBorderGlow={true}
                enableTilt={true}
                enableMagnetism={true}
                clickEffect={true}
                glowColor="249, 115, 22"
              >
                <div className="magic-bento-card__header">
                  <Calendar className="magic-bento-card__icon w-12 h-12 text-accent-orange" />
                </div>
                <div className="magic-bento-card__content">
                  <ScrollReveal
                    as="h3"
                    className="magic-bento-card__title"
                    baseOpacity={0}
                    enableBlur={true}
                    baseRotation={5}
                    blurStrength={10}
                    animationDuration={0.8}
                    stagger={0.03}
                  >
                    Events
                  </ScrollReveal>
                  <ScrollReveal
                    as="p"
                    className="magic-bento-card__description"
                    baseOpacity={0}
                    enableBlur={true}
                    baseRotation={5}
                    blurStrength={10}
                    animationDuration={0.8}
                    stagger={0.02}
                  >
                    Attend workshops, seminars, and competitions
                  </ScrollReveal>
                </div>
              </MagicBentoCard>
              <MagicBentoCard
                className="feature-card"
                enableStars={true}
                enableSpotlight={true}
                enableBorderGlow={true}
                enableTilt={true}
                enableMagnetism={true}
                clickEffect={true}
                glowColor="139, 92, 246"
              >
                <div className="magic-bento-card__header">
                  <Award className="magic-bento-card__icon w-12 h-12 text-accent-purple" />
                </div>
                <div className="magic-bento-card__content">
                  <ScrollReveal
                    as="h3"
                    className="magic-bento-card__title"
                    baseOpacity={0}
                    enableBlur={true}
                    baseRotation={5}
                    blurStrength={10}
                    animationDuration={0.8}
                    stagger={0.03}
                  >
                    Recognition
                  </ScrollReveal>
                  <ScrollReveal
                    as="p"
                    className="magic-bento-card__description"
                    baseOpacity={0}
                    enableBlur={true}
                    baseRotation={5}
                    blurStrength={10}
                    animationDuration={0.8}
                    stagger={0.02}
                  >
                    Gain recognition for your achievements
                  </ScrollReveal>
                </div>
              </MagicBentoCard>
            </MagicBentoGrid>
            </Suspense>
          </div>
        </div>
      </section>

      {/* Sponsors Section - commented out */}
      {/*
      <section className="py-20 bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Sponsors
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Proudly supported by industry leaders who believe in our mission
            </p>
          </div>

          <div className="relative h-20 overflow-hidden">
            <LogoLoop
              logos={sponsorLogos}
              speed={80}
              direction="left"
              logoHeight={48}
              gap={100}
              hoverSpeed={20}
              scaleOnHover
              ariaLabel="Our sponsors"
            />
          </div>
        </div>
      </section>

      {/*
      <section className="py-20 bg-slate-100/50 dark:bg-white/[0.02]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Collaborators
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Working together with amazing organizations to drive innovation
            </p>
          </div>

          <div className="relative h-16 overflow-hidden">
            <LogoLoop
              logos={collaboratorLogos}
              speed={60}
              direction="right"
              logoHeight={40}
              gap={80}
              hoverSpeed={15}
              scaleOnHover
              ariaLabel="Our collaborators"
            />
          </div>
        </div>
      </section>
      */}
    </div>
  );
};

export default Home;

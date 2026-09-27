/**
 * Team Page
 * Display team members with role tabs and Lanyard effect
 * Uses image preloading to prevent animation tearing
 */

import { useState, useRef, useEffect } from 'react';
import { Users, BookOpen, Award, Briefcase, Code, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import Card, { CardBody } from '../components/common/Card';
import ScrollFloat from '../components/animations/ScrollFloat';
import MemberCard3D from '../components/animations/MemberCard3D';
import { TEAM_MEMBERS, MEMBER_BENEFITS } from '../constants';
import { useStaggerAnimation } from '../hooks/useScrollAnimation';
import PageLoader from '../components/common/PageLoader';
import usePageLoader from '../hooks/usePageLoader';
import MemberContactModal from '../components/common/MemberContactModal';
import Toast from '../components/common/Toast';

// Committee tabs order
const COMMITTEE_ORDER = ['chairman', 'marketing', 'media', 'hr', 'pr', 'coaching', 'logistics'];

// Get all member images for the hero animation
const getAllMemberImages = () => {
  const images = [];
  Object.values(TEAM_MEMBERS).forEach(committee => {
    committee.members.forEach(member => {
      if (member.image) {
        images.push({ image: member.image, name: member.name });
      }
    });
  });
  return images;
};

// Get all image URLs for preloading
const ALL_TEAM_IMAGES = Object.values(TEAM_MEMBERS).flatMap(committee =>
  committee.members.filter(m => m.image).map(m => m.image)
);

/**
 * Team page component
 * Features:
 * - Executive committee profiles
 * - Member benefits
 * 
 * @returns {JSX.Element} Team page
 */
const Team = () => {
  const { isLoading } = usePageLoader(ALL_TEAM_IMAGES, 300);

  // State for selected committee tab
  const [selectedCommittee, setSelectedCommittee] = useState('chairman');
  // State for selected member within the committee
  const [selectedMemberIndex, setSelectedMemberIndex] = useState(0);
  const [showLanyard, setShowLanyard] = useState(true);

  // Modal and Toast state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Refs for auto-scrolling tabs
  const tabsContainerRef = useRef(null);
  const tabButtonRefs = useRef({});
  const memberTabsRef = useRef(null);

  // Get current committee data
  const currentCommittee = TEAM_MEMBERS[selectedCommittee];

  // Get current member
  const selectedMember = currentCommittee?.members[selectedMemberIndex] || null;

  // Get all member images for floating animation
  const memberImages = getAllMemberImages();

  // Floating positions for member photos - larger sizes
  const floatingPositions = [
    { top: '8%', left: '5%', width: '80px', height: '80px' },
    { top: '12%', right: '8%', width: '90px', height: '90px' },
    { top: '35%', left: '2%', width: '70px', height: '70px' },
    { top: '55%', left: '6%', width: '85px', height: '85px' },
    { top: '65%', right: '4%', width: '75px', height: '75px' },
    { top: '22%', right: '2%', width: '65px', height: '65px' },
    { top: '45%', right: '8%', width: '80px', height: '80px' },
    { top: '78%', left: '12%', width: '70px', height: '70px' },
    { top: '5%', left: '18%', width: '55px', height: '55px' },
    { top: '40%', left: '10%', width: '75px', height: '75px' },
  ];

  // Auto-scroll active committee tab to center
  useEffect(() => {
    if (selectedCommittee && tabButtonRefs.current[selectedCommittee] && tabsContainerRef.current) {
      const container = tabsContainerRef.current;
      const activeButton = tabButtonRefs.current[selectedCommittee];

      const containerWidth = container.offsetWidth;
      const buttonLeft = activeButton.offsetLeft;
      const buttonWidth = activeButton.offsetWidth;
      const scrollPosition = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);

      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [selectedCommittee]);

  // Reset member index when committee changes
  useEffect(() => {
    setSelectedMemberIndex(0);
    setShowLanyard(true);
  }, [selectedCommittee]);

  const benefitsRef = useStaggerAnimation({
    selector: '.benefit-card',
    animation: { y: 0, opacity: 1, duration: 0.8 },
    stagger: 0.1,
    stagger: 0.1,
  });

  // Show toast on first visit
  useEffect(() => {
    const hasSeenToast = localStorage.getItem('hasSeenMemberToast_v2');
    if (!hasSeenToast && !isLoading) {
      // Delay toast slightly
      const timer = setTimeout(() => {
        setShowToast(true);
        localStorage.setItem('hasSeenMemberToast_v2', 'true');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Handle committee tab click
  const handleCommitteeClick = (committeeId) => {
    setSelectedCommittee(committeeId);
  };

  // Handle member click within committee
  const handleMemberClick = (index) => {
    if (selectedMemberIndex === index) {
      setShowLanyard(!showLanyard);
    } else {
      setSelectedMemberIndex(index);
      setShowLanyard(true);
    }
  };

  // Navigate to previous/next member within committee
  const navigateMember = (direction) => {
    const members = currentCommittee?.members || [];
    let newIndex;
    if (direction === 'prev') {
      newIndex = selectedMemberIndex <= 0 ? members.length - 1 : selectedMemberIndex - 1;
    } else {
      newIndex = selectedMemberIndex >= members.length - 1 ? 0 : selectedMemberIndex + 1;
    }
    setSelectedMemberIndex(newIndex);
  };

  // Handle Lanyard Card click
  const handleCardClick = () => {
    if (selectedMember) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  /**
   * Icon mapping for benefits
   */
  const iconMap = {
    BookOpen,
    Users,
    Award,
    Briefcase,
    Code,
    Globe,
  };

  return (
    <div className="team-page">
      {/* Custom CSS for floating animations */}
      <style>{`
        @keyframes float-0 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(5deg); } }
        @keyframes float-1 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-25px) rotate(-5deg); } }
        @keyframes float-2 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-15px) rotate(3deg); } }
        @keyframes float-3 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-30px) rotate(-3deg); } }
        @keyframes float-4 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-18px) rotate(4deg); } }
        @keyframes float-5 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-22px) rotate(-4deg); } }
        @keyframes float-6 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-28px) rotate(2deg); } }
        @keyframes float-7 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-16px) rotate(-2deg); } }
        @keyframes float-8 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-24px) rotate(6deg); } }
        @keyframes float-9 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(-6deg); } }
      `}</style>

      {/* Hero Section with Floating Member Photos */}
      <section className="relative py-20 sm:py-24 md:py-32 overflow-hidden bg-gradient-to-r from-ieee-blue via-accent-teal to-cyan-400">
        {/* Subtle decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Small decorative dots/circles */}
          <div className="absolute top-[15%] left-[8%] w-3 h-3 rounded-full bg-orange-400 opacity-80" />
          <div className="absolute top-[40%] left-[5%] w-4 h-4 rounded-full bg-white/20" />
          <div className="absolute top-[70%] right-[15%] w-6 h-6 rounded-full border-2 border-white/30 rotate-45" style={{ borderRadius: '2px' }} />
        </div>

        {/* Floating Member Photos */}
        <div className="absolute inset-0 pointer-events-none">
          {memberImages.slice(0, 10).map((member, index) => {
            const pos = floatingPositions[index % floatingPositions.length];
            return (
              <div
                key={index}
                className="absolute rounded-full overflow-hidden border-4 border-white/40 shadow-2xl"
                style={{
                  top: pos.top,
                  left: pos.left,
                  right: pos.right,
                  width: pos.width,
                  height: pos.height,
                  animation: `float-${index % 10} ${4 + (index % 3)}s ease-in-out infinite`,
                  animationDelay: `${index * 0.3}s`,
                  zIndex: 10,
                }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="absolute object-cover object-top"
                  style={{
                    width: '200%',
                    height: '200%',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollFloat
              as="h1"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white"
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
            >
              Meet Our Amazing Team
            </ScrollFloat>
            <ScrollFloat
              as="p"
              className="text-base sm:text-lg md:text-xl text-white/90 px-2 mb-8"
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
            >
              The passionate individuals driving innovation and technology forward
            </ScrollFloat>
          </div>
        </div>
      </section>

      {/* Team Members - Committee Tabs - Mobile Responsive */}
      <section className="py-10 sm:py-16 md:py-20 bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
              Our Team
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-2">
              Select a committee to view the team members
            </p>
          </div>

          {/* Committee Tabs - Horizontal scrollable on mobile */}
          <div
            ref={tabsContainerRef}
            className="mb-6 overflow-x-auto pb-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex gap-2 sm:gap-3 min-w-max px-2 sm:px-4 md:justify-center">
              {COMMITTEE_ORDER.map((committeeId) => {
                const committee = TEAM_MEMBERS[committeeId];
                return (
                  <button
                    key={committeeId}
                    ref={(el) => (tabButtonRefs.current[committeeId] = el)}
                    onClick={() => handleCommitteeClick(committeeId)}
                    className={`
                      px-3 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm md:text-base whitespace-nowrap
                      transition-all duration-300 transform hover:scale-105
                      ${selectedCommittee === committeeId
                        ? `bg-gradient-to-r ${committee.color} text-white shadow-lg`
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }
                    `}
                  >
                    {committee.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Member Selection Tabs within Committee */}
          {currentCommittee && (
            <div
              ref={memberTabsRef}
              className="mb-6 overflow-x-auto pb-2 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex gap-2 sm:gap-3 min-w-max px-2 sm:px-4 justify-center">
                {currentCommittee.members.map((member, index) => (
                  <button
                    key={member.id}
                    onClick={() => handleMemberClick(index)}
                    className={`
                      flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full font-medium text-xs sm:text-sm whitespace-nowrap
                      transition-all duration-300 transform hover:scale-105
                      ${selectedMemberIndex === index
                        ? `bg-gradient-to-r ${currentCommittee.color} text-white shadow-md`
                        : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                      }
                    `}
                  >
                    {/* Member Photo Thumbnail */}
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="w-full h-full flex items-center justify-center text-xs font-bold">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      )}
                    </div>
                    <span className="hidden sm:inline">{member.position}</span>
                    <span className="sm:hidden">{member.position.split(' ').slice(-1)[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Lanyard Display Area */}
          {showLanyard && selectedMember && (
            <div className="relative">
              {/* Navigation Arrows - Mobile Responsive */}
              <button
                onClick={() => navigateMember('prev')}
                className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-ieee-blue hover:text-white transition-colors"
                aria-label="Previous member"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </button>
              <button
                onClick={() => navigateMember('next')}
                className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-ieee-blue hover:text-white transition-colors"
                aria-label="Next member"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </button>

              {/* Member Info Header - Mobile Responsive */}
              <div className="text-center mb-4 sm:mb-6 px-8 sm:px-12">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedMember.name}
                </h3>
                <p className={`font-medium bg-gradient-to-r ${currentCommittee.color} bg-clip-text text-transparent`}>
                  {selectedMember.position}
                </p>
              </div>

              {/* 3D Member Card - Mobile Responsive */}
              <div
                className="py-4 sm:py-6 md:py-8 px-4 sm:px-8 cursor-pointer transform hover:scale-105 transition-transform duration-300"
                onClick={handleCardClick}
              >
                <MemberCard3D member={selectedMember} />
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4 animate-pulse">
                  Click card for contact info
                </p>
              </div>
            </div>
          )}

          {/* Prompt to select a member - Mobile Responsive */}
          {!showLanyard && (
            <div className="text-center py-10 sm:py-12 md:py-16 bg-gray-50 dark:bg-gray-800 rounded-xl sm:rounded-2xl mx-2 sm:mx-0">
              <Users className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 text-gray-400" />
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 px-4">
                Select a member above to view their ID card
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Member Benefits - Mobile Responsive */}
      <section className="py-10 sm:py-16 md:py-20 bg-slate-100/50 dark:bg-white/[0.02]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
              Member Benefits
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-2">
              Discover the advantages of being part of our IEEE student branch
            </p>
          </div>

          <div ref={benefitsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {MEMBER_BENEFITS.map((benefit, index) => {
              const Icon = iconMap[benefit.icon];
              return (
                <Card
                  key={index}
                  className="benefit-card"
                  variant="elevated"
                  hoverable
                >
                  <CardBody className="text-center">
                    <div className="w-16 h-16 bg-ieee-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-ieee-blue" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {benefit.description}
                    </p>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal and Toast */}
      <MemberContactModal
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <Toast
        message="Click on the ID card to view contact information"
        isVisible={showToast}
        onDismiss={() => setShowToast(false)}
      />

    </div>
  );
};

export default Team;

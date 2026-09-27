/**
 * Constants and Configuration
 * Central location for all static data used throughout the application
 */

import { Users, BookOpen, Award, Briefcase, Code, Globe, Heart, Zap, Target, Lightbulb } from 'lucide-react';

/**
 * Branch Information
 */
export const BRANCH_INFO = {
  name: 'IEEE Student Branch',
  university: 'Mansoura National University',
  established: '2022',
  // email: 'ieee@university.edu',
  phone: '+20 103 434 44715',
};

/**
 * Social Media Links
 */
export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/ieee',
  twitter: 'https://twitter.com/ieee',
  linkedin: 'https://linkedin.com/company/ieee',
  instagram: 'https://instagram.com/ieee',
  github: 'https://github.com/ieee',
};

/**
 * Navigation Menu Items
 */
export const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  // { path: '/about', label: 'About' },
  { path: '/events', label: 'Events' },
  // { path: '/projects', label: 'Projects' },
  { path: '/board', label: 'Board' },
  { path: '/committees', label: 'Committees' },
  { path: '/membership', label: 'Membership' },
  { path: '/minigame', label: 'Play ENIGMA' },
  { path: '/faq', label: 'FAQ' },
  { path: '/registration', label: 'Registration' },
];

/**
 * Member Statistics for Homepage
 */
export const STATS = [
  { value: '150+', label: 'Active Members' },
  { value: '50+', label: 'Events Organized' },
  { value: '25+', label: 'Projects Completed' },
  { value: '10+', label: 'Industry Partners' },
];

/**
 * Team Members organized by committee
 */
export const TEAM_MEMBERS = {
  chairman: {
    name: 'Executive Board',
    members: [
      {
        id: 'chairman-head',
        name: 'Mohamed Elgazar',
        position: 'Chairperson',
        image: '/membersImg/chairman/head.webp',
        bio: 'Leading the IEEE student branch with passion for technology and innovation.',
        linkedin: 'https://www.linkedin.com/in/mohamed-elgazar-344557298?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
        email: 'mohamed_elgazar@ieee.org',
      },
      {
        id: 'chairman-vice',
        name: 'Abdelrahman Elnajar',
        position: 'Vice Chairperson',
        image: '/membersImg/chairman/vice.webp',
        bio: 'Supporting branch activities and coordinating technical workshops.',
        linkedin: 'https://www.linkedin.com/in/abdelrhman-elnajar',
        email: 'nooraldeenahmed04@gmail.com',
      },
      {
        id: 'secretary',
        name: 'Retaj Ramy',
        position: 'Secretary',
        image: '/membersImg/secretary.webp',
        bio: 'Managing communications and documentation for the branch.',
        linkedin: 'https://linkedin.com/in/',
        email: 'secretary@ieee.edu',
      },
      {
        id: 'treasurer',
        name: 'Amr Ashraf',
        position: 'Treasurer',
        image: '/membersImg/treasurer.webp',
        bio: 'Handling financial operations and budget management.',
        linkedin: 'https://www.linkedin.com/in/amr-ashraf-69b729269',
        email: 'a.abdelwahab0506@gmail.com',
      },
    ],
  },
  marketing: {
    name: 'Marketing',
    members: [
      {
        id: 'marketing-head',
        name: 'Youmna Abdulaziz',
        position: 'Head of Marketing',
        image: '/membersImg/marketing/head.webp',
        bio: 'Leading marketing strategies and brand development.',
        linkedin: 'https://linkedin.com/in/',
        email: 'marketing@ieee.edu',
      },
      {
        id: 'marketing-vice',
        name: 'Fatma Ahmed',
        position: 'Vice Head of Marketing',
        image: '/membersImg/marketing/vice.webp',
        bio: 'Supporting marketing initiatives and content creation.',
        linkedin: 'https://linkedin.com/in/',
        email: 'marketing-vice@ieee.edu',
      },
    ],
  },
  media: {
    name: 'Media',
    members: [
      {
        id: 'media-head',
        name: 'Ali Mohamed',
        position: 'Head of Media',
        image: '/membersImg/media/head.webp',
        bio: 'Leading media production and visual content creation.',
        linkedin: 'https://www.linkedin.com/in/ali-alzanfaly-059a3438a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
        email: 'alialzanfaly@gmail.com',
      },
      {
        id: 'media-vice-graphic',
        name: 'Ahmed Tarek',
        position: 'Vice Head - Graphic Design',
        image: '/membersImg/media/vice-graphic.webp',
        bio: 'Creating stunning visual designs and graphics.',
        linkedin: 'https://linkedin.com/in/',
        email: 'graphics@ieee.edu',
      },
      {
        id: 'media-vice-photography',
        name: 'Omar Kamel',
        position: 'Vice Head - Photography',
        image: '/membersImg/media/vice-photography.webp',
        bio: 'Capturing memorable moments at IEEE /heroBgImg/.',
        linkedin: 'https://linkedin.com/in/',
        email: 'photography@ieee.edu',
      },
      {
        id: 'media-vice-video',
        name: 'Omar Rafeek',
        position: 'Vice Head - Video Production',
        image: '/membersImg/media/vice-video.webp',
        bio: 'Producing engaging video content for IEEE.',
        linkedin: 'https://linkedin.com/in/',
        email: 'video@ieee.edu',
      },
    ],
  },
  hr: {
    name: 'Human Resources',
    members: [
      {
        id: 'hr-head',
        name: 'Noor Eldeen Ahmed',
        position: 'Head of HR',
        image: '/membersImg/hr/head.webp',
        bio: 'Managing member relations and team development.',
        linkedin: 'https://linkedin.com/in/',
        email: 'hr@ieee.edu',
      },
      {
        id: 'hr-vice',
        name: 'Abdulrahman Shafiq',
        position: 'Vice Head of HR',
        image: '/membersImg/hr/vice.webp',
        bio: 'Supporting recruitment and member engagement.',
        linkedin: 'https://www.linkedin.com/in/abdulrahman-shafiq-851141358',
        email: 'abdoshafiq6@gmail.com',
      },
    ],
  },
  pr: {
    name: 'Public Relations',
    members: [
      {
        id: 'pr-head',
        name: 'Ahmed Alsabi',
        position: 'Head of PR',
        image: '/membersImg/pr/head.webp',
        bio: 'Building /partenershipImg/s and managing external relations.',
        linkedin: 'https://linkedin.com/in/',
        email: 'pr@ieee.edu',
      },
      {
        id: 'pr-vice',
        name: 'Maya Hossam',
        position: 'Vice Head of PR',
        image: '/membersImg/pr/vice.webp',
        bio: 'Supporting sponsor relations and networking /heroBgImg/.',
        linkedin: 'https://www.linkedin.com/in/maya-hossam-628950392',
        email: 'mayahossamm3052006@gmail.com',
      },
    ],
  },
  coaching: {
    name: 'Coaching',
    members: [
      {
        id: 'coaching-head',
        name: 'Yasmeen Ashraf',
        position: 'Head of Coaching',
        image: '/membersImg/coaching/head.webp',
        bio: 'Providing mentorship and skill development programs.',
        linkedin: 'https://linkedin.com/in/yasmeentobar0/',
        email: 'yasmeen.ashraff0@gmail.com',
      },
      {
        id: 'coaching-vice',
        name: 'Abdulkader Tamer',
        position: 'Vice Head of Coaching',
        image: '/membersImg/coaching/vice.webp',
        bio: 'Supporting training workshops and career guidance.',
        linkedin: 'https://linkedin.com/in/',
        email: 'coaching-vice@ieee.edu',
      },
    ],
  },
  logistics: {
    name: 'Logistics',
    members: [
      {
        id: 'logistics-head',
        name: 'Mohamed Ebrahim',
        position: 'Head of Logistics',
        image: '/membersImg/logistics/head.webp',
        bio: 'Managing event operations and resource coordination.',
        linkedin: 'https://www.linkedin.com/in/mohamed-ibrahim-284a50358?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
        email: 'mohamed2.6ibrahim.5@gmail.com',
      },
      {
        id: 'logistics-vice',
        name: 'Khaled Elsayed',
        position: 'Vice Head of Logistics',
        image: '/membersImg/logistics/vice.webp',
        bio: 'Supporting venue coordination and equipment handling.',
        linkedin: 'https://linkedin.com/in/',
        email: 'logistics-vice@ieee.edu',
      },
    ],
  },
};

// Committee data for Committees page
export const COMMITTEES = [

  {
    id: 1,
    name: 'Marketing Committee',
    image: '/committeesImg/Marketing.webp',
    icon: 'Megaphone',
    color: 'from-purple-500 to-pink-500',
    shadowColor: 'shadow-purple-500/30',
    description: 'The Marketing Committee is responsible for promoting IEEE events, activities, and initiatives. They create compelling content, manage social media presence, and develop strategies to increase branch visibility and member engagement.',
    responsibilities: ['Social media management', 'Event promotion', 'Brand development', 'Content creation'],
  },
  {
    id: 2,
    name: 'Media Committee',
    image: '/committeesImg/Media.webp',
    icon: 'Camera',
    color: 'from-blue-500 to-cyan-500',
    shadowColor: 'shadow-blue-500/30',
    description: 'The Media Committee captures and preserves the memories of our branch through photography, videography, and graphic design. They document events, create visual content, and maintain our media archives.',
    responsibilities: ['Event photography', 'Video production', 'Graphic design', 'Media archiving'],
  },
  {
    id: 3,
    name: 'HR Committee',
    image: '/committeesImg/HR.webp',
    icon: 'Users',
    color: 'from-green-500 to-emerald-500',
    shadowColor: 'shadow-green-500/30',
    description: 'The Human Resources Committee manages member relations, recruitment, and internal communications. They ensure a positive experience for all members and foster a collaborative environment within the branch.',
    responsibilities: ['Member recruitment', 'Team building', 'Internal communications', 'Conflict resolution'],
  },
  {
    id: 4,
    name: 'PR Committee',
    image: '/committeesImg/PR.webp',
    icon: 'Target',
    color: 'from-orange-500 to-amber-500',
    shadowColor: 'shadow-orange-500/30',
    description: 'The Public Relations Committee builds and maintains relationships with external organizations, sponsors, and partners. They represent IEEE at external events and manage our public image.',
    responsibilities: ['External partnerships', 'Sponsor relations', 'Public representation', 'Networking events'],
  },
  {
    id: 5,
    name: 'Coaching Committee',
    image: '/committeesImg/Coaching.webp',
    icon: 'GraduationCap',
    color: 'from-yellow-500 to-orange-500',
    shadowColor: 'shadow-yellow-500/30',
    description: 'The Coaching Committee provides mentorship and skill development programs to help members grow professionally and personally.',
    responsibilities: ['Mentorship programs', 'Skill development', 'Training workshops', 'Career guidance'],
  },
  {
    id: 6,
    name: 'Logistics Committee',
    image: '/committeesImg/Logistics.webp',
    icon: 'Truck',
    color: 'from-indigo-500 to-violet-500',
    shadowColor: 'shadow-indigo-500/30',
    description: 'The Logistics Committee handles the operational aspects of events and activities. They manage venue bookings, equipment, supplies, and ensure smooth execution of all branch operations.',
    responsibilities: ['Event logistics', 'Resource management', 'Venue coordination', 'Equipment handling'],
  },
];

/**
 * Member Benefits for Team Page
 */
export const MEMBER_BENEFITS = [
  {
    icon: Lightbulb,
    title: 'Innovation & Learning',
    description: 'Access to cutting-edge workshops, seminars, and hands-on projects that keep you at the forefront of technology.',
  },
  {
    icon: Users,
    title: 'Networking Opportunities',
    description: 'Connect with industry professionals, alumni, and fellow students who share your passion for technology.',
  },
  {
    icon: Award,
    title: 'Professional Development',
    description: 'Build leadership skills, gain certifications, and enhance your resume with real-world experience.',
  },
  {
    icon: Target,
    title: 'Career Guidance',
    description: 'Get mentorship from experienced professionals and access exclusive internship and job opportunities.',
  },
  {
    icon: Heart,
    title: 'Community Impact',
    description: 'Participate in outreach programs and use technology to make a positive difference in your community.',
  },
  {
    icon: Zap,
    title: 'Exclusive Resources',
    description: 'Access IEEE digital library, technical publications, and member-only discounts on conferences and events.',
  },
];

/**
 * Projects data for Projects page
 * Showcase branch projects, achievements, and technical work
 */
export const PROJECTS = [
  {
    id: 1,
    title: 'Smart Agriculture Monitoring System',
    description: 'IoT-based system for monitoring soil moisture, temperature, and humidity to optimize crop yield. Features real-time data visualization and automated irrigation control.',
    status: 'Completed',
    year: '2023',
    technologies: ['Arduino', 'ESP32', 'MQTT', 'React', 'Node.js'],
    award: 'Best IoT Project Award',
    githubLink: 'https://github.com/ieee-mnu/smart-agri',
  },
  {
    id: 2,
    title: 'AI-Powered Chatbot for University Support',
    description: 'Intelligent chatbot using natural language processing to assist students with course information, registration, and campus navigation.',
    status: 'Completed',
    year: '2023',
    technologies: ['Python', 'TensorFlow', 'NLP', 'Flask', 'React'],
    award: 'Innovation Excellence Award',
    githubLink: 'https://github.com/ieee-mnu/ai-chatbot',
  },
  {
    id: 3,
    title: 'Electric Vehicle Charging Station Network',
    description: 'Design and implementation of a smart EV charging network with load balancing, payment integration, and energy monitoring capabilities.',
    status: 'In Progress',
    year: '2024',
    technologies: ['Embedded C', 'STM32', 'Power Electronics', 'Blockchain'],
    githubLink: 'https://github.com/ieee-mnu/ev-charging',
  },
  {
    id: 4,
    title: 'Medical Image Analysis Tool',
    description: 'Machine learning application for analyzing X-rays and MRI scans to assist in early disease detection using computer vision techniques.',
    status: 'Completed',
    year: '2023',
    technologies: ['Python', 'OpenCV', 'CNN', 'TensorFlow', 'Flask'],
    award: 'Healthcare Innovation Prize',
    githubLink: 'https://github.com/ieee-mnu/medical-ai',
  },
  {
    id: 5,
    title: 'Smart Campus Energy Management',
    description: 'Comprehensive system for monitoring and optimizing energy consumption across university buildings using IoT sensors and predictive analytics.',
    status: 'In Progress',
    year: '2024',
    technologies: ['Raspberry Pi', 'LoRa', 'Python', 'Machine Learning', 'Dashboard'],
    githubLink: 'https://github.com/ieee-mnu/smart-campus',
  },
  {
    id: 6,
    title: 'Robotic Arm for Industrial Automation',
    description: '6-DOF robotic arm designed for pick-and-place operations in manufacturing environments with computer vision guidance.',
    status: 'Completed',
    year: '2022',
    technologies: ['Arduino', 'Servo Motors', 'Computer Vision', 'Python'],
    award: 'Robotics Competition Winner',
    githubLink: 'https://github.com/ieee-mnu/robotic-arm',
  },
];

/**
 * Upcoming Events for Homepage
 * Event types: 'techtalk', 'workshop', 'competition'
 * Images are automatically loaded from corresponding folders
 */
export const UPCOMING_EVENTS = [
  {
    id: 1,
    title: 'AI And Entrepreurship',
    date: '2025-10-06',
    time: '10:30 AM',
    location: 'Engineering Sector 1 ,B211',
    description: 'We are pleased to announce an upcoming Scientific Day, organized in collaboration with Creativa and ITC, featuring insightful workshops:AI & Entrepreneurship by Mohamed El Mensan',
    type: 'techtalk',
    category: 'Tech Talk',
    imageName: '1.webp', // Loaded from /techtalkImg/1.webp
    facebook: 'https://www.facebook.com/photo/?fbid=735350422887139&set=pcb.735353602886821',
    instagram: 'https://www.instagram.com/p/DPZjBrHAizw/?img_index=1',

  },
  {
    id: 2,
    title: 'Arduino',
    date: '2025-11-28',
    time: null,
    location: null,
    description: 'Over more than 3 years in the field of robotics and mechatronics:- Trained more than 1,000 students in practical and theoretical form.- worked on outstanding projects in: Embedded Systems – Hardware – IoT – Control – CAD – Robotics👨‍🏫 Eng. Mohamed Ammar ',
    type: 'workshop',
    category: 'Workshop',
    imageName: '1.webp', // Loaded from /workshopImg/1.webp
    facebook: 'https://www.facebook.com/photo/?fbid=781800271575487&set=pcb.781800294908818',
    instagram: 'https://www.instagram.com/p/DRmwCCigjX6/?img_index=1',
  },
  {
    id: 4,
    title: 'Mechanical Design',
    date: '2025-11-28',
    time: '',
    location: '',
    description: 'Our brilliant instructor "Aliaa Shetiwy" is a Mechatronics student in level 200. Her work covers modeling and simulation on SolidWorks, CATIA and ANSYS. She guides participants through practical steps in mechanical design. Her sessions will build clear workflows that move ideas into functional models. The goal is to give you skills you use directly in projects and competitions.',
    type: 'workshop',
    category: 'Workshop',
    imageName: '2.webp', // Loaded from /workshopImg/2.webp
    facebook: 'https://www.facebook.com/photo/?fbid=781745314914316&set=a.110937605328427',
    instagram: 'https://www.instagram.com/p/DRml5WNgkh-/',
  },
  {
    id: 3,
    title: 'Line Follower Competition',
    date: '2025-12-21',
    time: null,
    location: null,
    description: 'Through our two competitions, Obstacle Avoider and Line Follower, we congratulate our amazing winners 🌟',
    type: 'competition',
    category: 'Competition',
    imageName: '1.webp', // Loaded from /competitionImg/1.webp
    facebook: 'https://www.facebook.com/photo?fbid=839053288928422&set=pcb.839053715595046',
    instagram: 'https://www.instagram.com/p/DSiYQB2Ar1A/?img_index=1',
  },
  {
    id: 5,
    title: 'Time Management',
    date: '2025-10-06',
    time: '12:30 PM',
    location: 'Engineering Sector 1 ,B211',
    description: 'We are pleased to announce an upcoming Scientific Day, organized in collaboration with Creativa and ITC, featuring insightful workshops:AI & Entrepreneurship by Dr. Hossam El Helaly',
    type: 'techtalk',
    category: 'Tech Talk',
    imageName: '2.webp', // Loaded from /techtalkImg/2.webp
    facebook: 'https://www.facebook.com/photo?fbid=735350429553805&set=pcb.735353602886821',
    instagram: 'https://www.instagram.com/p/DPZjBrHAizw/?img_index=2',
  },
  {
    id: 6,
    title: 'Intro To Web Development',
    date: '2025-04-14',
    time: null,
    location: null,
    description: 'IEEE MNU SB WORKSHOPS! 🤩 Curious about the world of web development and its core stages? Learn the essentials of: HTML | CSS | Bootstrap,This is your chance to gain valuable new skills and kickstart your web development journey!Join our exciting bootcamp starting April 20th, held offline in Building B. Interested? Fill out the application form and be part of the experience!',
    type: 'workshop',
    category: 'Workshop',
    imageName: '3.webp', // Loaded from /workshopImg/3.webp
    facebook: 'https://www.facebook.com/photo.php?fbid=597587496663433&set=pb.100092365631665.-2207520000&type=3',
    instagram: 'https://www.instagram.com/p/DIb0G-Jtkg4/',
  },
  // ... (other events)
  {
    id: 7,
    title: 'Smart Technology Challenge',
    date: '2025-09-11',
    time: null,
    location: null,
    description: 'Join us for the 4th edition of the Smart Technology Challenge, one of Delta Egypt’s biggest robotics and AI competitions, and be a part of the innovative journey!',
    type: 'competition',
    category: 'Competition',
    imageName: '2.webp', // Loaded from /competitionImg/2.webp
    facebook: 'https://www.facebook.com/photo.php?fbid=728228066932708&set=pb.100092365631665.-2207520000&type=3',
    instagram: 'https://www.instagram.com/p/DOeRqg9jtkG/?img_index=1',
  },
  {
    id: 8,
    title: 'Techne Summit',
    date: '2025-10-08',
    time: null,
    location: null,
    description: 'Spotting our participation in Techne Summit !! 💙 Hope you enjoyed with us!!',
    type: 'event',
    category: 'Event',
    imageName: '5.webp', // Loaded from /eventImg/5.webp
    facebook: 'https://www.facebook.com/photo.php?fbid=738854502536731&set=pb.100092365631665.-2207520000&type=3',
    instagram: 'https://www.instagram.com/p/DPjbZFQgtB_/?img_index=1',
  },
  {
    id: 9,
    title: '57357 Day',
    date: '2025-11-02',
    time: null,
    location: null,
    description: 'An unforgettable day! We spent a heartwarming time at 57357 with our little superheroes💙',
    type: 'event',
    category: 'Event',
    imageName: '1.webp', // Loaded from /eventImg/1.webp
    facebook: 'https://www.facebook.com/photo/?fbid=803076752526076&set=pcb.803077282526023',
    instagram: 'https://www.instagram.com/p/DQkRmRvAsQz/?img_index=1',
  },
  {
    id: 10,
    title: 'IEEE Day 2025',
    date: '2025-11-01',
    time: null,
    location: null,
    description: 'EEE MNU participating in IEEE Day 2025✨ Such a memorable gathering. it’s truly inspiring to have all the IEEE branches from across Egypt come together at one university.',
    type: 'event',
    category: 'Event',
    imageName: '2.webp', // Loaded from /eventImg/2.webp
    facebook: 'https://www.facebook.com/photo/?fbid=731527939936054&set=pcb.731528036602711',
    instagram: 'https://www.instagram.com/p/DPOm3V1AnwB/',
  },
  {
    id: 11,
    title: 'PES DAY',
    date: '2024-03-06',
    location: null,
    description: 'Random shots from the fruitful day PES-Delta 2024 ✨',
    type: 'event',
    category: 'Event',
    imageName: '3.webp', // Loaded from /eventImg/3.webp
    facebook: 'https://www.facebook.com/photo/?fbid=353884874367031&set=pcb.353886031033582',
    instagram: 'https://www.instagram.com/p/C6oJiZDNtD2/?img_index=1',
  },
  {
    id: 12,
    title: 'MIE Competition',
    date: '2025-02-01',
    time: null,
    location: null,
    description: 'oin MIE competition ‘’ Made In Egypt ‘’and gain valuable benefits! ⭐ MIE competition allows you to register with your graduation project and get Technical sessions & mentorship to improve your projects.',
    type: 'competition',
    category: 'Competition',
    imageName: '3.webp', // Loaded from /competitionImg/3.webp
    facebook: '',
    instagram: 'https://www.instagram.com/p/DFiNHaLC8vp/',
  },
  {
    id: 13,
    title: 'Booth DAY',
    date: '2025-11-02',
    location: null,
    description: 'We were so happy to see you at our booth💙',
    type: 'event',
    category: 'Event',
    imageName: '6.webp', // Loaded from /eventImg/3.webp
    facebook: '',
    instagram: 'https://www.instagram.com/p/DQhQ4UDjXsv/?img_index=4',
  },
  {
    id: 14,
    title: 'Opening DAY',
    date: '2024-03-20',
    location: null,
    description: 'The End of IEEE MNU SB OPENING Coverage has arrived 🥰',
    type: 'event',
    category: 'Event',
    imageName: '7.webp', // Loaded from /eventImg/3.webp
    facebook: 'https://www.facebook.com/photo/?fbid=338975969191255&set=pcb.338976705857848',
    instagram: 'https://www.instagram.com/p/C4tS4ssrLDX/',
  },
  {
    id: 15,
    title: 'Matrix Summit',
    date: '2024-08-02',
    location: null,
    description: 'Spotting yesterday IEEE MNU SB’s participation in Matrix Summit powered by Google which was a technological event with such influencing speakers,hope you didn’t miss it 🤩',
    type: 'event',
    category: 'Event',
    imageName: '8.webp', // Loaded from /eventImg/3.webp
    facebook: 'https://www.facebook.com/photo.php?fbid=410140215408163&set=pb.100092365631665.-2207520000&type=3',
    instagram: 'https://www.instagram.com/p/C-IV_CBt-n2/?img_index=1',
  },
  {
    id: 16,
    title: 'IEEE DAY 2024',
    date: '2024-03-06',
    location: null,
    description: 'Happily participating in such a great gathering as IEEE DAY 2024 in its 15th anniversary of IEEE Day and the 140th anniversary of IEEE. Where IEEE volunteers connect, collaborate, and inspire one another in a vibrant atmosphere🎉',
    type: 'event',
    category: 'Event',
    imageName: '9.webp', // Loaded from /eventImg/3.webp
    facebook: 'https://www.facebook.com/IEEEMNU/posts/pfbid02q3etoEe7czEibLt6ytd6ixZsbAjZStKuXMjRQALhD7sAV1MctXQNXL2qjznNXic2l',
    instagram: 'https://www.instagram.com/p/DBG20FZPkGF/',
  },
  {
    id: 17,
    title: ' IEEE Egyptian Student Paper Contest 24',
    date: '2024-10-20',
    location: null,
    description: 'Spotting our participation in IEEE Egyptian Student Paper Contest 24! We are honored to mention that our counselor Assoc.Prof Ehab H. Abdelhay was one of the judges!🤩💙',
    type: 'event',
    category: 'Event',
    imageName: '10.webp', // Loaded from /eventImg/3.webp
    facebook: 'https://www.facebook.com/IEEEMNU/posts/pfbid0deH9SLWEgcVATnvEvfwjiVHUD5S2f98kuJa5gBCneHgynyQq5UEza7k39YyqGdA1l',
    instagram: 'https://www.instagram.com/p/DBUOq54ii-K/',
  },
  {
    id: 18,
    title: 'IEEE CS R8 SYP CONGRESS',
    date: '2024-03-06',
    location: null,
    description: 'Spotting our participation in IEEE CS R8 SYP CONGRESS 🤩',
    type: 'event',
    category: 'Event',
    imageName: '11.webp', // Loaded from /eventImg/3.webp
    facebook: 'https://www.facebook.com/IEEEMNU/posts/pfbid02yitpm8TbYbVBzDFVY7VNUKDZuQ5M68Q17sVzXEWiswpMKfmkDqej1Cphkxw6R2dpl',
    instagram: 'https://www.instagram.com/p/DDPcLI9iBmh/',
  },
  {
    id: 19,
    title: 'IEEE Interviews',
    date: '2024-12-20',
    location: null,
    description: 'A step closer to join us!🤩 Some shots form IEEE MNU Interviews✨',
    type: 'event',
    category: 'Event',
    imageName: '12.webp', // Loaded from /eventImg/3.webp
    facebook: 'https://www.facebook.com/photo/?fbid=511057161983134&set=pcb.511057178649799',
    instagram: 'https://www.instagram.com/p/DDxb6VHCSmY/',
  },
  {
    id: 20,
    title: 'EEE MNU SB and TechShift Summit 2025',
    date: '2024-03-06',
    location: null,
    description: 'As part of the community partnership between IEEE MNU SB and TechShift Summit 2025, IEEE MNU SB had an amazing experience at TechShift 2025! 🤩',
    type: 'event',
    category: 'Event',
    imageName: '13.webp', // Loaded from /eventImg/3.webp
    facebook: 'https://www.facebook.com/photo/?fbid=547782261643957&set=pcb.547782418310608',
    instagram: 'https://www.instagram.com/p/DF2zfOPikTm/',
  },
  {
    id: 21,
    title: 'First General Meeting',
    date: '2024-02-17',
    location: null,
    description: 'Kicking off our first general meeting with the new IEEE MNU members, where we introduced IEEE, shared our plans for the year, and honored our top contributors!🤩',
    type: 'event',
    category: 'Event',
    imageName: '14.webp', // Loaded from /eventImg/3.webp
    facebook: 'https://www.facebook.com/photo/?fbid=553656927723157&set=pcb.553657051056478',
    instagram: 'https://www.instagram.com/p/DGLZm-5CWQH/',
  },
  {
    id: 22,
    title: 'IEEE LUMINA',
    date: '2025-03-14',
    location: null,
    description: 'Presenting IEEE LUMINA! 🤩 Launching our Ramadan Series, offering a blend of technical and non-technical sessions with industry experts leading the way!',
    type: 'event',
    category: 'Event',
    imageName: '15.webp', // Loaded from /eventImg/3.webp
    facebook: 'https://www.facebook.com/photo/?fbid=572121349210048&set=a.110937605328427',
    instagram: 'https://www.instagram.com/p/DHJujx0CCOX/',
  },
  {
    id: 23,
    title: 'IEEE Regional Exemplary Student Branch',
    date: '2026-01-17',
    location: null,
    description: 'The #Mansoura_National_University proudly announces that the IEEE Mansoura National University Student Branch has won the 2025 IEEE Regional Exemplary Student Branch Award, presented by the Institute of Electrical and Electronics Engineers (IEEE), at the level of IEEE Region 8 (Europe, the Middle East, and Africa), which includes over 60 countries and approximately 785 student branches. This achievement reflects the excellence of both institutional and student performance in scientific and technical activities.',
    type: 'awards',
    category: 'Awards',
    imageName: '1.webp', // Loaded from /awardsImg/1.webp
    facebook: 'https://www.facebook.com/photo/?fbid=859870096846741&set=a.126514336848991',
    instagram: '',
  },
  {
    id: 24,
    title: 'IEEE MNU SB 25-26 Registration',
    date: '2026-02-17',
    location: null,
    description: 'Welcome to the IEEE MNU SB registration form for the 2025/2026 season! please answer all required questions in the following page before selecting your desired committee and moving on to it is page with committee-based questions',
    type: 'event',
    category: 'Event',
    imageName: '16.webp', // Loaded from /awardsImg/1.webp
    facebook: null,
    instagram: '',
    hasForm: false,
  },
  {
    id: 25,
    title: 'IEEE MNU PYB',
    date: '2026-02-14',
    location: null,
    description: 'IEEE MNU SB PYB Event featuring four insightful sessions: Career as a Product, Discussion Panel (Your Day Supercharged By AI), Functional and Stereotactic Neurosurgery intersection with software engineering and NeuroAI, and Bridging the gaps: Translating Surgical Insights into High-Impact Hardware.',
    type: 'event',
    category: 'Event',
    imageName: '17.webp',
    facebook: null,
    instagram: '',
    hasForm: false,
    formLink: 'https://tally.so/r/VL5agy',
    registrationStart: null,
    registrationEnd: null,
  },
  {
    id: 26,
    title: 'IEEE MNU SB at Egyptian Japanese School – Gamasa!',
    date: '2026-02-15',
    location: null,
    description: 'As part of Mansoura National University’s mission to raise digital awareness, a delegation from IEEE MNU SB visited the Egyptian Japanese School in Gamasa under the “Protect Yourself Digitally” campaign by the Ministry of Communications and Information Technology.',
    type: 'event',
    category: 'Event',
    imageName: '18.webp',
    facebook: 'https://www.facebook.com/photo?fbid=883728231127594',
    instagram: '',
    hasForm: false,
  },
  {
    id: 27,
    title: 'IEEE Entrepreneurship Week Egypt \"Elsewedy University of Technology\"',
    date: '2026-02-21',
    location: null,
    description: null,
    type: 'event',
    category: 'Event',
    imageName: '19.webp',
    facebook: 'https://www.facebook.com/photo?fbid=888717390628678',
    instagram: '',
    hasForm: false,
  },
  {
    id: 28,
    title: 'IEEE MNU PYB',
    date: '2026-02-23',
    location: null,
    description: 'IEEE MNU SB PYB Event featuring four insightful sessions: Career as a Product, Discussion Panel (Your Day Supercharged By AI), Functional and Stereotactic Neurosurgery intersection with software engineering and NeuroAI, and Bridging the gaps: Translating Surgical Insights into High-Impact Hardware.',
    type: 'event',
    category: 'Event',
    imageName: '20.webp',
    facebook: 'https://www.facebook.com/photo/?fbid=890388220461595',
    instagram: '',
    hasForm: false,
  },
  {
    id: 30,
    title: 'THE ENIGMA',
    date: '2026-05-06',
    time: null,
    location: 'Mansoura National University',
    description: 'THE ENIGMA — IEEE MNU Student Branch attendance registration. Fill out the form with your personal details, National ID, and university information to confirm your attendance.',
    type: 'events',
    category: 'Event',
    imageName: '22.webp',
    facebook: null,
    instagram: '',
    hasForm: true,
    formLink: 'https://tally.so/r/Np4VKO',
    registrationStart: null,
    registrationEnd: null,
  },
  {
    id: 33,
    title: 'IEEE PROPHET',
    date: '2026-04-20',
    time: null,
    location: 'Mansoura National University',
    description: 'As you all know, our arcade has been out of order… So we took it away to get it fixed, but the moment we lifted it… we found something we never expected to find—a letter!!! ✉️ Inside? A key 🔑 We looked ahead and found a hidden door behind the arcade 🚪 We had no idea where it led… ',
    type: 'events',
    category: 'Event',
    imageName: '23.webp',
    facebook: null,
    instagram: 'https://www.instagram.com/p/DXXS-nvgoI0/',
    hasEventPage: true,
    gallerySettings: {
      enableLightbox: true,
    },
    photos: [
      {
        id: 1,
        src: `/eventImg/25.webp`,
        alt: `IEEE MNU Prophet Event photo 25`
      },
      {
        id: 2,
        src: `/eventImg/23.webp`,
        alt: `IEEE MNU Prophet Event photo 23`
      },
    ]
  },
  {
    id: 32,
    title: 'THE ENIGMA',
    date: '2026-05-06',
    time: null,
    location: 'Mansoura National University',
    description: 'THE ENIGMA — IEEE MNU Student Branch attendance registration. Fill out the form with your personal details, National ID, and university information to confirm your attendance.',
    type: 'events',
    category: 'Event',
    imageName: '24.webp',
    facebook: null,
    instagram: '',
  },



];

// #region Board Members
/**
 * Old Board Members data for Board page
 * Contains former executive board, committee heads, and advisors
 */
export const OLD_BOARD_MEMBERS = {
  executive: {
    title: 'Old Executive Board',
    members: [
      {
        id: 'old-chairman',
        name: 'Mohamed Elalfy',
        role: 'Chairperson',
        committee: 'Executive Board',
        description: 'Former Chairperson of IEEE MNU Student Branch.',
        image: '/oldboardImg/chairman.webp',
        linkedin: 'https://linkedin.com/in/',
        email: 'chair@ieee.edu',
        tier: 1,
      },
      {
        id: 'old-vice-chairman',
        name: 'Eslam Abozaid',
        role: 'Vice Chairperson',
        committee: 'Executive Board',
        description: 'Former Vice Chairperson of IEEE MNU Student Branch.',
        image: '/oldboardImg/vicechairman.webp',
        linkedin: 'https://linkedin.com/in/',
        email: 'vice-chair@ieee.edu',
        tier: 2,
      },
      {
        id: 'old-secretary',
        name: 'Shahd wael',
        role: 'Secretary',
        committee: 'Executive Board',
        description: 'Former Secretary of IEEE MNU Student Branch.',
        image: '/oldboardImg/secretary.webp',
        linkedin: 'https://linkedin.com/in/',
        email: 'secretary@ieee.edu',
        tier: 2,
      },
      {
        id: 'old-webmaster',
        name: 'Ahmed Hisham',
        role: 'Webmaster',
        committee: 'Executive Board',
        description: 'Former Webmaster.',
        image: '/oldboardImg/webmaster.webp',
        linkedin: 'https://linkedin.com/in/',
        email: 'webmaster@ieee.edu',
        tier: 2,
      },
      {
        id: 'old-treasurer',
        name: 'Noureldin Ahmed',
        role: 'Treasurer',
        committee: 'Executive Board',
        description: 'Former Treasurer of IEEE MNU Student Branch.',
        image: '/oldboardImg/treasurer.webp',
        linkedin: 'https://linkedin.com/in/',
        email: 'treasurer@ieee.edu',
        tier: 2,
      },
    ],
  },
  heads: {
    title: 'Old Committee Heads',
    members: [
      {
        id: 'old-marketing-head',
        name: 'Nouran Wael',
        role: 'Head of Marketing',
        committee: 'Marketing',
        description: 'Former Head of Marketing.',
        image: '/oldboardImg/marketing.webp',
        linkedin: 'https://linkedin.com/in/',
        email: 'marketing@ieee.edu',
        tier: 3,
      },
      {
        id: 'old-pr-head',
        name: 'Youssef Mahmoud',
        role: 'Head of PR',
        committee: 'Public Relations',
        description: 'Former Head of Public Relations.',
        image: '/oldboardImg/pr.webp',
        linkedin: 'https://linkedin.com/in/',
        email: 'pr@ieee.edu',
        tier: 3,
      },
      {
        id: 'old-fr-head',
        name: 'Akram Mohammad',
        role: 'Head of FR',
        committee: 'Fundraising',
        description: 'Former Head of Fundraising.',
        image: '/oldboardImg/fr.webp',
        linkedin: 'https://linkedin.com/in/',
        email: 'fr@ieee.edu',
        tier: 3,
      },
      {
        id: 'old-hr-head',
        name: 'Ahmed Aboelyazed',
        role: 'Head of HR',
        committee: 'Human Resources',
        description: 'Former Head of Human Resources.',
        image: '/oldboardImg/hr.webp',
        linkedin: 'https://linkedin.com/in/',
        email: 'hr@ieee.edu',
        tier: 3,
      },
      {
        id: 'old-media-head',
        name: 'Jana Elessili',
        role: 'Head of Media',
        committee: 'Media',
        description: 'Former Head of Media.',
        image: '/oldboardImg/media.webp',
        linkedin: 'https://linkedin.com/in/',
        email: 'media@ieee.edu',
        tier: 3,
      },
      {
        id: 'old-logistics-head',
        name: 'Adham Haikall',
        role: 'Head of Logistics',
        committee: 'Logistics',
        description: '',
        image: '/oldboardImg/logistics.webp',
        linkedin: 'https://linkedin.com/in/',
        email: 'media@ieee.edu',
        tier: 3,
      },
      {
        id: 'old-coaching-head',
        name: 'Youssef Sabry',
        role: 'Head of Coaching',
        committee: 'Coaching',
        description: '',
        image: '/oldboardImg/coaching.webp',
        linkedin: 'https://linkedin.com/in/',
        email: 'media@ieee.edu',
        tier: 3,
      },
    ],
  },
  vices: {
    title: 'Old Vice Heads',
    members: [],
  },
  universityHead: {
    title: 'University Leadership',
    members: [
      {
        id: 'old-university-head',
        name: 'Prof. Sherif Khater',
        role: 'University President',
        committee: 'University Leadership',
        description: 'Leading Mansoura National University.',
        image: '/oldboardImg/university head.webp',
        linkedin: 'https://linkedin.com/in/',
        email: 'president@mnu.edu.eg',
        tier: 0,
      },
    ],
  },
  advisors: {
    title: 'Advisors',
    members: [
      {
        id: 'old-counselor',
        name: 'Assoc Prof.Ehab Abdelhay',
        role: 'Branch Counselor',
        committee: 'Advisory',
        description: 'Guiding and mentoring the IEEE student branch.',
        image: '/membersImg/advisors/counselor.webp',
        linkedin: 'https://linkedin.com/in/',
        email: 'counselor@ieee.edu',
        tier: 1,
      },
      {
        id: 'old-mentor',
        name: 'Eng. Omnia Badran',
        role: 'Mentor',
        committee: 'Advisory',
        description: 'Supporting and advising branch activities.',
        image: '/oldboardImg/mentor.webp',
        linkedin: 'https://linkedin.com/in/',
        email: 'mentor@ieee.edu',
        tier: 2,
      },
    ],
  },
};

/**
 * Current Board Members data for Board page
 * Contains current executive board, committee heads, vice heads, and advisors
 */
export const BOARD_MEMBERS = {
  executive: {
    title: 'Executive Board',
    members: [
      {
        id: 'chairman',
        name: 'Mohamed Elgazar',
        role: 'Chairperson',
        committee: 'Executive Board',
        description: 'Leading the IEEE student branch with passion for technology and innovation.',
        image: '/membersImg/chairman/head.webp',
        linkedin: 'https://www.linkedin.com/in/mohamed-elgazar-344557298',
        email: 'mohamed_elgazar@ieee.org',
        tier: 1,
      },
      {
        id: 'vice-chairman',
        name: 'Abdelrahman Elnajar',
        role: 'Vice Chairperson',
        committee: 'Executive Board',
        description: 'Supporting branch activities and coordinating technical workshops.',
        image: '/membersImg/chairman/vice.webp',
        linkedin: 'https://www.linkedin.com/in/abdelrhman-elnajar',
        email: 'abdoelnajar0@gmail.com',
        tier: 2,
      },
      {
        id: 'secretary',
        name: 'Retaj Alzamel',
        role: 'Secretary',
        committee: 'Executive Board',
        description: 'Managing communications and documentation for the branch.',
        image: '/membersImg/secretary.webp',
        linkedin: 'https://www.linkedin.com/in/retaj-alzamel-ba0046294',
        email: '77alzamel@gmail.com',
        tier: 2,
      },
      {
        id: 'treasurer',
        name: 'Amr Ashraf',
        role: 'Treasurer',
        committee: 'Executive Board',
        description: 'Handling financial operations and budget management.',
        image: '/membersImg/treasurer.webp',
        linkedin: 'https://www.linkedin.com/in/amr-ashraf-69b729269',
        email: 'a.abdelwahab0506@gmail.com',
        tier: 2,
      },
      {
        id: 'webmaster',
        name: 'Omar Rafeek',
        role: 'Webmaster',
        committee: 'Executive Board',
        description: 'Web',
        image: '/membersImg/web.webp',
        linkedin: 'https://linkedin.com/in/',
        email: 'webmaster@ieee.edu',
        tier: 2,
      },
      {
        id: 'webmasterold',
        name: 'Zeinb Hassan',
        role: 'Previous-Webmaster',
        committee: 'Executive Board',
        description: 'Web',
        image: '/membersImg/webold.webp',
        linkedin: 'https://linkedin.com/in/',
        email: 'webmaster@ieee.edu',
        tier: 2,
      },
    ],
  },
  heads: {
    title: 'Committee Heads',
    members: [
      {
        id: 'marketing-head',
        name: 'Youmna Abdulaziz',
        role: 'Head of Marketing',
        committee: 'Marketing',
        description: 'Leading marketing strategies and brand development.',
        image: '/membersImg/marketing/head.webp',
        linkedin: 'https://www.linkedin.com/in/youmna-abdulaziz-9a0405299?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
        email: 'youmna294@gmail.com',
        tier: 3,
      },
      {
        id: 'media-head',
        name: 'Ali Mohamed',
        role: 'Head of Media',
        committee: 'Media',
        description: 'Leading media production and visual content creation.',
        image: '/membersImg/media/head.webp',
        linkedin: 'https://www.linkedin.com/in/ali-alzanfaly-059a3438a',
        email: 'alialzanfaly@gmail.com',
        tier: 3,
      },
      {
        id: 'hr-head',
        name: 'Noor Eldeen Ahmed',
        role: 'Head of HR',
        committee: 'Human Resources',
        description: 'Managing member relations and team development.',
        image: '/membersImg/hr/head.webp',
        linkedin: 'https://www.linkedin.com/in/noor-ahmed-37977b366',
        email: 'nooraldeenahmed04@gmail.com',
        tier: 3,
      },
      {
        id: 'pr-head',
        name: 'Ahmed Elsaby',
        role: 'Head of PR & FR',
        committee: 'Public Relations & Fundraising',
        description: 'Building partnerships and managing external relations.',
        image: '/membersImg/pr/head.webp',
        linkedin: 'https://www.linkedin.com/in/ahmed-elsabi-73a83729b',
        email: 'Amedalsaby@gmail.com',
        tier: 3,
      },
      {
        id: 'coaching-head',
        name: 'Yasmeen Ashraf',
        role: 'Head of Coaching',
        committee: 'Coaching',
        description: 'Providing mentorship and skill development programs.',
        image: '/membersImg/coaching/head.webp',
        linkedin: 'https://www.linkedin.com/in/yasmeentobar0/',
        email: 'yasmeen.ashraff0@gmail.com',
        tier: 3,
      },
      {
        id: 'logistics-head',
        name: 'Mohamed Ebrahim',
        role: 'Head of Logistics',
        committee: 'Logistics',
        description: 'Managing event operations and resource coordination.',
        image: '/membersImg/logistics/head.webp',
        linkedin: 'https://www.linkedin.com/in/mohamed-ibrahim-284a50358',
        email: 'mohamed2.6ibrahim.5@gmail.com',
        tier: 3,
      },
    ],
  },
  vices: {
    title: 'Vice Heads',
    members: [
      {
        id: 'pr-vice',
        name: 'Maya Hossam',
        role: 'Vice Head of PR & FR',
        committee: 'Public Relations',
        description: 'Supporting sponsor relations and networking events.',
        image: '/membersImg/pr/vice.webp',
        linkedin: 'https://www.linkedin.com/in/maya-hossam-628950392',
        email: 'mayahossamm3052006@gmail.com',
        tier: 4,
      },
      {
        id: 'marketing-vice',
        name: 'Fatma Ahmed',
        role: 'Vice Head of Marketing',
        committee: 'Marketing',
        description: 'Supporting marketing initiatives and content creation.',
        image: '/membersImg/marketing/vice.webp',
        linkedin: 'https://linkedin.com/in/',
        email: 'fatimaaflatoun2006@gmail.com',
        tier: 4,
      },
      {
        id: 'media-vice-graphic',
        name: 'Ahmed Tarek',
        role: 'Vice Head - Graphic Design',
        committee: 'Media',
        description: 'Creating stunning visual designs and graphics.',
        image: '/membersImg/media/vice-graphic.webp',
        linkedin: 'https://eg.linkedin.com/in/ahmed-tarek-050813249',
        email: 'osmannahmed48@gmail.com',
        tier: 4,
      },
      {
        id: 'media-vice-photography',
        name: 'Omar Kamel',
        role: 'Vice Head - Photography',
        committee: 'Media',
        description: 'Capturing memorable moments at IEEE events.',
        image: '/membersImg/media/vice-photography.webp',
        linkedin: 'https://www.linkedin.com/in/omar-taha-3bb11a291',
        email: 'Omarkamel1611@gmail.com',
        tier: 4,
      },
      {
        id: 'media-vice-video',
        name: 'Omar Rafeek',
        role: 'Vice Head - Video Production',
        committee: 'Media',
        description: 'Producing engaging video content for IEEE.',
        image: '/membersImg/media/vice-video.webp',
        linkedin: 'https://linkedin.com/in/',
        email: 'video@ieee.edu',
        tier: 4,
      },
      {
        id: 'hr-vice',
        name: 'Abdulrahman Shafiq',
        role: 'Vice Head of HR',
        committee: 'Human Resources',
        description: 'Supporting recruitment and member engagement.',
        image: '/membersImg/hr/vice.webp',
        linkedin: 'https://www.linkedin.com/in/abdulrahman-shafiq-851141358',
        email: 'abdoshafiq6@gmail.com',
        tier: 4,
      },
      {
        id: 'coaching-vice',
        name: 'Abdulkader Tamer',
        role: 'Vice Head of Coaching',
        committee: 'Coaching',
        description: 'Supporting training workshops and career guidance.',
        image: '/membersImg/coaching/vice.webp',
        linkedin: 'https://www.linkedin.com/in/abdulkader-tamer-b65193294',
        email: 'abdotamer8900@gmail.com',
        tier: 4,
      },
      {
        id: 'logistics-vice',
        name: 'Khaled Elsayed',
        role: 'Vice Head of Logistics',
        committee: 'Logistics',
        description: 'Supporting venue coordination and equipment handling.',
        image: '/membersImg/logistics/vice.webp',
        linkedin: 'https://www.linkedin.com/in/khaled-hafez-b0785838a',
        email: 'khaledhafez@icloud.com',
        tier: 4,
      },
    ],
  },
  universityHead: {
    title: 'University Leadership',
    members: [
      {
        id: 'university-head',
        name: 'Prof.Dr\nMohammed Abdelazim',
        role: 'University President',
        committee: 'University Leadership',
        description: 'Leading Mansoura National University.',
        image: '/membersImg/university head.webp',
        linkedin: 'https://linkedin.com/in/',
        email: 'president@mnu.edu.eg',
        tier: 0,
      },
    ],
  },
  advisors: {
    title: 'Advisors',
    members: [
      {
        id: 'counselor',
        name: 'Assoc Prof.Ehab Abdelhay',
        role: 'Branch Counselor',
        committee: 'Advisory',
        description: 'Guiding and mentoring the IEEE student branch.',
        image: '/membersImg/advisors/counselor.webp',
        linkedin: 'https://linkedin.com/in/',
        email: 'counselor@ieee.edu',
        tier: 1,
      },
      {
        id: 'academic_advisor',
        name: 'Eng. Alaa Taha',
        role: 'Academic Advisor',
        committee: 'Advisory',
        description: 'Supporting and advising branch activities.',
        image: '/membersImg/advisors/aa.webp',
        linkedin: 'https://linkedin.com/in/',
        email: 'mentor@ieee.edu',
        tier: 2,
      },
      {
        id: 'mentor',
        name: 'Mohamed Elalfy',
        role: 'Mentor',
        committee: 'Advisory',
        description: 'Supporting and advising branch activities.',
        image: '/membersImg/advisors/mentor.webp',
        linkedin: 'https://linkedin.com/in/',
        email: 'mentor@ieee.edu',
        tier: 2,
      },
    ],
  },
};

/**
 * Floating Members data for Board page hero section
 * Contains images for current board advisors and leadership
 */
export const FLOATING_MEMBERS = [
  // Left side - Current Advisors
  { id: 'float-1', image: '/membersImg/advisors/counselor.webp', side: 'left', top: '15%', size: 'lg', delay: 0 },
  { id: 'float-2', image: '/membersImg/advisors/aa.webp', side: 'left', top: '40%', size: 'md', delay: 0.5 },
  { id: 'float-3', image: '/membersImg/advisors/mentor.webp', side: 'left', top: '65%', size: 'lg', delay: 1 },
  // Right side - Current University Leadership
  { id: 'float-4', image: '/oldboardImg/university head.webp', side: 'right', top: '20%', size: 'lg', delay: 0.3 },
  { id: 'float-5', image: '/membersImg/chairman/head.webp', side: 'right', top: '50%', size: 'md', delay: 0.8 },
  { id: 'float-6', image: '/membersImg/chairman/vice.webp', side: 'right', top: '75%', size: 'md', delay: 1.2 },
];

/**
 * Old Floating Members data for Board page hero section
 * Contains images for former board leadership and advisors
 */
export const OLD_FLOATING_MEMBERS = [
  // Left side - Former Advisors & University Leadership
  { id: 'old-float-1', image: '/oldboardImg/university head.webp', side: 'left', top: '15%', size: 'lg', delay: 0 },
  { id: 'old-float-2', image: '/membersImg/advisors/counselor.webp', side: 'left', top: '40%', size: 'md', delay: 0.5 },
  { id: 'old-float-3', image: '/oldboardImg/mentor.webp', side: 'left', top: '65%', size: 'lg', delay: 1 },
  // Right side - Former Executive Leadership
  { id: 'old-float-4', image: '/oldboardImg/chairman.webp', side: 'right', top: '20%', size: 'lg', delay: 0.3 },
  { id: 'old-float-5', image: '/oldboardImg/vicechairman.webp', side: 'right', top: '50%', size: 'md', delay: 0.8 },
  { id: 'old-float-6', image: '/oldboardImg/secretary.webp', side: 'right', top: '75%', size: 'md', delay: 1.2 },
];

// #endregion

// #region Event Images

export const EVENT_GALLERY_IMAGES = [
  { src: '/heroBgImg/1.webp', alt: 'IEEE Event 1' },
  { src: '/heroBgImg/2.webp', alt: 'IEEE Event 2' },
  { src: '/heroBgImg/3.webp', alt: 'IEEE Event 3' },
  { src: '/heroBgImg/4.webp', alt: 'IEEE Event 4' },
  { src: '/heroBgImg/5.webp', alt: 'IEEE Event 5' },
];

export const PARTNERSHIP_IMAGES = Array.from({ length: 49 }, (_, i) => ({
  src: `/partenershipImg/(${i + 1}).webp`,
  alt: `Partnership ${i + 1}`
}));

// #endregion
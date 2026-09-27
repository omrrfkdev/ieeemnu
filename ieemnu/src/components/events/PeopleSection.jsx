import { motion } from 'framer-motion';
import InstructorCard from './InstructorCard';

const PeopleSection = ({ people, type }) => {
  const sectionConfig = {
    speakers: {
      title: "Meet the Speakers",
      description: "Hear from industry experts and thought leaders who share their insights and experiences."
    },
    guests: {
      title: "Our Guests",
      description: "We're honored to welcome these distinguished guests to our event."
    },
    instructors: {
      title: "Meet the Instructors",
      description: "Learn from industry experts and thought leaders who bring years of experience and knowledge to share with you."
    },
    vipGuests: {
      title: "VIP Guests",
      description: "We're privileged to have these special guests join us for this event."
    },
    hosts: {
      title: "Event Hosts",
      description: "Meet the hosts who will guide you through this exciting event."
    }
  };

  const config = sectionConfig[type] || sectionConfig.instructors;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  if (!people || people.length === 0) {
    return null;
  }

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="py-12 md:py-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={titleVariants}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {config.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            {config.description}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {people.map((person, index) => (
            <InstructorCard
              key={person.id}
              instructor={person}
              animation={person.animation}
              delay={person.animation?.delay || index * 0.2}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default PeopleSection;

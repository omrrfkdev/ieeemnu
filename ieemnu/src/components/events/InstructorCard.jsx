import { motion } from 'framer-motion';
import { Linkedin, Twitter, Globe } from 'lucide-react';

const InstructorCard = ({ instructor, animation, delay = 0 }) => {
  const animationVariants = {
    'slide-left': {
      hidden: { x: -100, opacity: 0 },
      visible: { 
        x: 0, 
        opacity: 1, 
        transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }
      }
    },
    'slide-right': {
      hidden: { x: 100, opacity: 0 },
      visible: { 
        x: 0, 
        opacity: 1, 
        transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }
      }
    },
    'fade-up': {
      hidden: { y: 50, opacity: 0 },
      visible: { 
        y: 0, 
        opacity: 1, 
        transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }
      }
    },
    'scale-in': {
      hidden: { scale: 0.8, opacity: 0 },
      visible: { 
        scale: 1, 
        opacity: 1, 
        transition: { duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }
      }
    },
    'spotlight': {
      hidden: { scale: 0, opacity: 0 },
      visible: { 
        scale: 1, 
        opacity: 1, 
        transition: { 
          duration: 0.8, 
          delay,
          type: "spring",
          stiffness: 100,
          damping: 15
        }
      }
    }
  };

  const SocialLink = ({ platform, href, icon: Icon }) => (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 hover:bg-ieee-blue hover:text-white dark:hover:bg-ieee-blue transition-colors"
    >
      <Icon className="w-5 h-5" />
    </motion.a>
  );

  return (
    <motion.div
      variants={animationVariants[animation?.type || 'fade-up']}
      initial="hidden"
      animate="visible"
      className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex flex-col items-center text-center">
        <motion.div
          className="relative mb-4"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-ieee-blue dark:border-ieee-blue-light shadow-lg">
            <motion.img
              src={instructor.photo}
              alt={instructor.name}
              className="w-full h-full object-cover"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <motion.div
            className="absolute inset-0 rounded-full ring-4 ring-ieee-blue/30 dark:ring-ieee-blue-light/30 opacity-0 group-hover:opacity-100 transition-opacity"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.2, duration: 0.5 }}
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            {instructor.name}
          </h3>
          <p className="text-ieee-blue dark:text-ieee-blue-light font-semibold mb-1">
            {instructor.title}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
            {instructor.company}
          </p>
        </motion.div>

        <motion.p
          className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.4, duration: 0.5 }}
        >
          {instructor.bio}
        </motion.p>

        {instructor.socialLinks && (
          <motion.div
            className="flex gap-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.6, duration: 0.3 }}
          >
            {instructor.socialLinks.linkedin && (
              <SocialLink 
                platform="linkedin" 
                href={instructor.socialLinks.linkedin} 
                icon={Linkedin} 
              />
            )}
            {instructor.socialLinks.twitter && (
              <SocialLink 
                platform="twitter" 
                href={instructor.socialLinks.twitter} 
                icon={Twitter} 
              />
            )}
            {instructor.socialLinks.website && (
              <SocialLink 
                platform="website" 
                href={instructor.socialLinks.website} 
                icon={Globe} 
              />
            )}
            {instructor.socialLinks.github && (
              <SocialLink 
                platform="github" 
                href={instructor.socialLinks.github} 
                icon={Globe} 
              />
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default InstructorCard;

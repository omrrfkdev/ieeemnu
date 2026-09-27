import { motion } from 'framer-motion';
import { useState } from 'react';

const PhotoCard = ({ photo, onClick, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8 }}
      onClick={() => onClick(photo)}
      className="relative group cursor-pointer overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-700 shadow-md hover:shadow-2xl transition-all duration-300"
    >
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 animate-pulse" />
      )}
      
      <motion.img
        src={photo.src}
        alt={photo.caption}
        className="w-full h-full object-cover transition-transform duration-700"
        initial={{ scale: 1.1 }}
        whileHover={{ scale: 1.15 }}
        onLoad={() => setImageLoaded(true)}
        style={{ opacity: imageLoaded ? 1 : 0 }}
      />

      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <motion.p
            className="text-white text-sm font-medium"
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {photo.caption}
          </motion.p>
          {photo.category && (
            <motion.span
              className="inline-block mt-2 px-3 py-1 bg-ieee-blue/90 text-white text-xs rounded-full"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              {photo.category}
            </motion.span>
          )}
        </div>
      </motion.div>

      <motion.div
        className="absolute top-3 right-3 bg-white/90 dark:bg-gray-800/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        initial={{ scale: 0 }}
        whileHover={{ scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default PhotoCard;

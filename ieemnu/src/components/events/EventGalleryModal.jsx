import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Clock, Users } from 'lucide-react';
import { useState } from 'react';
import PhotoLightbox from './PhotoLightbox';

const EventGalleryModal = ({ event, isOpen, onClose }) => {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  if (!event) return null;

  const handlePhotoClick = (photo, index) => {
    if (event.gallerySettings?.enableLightbox) {
      setLightboxIndex(index);
    } else {
      setSelectedPhoto(photo);
    }
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-4 md:inset-8 lg:inset-12 z-50 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="sticky top-0 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {event.title}
                  </h2>
                  <p className="text-ieee-blue dark:text-ieee-blue-light font-medium mt-1">
                    {event.category}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </motion.button>
              </div>

              <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="p-6 md:p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
                >
                  <img
                    src={`/images/eventImg/${event.imageName}`}
                    alt={event.title}
                    className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-8"
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    About the Event
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {event.description}
                  </p>
                </motion.div>

                {event.highlights && event.highlights.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-8"
                  >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      Event Highlights
                    </h3>
                    <ul className="space-y-2">
                      {event.highlights.map((highlight, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                        >
                          <div className="w-2 h-2 mt-2 bg-ieee-blue dark:bg-ieee-blue-light rounded-full flex-shrink-0" />
                          <span>{highlight}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {event.schedule && event.schedule.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mb-8"
                  >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      Schedule
                    </h3>
                    <div className="space-y-3">
                      {event.schedule.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                          className="flex gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                          <span className="font-semibold text-ieee-blue dark:text-ieee-blue-light flex-shrink-0">
                            {item.time}
                          </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {item.title}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {event.photos && event.photos.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      Photo Gallery ({event.photos.length})
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {event.photos.map((photo, index) => (
                        <motion.div
                          key={photo.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.9 + index * 0.05 }}
                          onClick={() => handlePhotoClick(photo, index)}
                          className="relative group cursor-pointer overflow-hidden rounded-xl aspect-square"
                        >
                          <img
                            src={photo.thumbnail || photo.src}
                            alt={photo.caption}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-3">
                              <p className="text-white text-sm font-medium line-clamp-2">
                                {photo.caption}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          <AnimatePresence>
            {lightboxIndex !== null && event.gallerySettings?.enableLightbox && (
              <PhotoLightbox
                photos={event.photos}
                initialIndex={lightboxIndex}
                onClose={closeLightbox}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
};

export default EventGalleryModal;

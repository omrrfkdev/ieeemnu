import { useEffect } from 'react';
import { Mail, Linkedin, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFocusTrap } from '../../hooks/useFocusTrap';

const MemberContactModal = ({ member, isOpen, onClose }) => {
  const panelRef = useFocusTrap(isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && member && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
        >
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-ieee-blue"
              aria-label="Close contact dialog"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>

            <div className="p-6 sm:p-8 flex flex-col items-center text-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-4 border-4 border-ieee-blue/10 dark:border-ieee-blue/20">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(member.name) + '&background=random';
                  }}
                />
              </div>

              <h3 id="contact-modal-title" className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {member.name}
              </h3>
              <p className="text-ieee-blue dark:text-blue-400 font-medium mb-6">
                {member.position}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-ieee-blue"
                  >
                    <Mail className="w-5 h-5 text-ieee-blue dark:text-blue-400 group-hover:scale-110 transition-transform" aria-hidden="true" />
                    <span>Email</span>
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-[#0077b5]/10 hover:bg-[#0077b5]/20 text-[#0077b5] dark:text-[#0a66c2] rounded-xl transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-[#0077b5]"
                  >
                    <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>

              <p className="text-xs text-gray-400 dark:text-gray-500 mt-6">
                Click buttons to contact {member.name.split(' ')[0]}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MemberContactModal;

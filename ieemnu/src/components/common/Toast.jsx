import React, { useEffect, useState } from 'react';
import { X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Toast = ({ message, isVisible, onDismiss, duration = 5000 }) => {
    useEffect(() => {
        if (isVisible && duration) {
            const timer = setTimeout(() => {
                onDismiss();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onDismiss]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 z-[100] flex justify-center sm:block"
                >
                    <div className="bg-white dark:bg-gray-800 border-l-4 border-ieee-blue shadow-2xl rounded-r-lg p-4 flex items-start gap-3 max-w-sm w-full">
                        <div className="flex-shrink-0 mt-0.5">
                            <Info className="w-5 h-5 text-ieee-blue" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                Did you know?
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                {message}
                            </p>
                        </div>
                        <button
                            onClick={onDismiss}
                            className="flex-shrink-0 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast;

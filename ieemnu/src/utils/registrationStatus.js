/**
 * Registration Status Utility
 * Determines if registration is open, closed, or not started for an event
 */

/**
 * Get the current status of event registration
 * @param {Object} event - Event object with registration details
 * @returns {Object} Status object with isOpen, status, and message
 */
export const getRegistrationStatus = (event) => {
    // No form available
    if (!event.hasForm) {
        return {
            isOpen: false,
            status: 'no-form',
            message: 'No registration available'
        };
    }

    const now = new Date();
    const start = event.registrationStart ? new Date(event.registrationStart) : null;
    const end = event.registrationEnd ? new Date(event.registrationEnd) : null;

    // Registration hasn't started yet
    if (start && now < start) {
        return {
            isOpen: false,
            status: 'not-started',
            message: `Opens ${start.toLocaleDateString()}`,
            startDate: start
        };
    }

    // Registration has ended
    if (end && now > end) {
        return {
            isOpen: false,
            status: 'closed',
            message: 'Registration Closed'
        };
    }

    // Registration is open
    return {
        isOpen: true,
        status: 'open',
        message: 'Register Now',
        endDate: end
    };
};

/**
 * Format remaining time for registration
 * @param {Date} endDate - Registration end date
 * @returns {string} Formatted time remaining
 */
export const getTimeRemaining = (endDate) => {
    if (!endDate) return 'Unlimited';

    const now = new Date();
    const diff = endDate - now;

    if (diff < 0) return 'Closed';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} left`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} left`;
    return 'Ending soon';
};

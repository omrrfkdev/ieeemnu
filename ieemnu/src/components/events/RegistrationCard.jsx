import { Link } from 'react-router-dom';
import { ArrowRight, Ticket } from 'lucide-react';
import Button from '../common/Button';

/**
 * RegistrationCard Component
 * Displayed on Event Details page to prompt user registration
 * 
 * @param {string} eventId - The ID of the event
 */
const RegistrationCard = ({ eventId }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Secure Your Spot
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Registration is open! Don't miss out on this opportunity.
                    </p>
                </div>
                <div className="p-3 bg-ieee-blue/10 rounded-xl">
                    <Ticket className="w-8 h-8 text-ieee-blue" />
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    <span>Limited seats available</span>
                </div>

                <Button
                    as={Link}
                    to={`/events/${eventId}/registration`}
                    variant="primary"
                    size="lg"
                    fullWidth
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                    className="shadow-lg shadow-ieee-blue/20 hover:shadow-ieee-blue/40"
                >
                    Register Now
                </Button>
            </div>

            <p className="text-center text-xs text-gray-400 mt-4">
                By registering, you agree to our terms and conditions.
            </p>
        </div>
    );
};

export default RegistrationCard;

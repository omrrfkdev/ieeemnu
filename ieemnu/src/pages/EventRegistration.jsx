/**
 * Event Registration Page
 * Dedicated page for registering for a specific event
 */

import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import TallyEmbed from '../components/common/TallyEmbed';
import { UPCOMING_EVENTS } from '../constants';

const EventRegistration = () => {
    const { id } = useParams();
    const event = UPCOMING_EVENTS.find(e => e.id.toString() === id);

    // If event not found, we can still show a generic form or redirect
    // For this implementation, we'll show the generic registration title if event not found
    const pageTitle = event ? `Register for ${event.title}` : 'Event Registration';

    return (
        <div className="min-h-screen bg-transparent">
            {/* Compact Header - Responsive to theme */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-3 px-4 shadow-sm">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link
                        to="/events"
                        className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-ieee-blue dark:hover:text-white transition-colors group text-sm"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                        Back to Events
                    </Link>
                    <h1 className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 truncate ml-4">
                        {pageTitle}
                    </h1>
                </div>
            </div>

            {/* Form Container - Always Dark */}
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
                    <TallyEmbed
                        src={event?.formLink || "https://tally.so/r/5Bx7pv"}
                        title={`Registration for ${event ? event.title : 'Event'}`}
                    />
                </div>
            </div>
        </div>
    );
};

export default EventRegistration;

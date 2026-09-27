/**
 * Registration Page
 * Shows all events with active registration forms
 */

import { UPCOMING_EVENTS } from '../constants';
import { getRegistrationStatus } from '../utils/registrationStatus';
import EventCard from '../components/events/EventCard';
import { Calendar, Clock, Bell, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Registration = () => {
    // Filter events that have active registration
    const eventsWithForms = UPCOMING_EVENTS.filter(event => {
        if (!event.hasForm) return false;
        const status = getRegistrationStatus(event);
        return status.isOpen || status.status === 'not-started';
    });

    return (
        <div className="min-h-screen bg-transparent pt-28 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-400/10 to-teal-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16 animate-fadeIn relative">
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 shadow-lg shadow-blue-500/25">
                        <Calendar className="w-8 h-8 text-white" strokeWidth={1.5} />
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-white dark:via-blue-300 dark:to-indigo-300 tracking-tight">
                        Event Registration
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
                        Register for upcoming IEEE MNU SB events and workshops
                    </p>
                </div>

                {/* Events Grid or Empty State */}
                {eventsWithForms.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {eventsWithForms.map((event, index) => (
                            <div key={event.id} className="animate-slideUp" style={{ animationDelay: `${index * 100}ms` }}>
                                <EventCard event={event} index={index} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="max-w-2xl mx-auto animate-fadeIn">
                        {/* Premium Empty State */}
                        <div className="relative">
                            {/* Decorative gradient border */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-3xl blur opacity-20" />
                            
                            {/* Main card */}
                            <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-500/10 border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
                                {/* Top gradient accent */}
                                <div className="h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500" />

                                <div className="p-8 sm:p-12 lg:p-16">
                                    {/* Icon container with subtle animation */}
                                    <div className="flex justify-center mb-8">
                                        <div className="relative">
                                            {/* Outer glow ring */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur-xl opacity-20 animate-pulse" />
                                            {/* Main icon */}
                                            <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-full flex items-center justify-center border-2 border-slate-200 dark:border-slate-600 shadow-lg">
                                                <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400 dark:text-slate-500" strokeWidth={1.5} />
                                            </div>
                                            {/* Floating sparkle */}
                                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                                                <Sparkles className="w-3.5 h-3.5 text-white" strokeWidth={2} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Heading */}
                                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3 text-center tracking-tight">
                                        No Active Registrations
                                    </h2>

                                    {/* Description */}
                                    <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 text-center mb-10 leading-relaxed max-w-md mx-auto font-light">
                                        There are no registration forms available at the moment. Check back later for upcoming events!
                                    </p>

                                    {/* Feature highlights */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                                        <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                                            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                                                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" strokeWidth={1.5} />
                                            </div>
                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Stay Updated</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                                            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                                                <Bell className="w-5 h-5 text-purple-600 dark:text-purple-400" strokeWidth={1.5} />
                                            </div>
                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Get Notified</span>
                                        </div>
                                    </div>

                                    {/* CTA Button */}
                                    <Link 
                                        to="/events"
                                        className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:-translate-y-0.5"
                                    >
                                        <span>Explore Events</span>
                                        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
                                    </Link>
                                </div>

                                {/* Bottom decorative gradient */}
                                <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Registration;

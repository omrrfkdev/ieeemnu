import { useEffect } from 'react';

/**
 * TallyEmbed Component
 * Embeds a Tally form into the application
 * 
 * @param {string} src - The Tally form URL (without embed params, logic handles them)
 * @param {string} title - Accessibility title for the iframe
 * @param {boolean} transparentBackground - Whether to use transparent background
 * @returns {JSX.Element} Tally form iframe
 */
const TallyEmbed = ({ src, title = 'Form', transparentBackground = true }) => {
    useEffect(() => {
        // Load Tally embed script
        const script = document.createElement('script');
        script.src = 'https://tally.so/widgets/embed.js';
        script.async = true;
        script.onload = () => {
            // Tally widget script loaded
            if (window.Tally) {
                window.Tally.loadEmbeds();
            }
        };
        script.onerror = () => {
            console.error('Failed to load Tally embed script');
        };
        document.body.appendChild(script);

        return () => {
            // Cleanup script on unmount
            document.body.removeChild(script);
        };
    }, []);

    // Construct src with parameters
    const getSrc = () => {
        const url = new URL(src);
        if (transparentBackground) {
            url.searchParams.set('transparentBackground', '1');
        }
        return url.toString();
    };

    return (
        <div className="w-full custom-scrollbar-container" style={{ height: '700px', maxHeight: '80vh' }}>
            <iframe
                data-tally-src={getSrc()}
                width="100%"
                height="100%"
                frameBorder="0"
                marginHeight="0"
                marginWidth="0"
                title={title}
                className="w-full h-full border-0 custom-scrollbar"
            ></iframe>
        </div>
    );
};

export default TallyEmbed;

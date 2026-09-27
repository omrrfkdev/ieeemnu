/**
 * Footer Component
 * Site footer with links, social media, and contact information
 */

import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin, ArrowRight, Heart, ExternalLink, Linkedin } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTiktok } from '@fortawesome/free-brands-svg-icons';
import { BRANCH_INFO, NAV_ITEMS } from '../../constants';

/**
 * TikTok Icon Component - FontAwesome
 */
const TikTokIcon = ({ className }) => (
  <FontAwesomeIcon icon={faTiktok} className={className} />
);

/**
 * Footer component with multiple sections
 * Features:
 * - Quick navigation links with hover animations
 * - Social media links with gradient hover effects
 * - Contact information with icons
 * - Newsletter subscription
 * - Copyright notice with animated heart
 * 
 * @returns {JSX.Element} Footer component
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  /**
   * Social media icon mapping with colors
   */
  const socialIcons = {
    facebook: { icon: Facebook, color: 'hover:bg-[#1877F2]', link: 'https://www.facebook.com/share/1HRaZWPobn/' },
    instagram: { icon: Instagram, color: 'hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737]', link: 'https://www.instagram.com/ieeemnu.sb?igsh=MXYyZmNqaXdnNGlmOA==' },
    tiktok: { icon: TikTokIcon, color: 'hover:bg-black', link: 'https://www.tiktok.com/@ieeemnu.sb?_r=1&_t=ZS-92Voi4dqGhE' },
    linkedin: { icon: Linkedin, color: 'hover:bg-[#0A66C2]', link: 'https://www.linkedin.com/company/ieee-mnu-sb/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAb21jcAO5245leHRuA2FlbQIxMQBzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAadXVvS92bFdryXUt-9ppVNoz8ObQy-3vcPRbhHrpCLHorUeo33jbaPzV0yQ4w_aem_27WkGkx64SfHbYn5wO2fCw' },
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-gray-900 to-black text-gray-300 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-ieee-blue/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-teal/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-ieee-blue/3 to-accent-teal/3 rounded-full blur-3xl" />
      </div>

      {/* Top Wave Decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ieee-blue/50 to-transparent" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* About Section */}
          <div className="lg:col-span-1 space-y-6">
            <Link to="/" className="flex flex-col space-y-2 group">
              <img
                src="/logoImg/logo.png?v=2"
                alt="IEEE MNU Logo"
                className="h-12 w-auto object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <div className="flex flex-col">
                <span className="text-xs text-ieee-blue-light">
                  {BRANCH_INFO.university}
                </span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              {BRANCH_INFO.name} - Advancing technology for humanity through innovation, education, and collaboration.
            </p>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Established {2023}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 flex items-center">
              <span className="w-8 h-0.5 bg-gradient-to-r from-ieee-blue to-accent-teal mr-3" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="group flex items-center text-sm text-gray-400 hover:text-white transition-all duration-300"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-ieee-blue-light" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h3 className="text-white font-bold mb-6 flex items-center">
              <span className="w-8 h-0.5 bg-gradient-to-r from-ieee-blue to-accent-teal mr-3" />
              Stay Connected
            </h3>
            
            {/* Social Media */}
            <div>
              <p className="text-sm text-gray-400 mb-4">Follow us on social media</p>
              <div className="flex flex-wrap gap-3">
                {Object.entries(socialIcons).map(([platform, data]) => {
                  const { icon: Icon, color, link } = data;
                  return (
                    <a
                      key={platform}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-11 h-11 bg-gray-800/50 border border-gray-700/50 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-transparent hover:text-white ${color}`}
                      aria-label={`Follow us on ${platform}`}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-white font-bold mb-6 flex items-center">
              <span className="w-8 h-0.5 bg-gradient-to-r from-ieee-blue to-accent-teal mr-3" />
              Contact Us
            </h3>
            <div className="space-y-4">
              <a
                href="tel:+201034344715"
                className="group flex items-start space-x-3 text-sm text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Phone className="w-5 h-5 mt-0.5 text-ieee-blue-light group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  +20 10 34344715
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Mandatory IEEE Global Links & Legal */}
        <div className="mt-16 pt-8 border-t border-gray-800/50">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6">
            <a href="https://www.ieee.org" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">IEEE.org</a>
            <a href="https://ieeexplore.ieee.org" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">IEEE Xplore Digital Library</a>
            <a href="https://standards.ieee.org" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">IEEE Standards</a>
            <a href="https://spectrum.ieee.org" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">IEEE Spectrum</a>
            <a href="https://www.ieee.org/sitemap.html" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">More Sites</a>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6 text-xs">
            <Link to="/privacy" className="text-gray-500 hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <a href="https://www.ieee.org/about/help/site-terms-conditions.html" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-300 transition-colors">Terms and Conditions</a>
            <a href="https://www.ieee.org/accessibility-statement.html" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-300 transition-colors">Accessibility</a>
            <a href="https://www.ieee.org/about/corporate/governance/p9-26.html" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-300 transition-colors">Nondiscrimination Policy</a>
          </div>

          <div className="flex flex-col justify-center items-center">
            <p className="text-sm text-gray-500 text-center">
              © Copyright {currentYear} IEEE – All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Line */}
      <div className="h-1 bg-gradient-to-r from-ieee-blue via-accent-teal to-ieee-blue" />
    </footer>
  );
};

export default Footer;

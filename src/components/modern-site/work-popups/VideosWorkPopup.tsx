import React from 'react';
import { colors, typography } from '../../../theme/theme';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

interface VideosWorkPopupProps {
  onClose: () => void;
}

const VideosWorkPopup: React.FC<VideosWorkPopupProps> = ({ onClose }) => {
  const buttonColor = colors.primary.yellow; // #FFCC00
  const isMobile = window.innerWidth <= 768;
  
  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="bg-[#1a1a1a] rounded-lg border border-gray-800 w-full max-w-5xl max-h-[90vh] overflow-auto"
        style={isMobile ? { width: '100%', height: '100%', maxHeight: '100vh', borderRadius: 0 } : {}}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h2 className={`${typography.fontSize['2xl']} ${typography.fontFamily.light} ${typography.tracking.tight} text-white`}>
            Content Portfolio
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <video 
                src="https://file.garden/Zxsc5-9aojhlnJO6/testimonials/contentfolio.mov" 
                controls 
                autoPlay 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          <div className="bg-black/20 p-6 rounded-lg border border-gray-800">
            <h3 className={`${typography.fontSize.xl} ${typography.fontFamily.light} ${typography.tracking.tight} text-white mb-4`}>
              About This Video
            </h3>
            <p className={`${typography.fontSize.lg} ${typography.fontFamily.light} ${typography.tracking.tight} text-gray-300 mb-4`}>
              This content portfolio showcases our creative capabilities and production quality. It highlights our approach to visual storytelling and demonstrates how we bring brands to life through engaging video content.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: `${buttonColor}20`, color: buttonColor }}>
                Content Creation
              </span>
              <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: `${buttonColor}20`, color: buttonColor }}>
                Portfolio
              </span>
              <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: `${buttonColor}20`, color: buttonColor }}>
                Showcase
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-800 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 text-black rounded-md transition-colors duration-300 text-sm font-light tracking-tight"
            style={{ 
              backgroundColor: buttonColor,
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = `${buttonColor}dd`;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = buttonColor;
            }}
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VideosWorkPopup;
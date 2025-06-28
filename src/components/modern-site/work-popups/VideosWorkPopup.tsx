import React, { useState } from 'react';
import { colors, typography } from '../../../theme/theme';
import { X, Video } from 'lucide-react';
import { motion } from 'framer-motion';

interface VideosWorkPopupProps {
  onClose: () => void;
}

interface VideoProject {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  color: string;
}

const VideosWorkPopup: React.FC<VideosWorkPopupProps> = ({ onClose }) => {
  const buttonColor = colors.primary.yellow; // #FFCC00
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const videoProject: VideoProject = {
    id: 'content-folio',
    title: 'Content Portfolio',
    description: 'A showcase of our content creation capabilities, featuring examples of our video production work for various clients.',
    videoUrl: 'https://file.garden/Zxsc5-9aojhlnJO6/testimonials/contentfolio.mov',
    color: '#FF1493'
  };
  
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
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${buttonColor}40` }}>
              <Video size={18} style={{ color: buttonColor }} />
            </div>
            <h2 className={`${typography.fontSize['2xl']} ${typography.fontFamily.light} ${typography.tracking.tight} text-white`}>
              {videoProject.title}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              {isVideoLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
                </div>
              )}
              <video
                src={videoProject.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
                onCanPlay={() => setIsVideoLoading(false)}
                onError={() => setIsVideoLoading(false)}
              />
            </div>
            
            <p className="text-gray-300">{videoProject.description}</p>
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
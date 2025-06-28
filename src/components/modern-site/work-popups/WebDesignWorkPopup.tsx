import React, { useState, useEffect } from 'react';
import { colors, typography } from '../../../theme/theme';
import { X, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface WebDesignWorkPopupProps {
  onClose: () => void;
}

interface WebsiteProject {
  id: string;
  title: string;
  url: string;
  imageUrl: string;
  color: string;
}

const WebDesignWorkPopup: React.FC<WebDesignWorkPopupProps> = ({ onClose }) => {
  const buttonColor = colors.primary.blue; // #008CFF
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const websiteProjects: WebsiteProject[] = [
    {
      id: 'mg-accounting',
      title: 'MG Accounting',
      url: 'https://www.mgaccounting.com.au/',
      imageUrl: '/mgaccounting.png',
      color: '#008CFF'
    },
    {
      id: 'followfuse',
      title: 'FollowFuse',
      url: 'https://www.followfuse.com/',
      imageUrl: '/followfuse.png',
      color: '#FF1493'
    },
    {
      id: 'boostr',
      title: 'Boostr',
      url: 'https://boostr-seven.vercel.app/',
      imageUrl: '/images/brands/boostr.png',
      color: '#FFCC00'
    },
    {
      id: '1-step-ahead',
      title: '1 Step Ahead',
      url: 'https://1stepahead.vercel.app/',
      imageUrl: '/1stepahead.png',
      color: '#00CC66'
    },
    {
      id: 'followfuseapp',
      title: 'FollowFuseApp',
      url: 'https://followfuseapp.com/',
      imageUrl: '/followfuseapp.png',
      color: '#9933FF'
    },
    {
      id: 'timelox',
      title: 'Timelox',
      url: 'https://timelox-website.vercel.app/',
      imageUrl: '/timelox.png',
      color: '#FF6600'
    }
  ];
  
  const handleOpenWebsite = (url: string) => {
    window.open(url, '_blank');
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
        initial={isMobile ? 
          { opacity: 0 } : 
          { scale: 0.9, opacity: 0 }
        }
        animate={isMobile ? 
          { opacity: 1 } : 
          { scale: 1, opacity: 1 }
        }
        exit={isMobile ? 
          { opacity: 0 } : 
          { scale: 0.9, opacity: 0 }
        }
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-800" 
             style={{ background: `linear-gradient(90deg, #1a1a1a, ${buttonColor}40)` }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${buttonColor}40` }}>
              <ExternalLink size={18} style={{ color: buttonColor }} />
            </div>
            <h2 className={`${typography.fontSize['2xl']} ${typography.fontFamily.light} ${typography.tracking.tight} text-white`}>
              Website Projects
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {websiteProjects.map((project) => (
              <div 
                key={project.id}
                className="bg-black/30 border border-gray-800 rounded-lg overflow-hidden cursor-pointer hover:border-gray-600 transition-colors"
                onClick={() => handleOpenWebsite(project.url)}
              >
                <div className="relative aspect-video">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                    <div className="p-4 w-full">
                      <h4 className="text-white font-light text-lg">{project.title}</h4>
                      <div className="flex items-center gap-1 text-gray-300 text-sm mt-1">
                        <ExternalLink size={14} />
                        <span>Visit Site</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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

export default WebDesignWorkPopup;
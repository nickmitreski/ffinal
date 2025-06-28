import React, { useState } from 'react';
import { colors, typography } from '../../../theme/theme';
import { X, Video, Play, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface VideosWorkPopupProps {
  onClose: () => void;
}

interface VideoProject {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  color: string;
}

const VideosWorkPopup: React.FC<VideosWorkPopupProps> = ({ onClose }) => {
  const buttonColor = colors.primary.yellow; // #FFCC00
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selectedVideo, setSelectedVideo] = useState<VideoProject | null>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const videoProjects: VideoProject[] = [
    {
      id: 'content-folio',
      title: 'Content Portfolio',
      description: 'A showcase of our content creation capabilities, featuring examples of our video production work for various clients.',
      videoUrl: 'https://file.garden/Zxsc5-9aojhlnJO6/testimonials/contentfolio.mov',
      thumbnailUrl: '/VIDEOS.png',
      color: '#FF1493'
    }
  ];
  
  const handleVideoSelect = (video: VideoProject) => {
    setSelectedVideo(video);
    setIsVideoLoading(true);
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
              Video Projects
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
          {selectedVideo ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className={`${typography.fontSize['2xl']} ${typography.fontFamily.light} ${typography.tracking.tight}`} style={{ color: selectedVideo.color }}>
                  {selectedVideo.title}
                </h3>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                {isVideoLoading && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
                  </div>
                )}
                <video
                  src={selectedVideo.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                  onCanPlay={() => setIsVideoLoading(false)}
                  onError={() => setIsVideoLoading(false)}
                />
              </div>
              
              <p className="text-gray-300">{selectedVideo.description}</p>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-gray-300 mb-6">
                Explore our video production work. Click on a project to view the video.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {videoProjects.map((video) => (
                  <div
                    key={video.id}
                    className="bg-black/30 border border-gray-800 rounded-lg overflow-hidden cursor-pointer hover:border-gray-600 transition-colors"
                    onClick={() => handleVideoSelect(video)}
                  >
                    <div className="relative aspect-video">
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                          <Play size={32} className="text-white ml-1" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-light text-lg mb-2">{video.title}</h3>
                      <p className="text-gray-400 text-sm line-clamp-2">{video.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
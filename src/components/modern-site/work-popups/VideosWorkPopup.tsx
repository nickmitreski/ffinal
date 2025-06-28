import React, { useState } from 'react';
import { colors, typography } from '../../../theme/theme';
import { X, Play, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface VideosWorkPopupProps {
  onClose: () => void;
}

interface VideoProject {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail?: string;
  tags: string[];
  color: string;
}

const VideosWorkPopup: React.FC<VideosWorkPopupProps> = ({ onClose }) => {
  const buttonColor = colors.primary.yellow; // #FFCC00
  const isMobile = window.innerWidth <= 768;
  const [selectedVideo, setSelectedVideo] = useState<VideoProject | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const videoProjects: VideoProject[] = [
    {
      id: 'content-portfolio',
      title: 'Content Portfolio',
      description: 'A showcase of our content creation capabilities, featuring examples of video production, animation, and storytelling techniques that engage audiences and deliver results.',
      videoUrl: 'https://file.garden/Zxsc5-9aojhlnJO6/testimonials/contentfolio.mov',
      tags: ['Content Creation', 'Portfolio', 'Showcase'],
      color: '#FFCC00'
    },
    {
      id: 'brand-story',
      title: 'Brand Story',
      description: 'An emotional narrative that connects viewers with the heart of a brand, showcasing the journey, values, and vision that make it unique.',
      videoUrl: 'https://file.garden/Zxsc5-9aojhlnJO6/flashforowarddraft.mp4',
      tags: ['Branding', 'Storytelling', 'Narrative'],
      color: '#FF1493'
    },
    {
      id: 'product-launch',
      title: 'Product Launch',
      description: 'A dynamic announcement video that builds excitement and showcases the features and benefits of a new product or service.',
      videoUrl: 'https://file.garden/Zxsc5-9aojhlnJO6/news_promo.mp4',
      tags: ['Product', 'Launch', 'Marketing'],
      color: '#008CFF'
    }
  ];
  
  const handlePlayVideo = (video: VideoProject) => {
    setSelectedVideo(video);
    setIsPlaying(true);
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
          <h2 className={`${typography.fontSize['2xl']} ${typography.fontFamily.light} ${typography.tracking.tight} text-white`}>
            Video Projects
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          {selectedVideo && isPlaying ? (
            <div className="mb-8">
              <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
                <video 
                  src={selectedVideo.videoUrl} 
                  controls 
                  autoPlay 
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className={`${typography.fontSize.xl} ${typography.fontFamily.light} ${typography.tracking.tight} text-white mb-2`}>
                {selectedVideo.title}
              </h3>
              <p className={`${typography.fontSize.sm} ${typography.fontFamily.light} ${typography.tracking.tight} text-gray-400 mb-4`}>
                {selectedVideo.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedVideo.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 rounded-full text-xs"
                    style={{ backgroundColor: `${selectedVideo.color}20`, color: selectedVideo.color }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setIsPlaying(false)}
                className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
              >
                Back to all videos
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videoProjects.map((video) => (
                <motion.div 
                  key={video.id}
                  className="bg-black/30 border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-colors"
                  whileHover={{ y: -5 }}
                >
                  <div className="aspect-video bg-black/50 relative group">
                    {video.thumbnail ? (
                      <img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-500 text-4xl">▶</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => handlePlayVideo(video)}
                        className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                      >
                        <Play size={32} className="text-white" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className={`${typography.fontSize.lg} ${typography.fontFamily.light} ${typography.tracking.tight} text-white mb-2`}>
                      {video.title}
                    </h3>
                    <p className={`${typography.fontSize.sm} ${typography.fontFamily.light} ${typography.tracking.tight} text-gray-400 mb-3 line-clamp-2`}>
                      {video.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {video.tags.slice(0, 2).map((tag, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 rounded-full text-xs"
                          style={{ backgroundColor: `${video.color}20`, color: video.color }}
                        >
                          {tag}
                        </span>
                      ))}
                      {video.tags.length > 2 && (
                        <span className="px-2 py-1 rounded-full text-xs bg-gray-800 text-gray-400">
                          +{video.tags.length - 2}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handlePlayVideo(video)}
                      className="mt-4 w-full px-4 py-2 rounded-md text-black text-sm font-light tracking-tight flex items-center justify-center gap-2"
                      style={{ backgroundColor: video.color }}
                    >
                      <Play size={16} />
                      Watch Video
                    </button>
                  </div>
                </motion.div>
              ))}
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
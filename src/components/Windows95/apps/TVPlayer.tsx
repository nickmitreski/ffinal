import React, { useState, useEffect, useRef } from 'react';

interface Channel {
  name: string;
  icon: string;
  description: string;
  shows: Show[];
}

interface Show {
  title: string;
  duration: string;
  description: string;
  videoUrl?: string;
}

// Initial channel data structure with hardcoded URLs
const initialChannels: Channel[] = [
  {
    name: 'MTV',
    icon: '/MediaAudio_32x32_4.png',
    description: 'Music Television - Your #1 source for music videos and entertainment',
    shows: [
      { title: 'MTV Classic', duration: 'N/A', description: 'Classic MTV content', videoUrl: 'https://file.garden/Zxsc5-9aojhlnJO6/90stv/MTV.mp4' },
    ],
  },
  {
    name: 'Sitcoms',
    icon: '/TV.png',
    description: 'Classic sitcoms from the 90s',
    shows: [
      { title: 'Perfect Strangers', duration: 'N/A', description: 'Balki and Larry\'s adventures', videoUrl: 'https://file.garden/Zxsc5-9aojhlnJO6/90stv/PerfectStrangers.mp4' },
    ],
  },
  {
    name: 'Cartoons',
    icon: '/Network2_32x32_4.png',
    description: 'Your favorite animated shows',
    shows: [
      { title: 'Samurai Pizza Cats', duration: 'N/A', description: 'Awesome feline heroes', videoUrl: 'https://file.garden/Zxsc5-9aojhlnJO6/90stv/SamuraPizzaCats.mp4' },
    ],
  },
  {
    name: 'News',
    icon: '/Mailnews13_32x32_4.png',
    description: '24/7 News Coverage',
    shows: [
      { title: '96 News', duration: 'N/A', description: 'News from 1996', videoUrl: 'https://file.garden/Zxsc5-9aojhlnJO6/90stv/news96.mp4' },
    ],
  },
  {
    name: 'Game Shows',
    icon: '/images/icons/controls3000.png',
    description: 'Test your knowledge with classic game shows',
    shows: [
      { title: 'Wheel', duration: 'N/A', description: 'Spin the wheel!', videoUrl: 'https://file.garden/Zxsc5-9aojhlnJO6/90stv/Wheel.mp4' },
    ],
  },
];

interface TVPlayerProps {
  onResizeWindow?: (size: { width: number; height: number }) => void;
}

const TVPlayer: React.FC<TVPlayerProps> = ({ onResizeWindow }) => {
  const [channels] = useState<Channel[]>(initialChannels);
  const [currentChannelIndex, setCurrentChannelIndex] = useState(0);
  const [currentShowIndex, setCurrentShowIndex] = useState(0);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [aspectRatio, setAspectRatio] = useState<number | undefined>(undefined);
  const [videoDimensions, setVideoDimensions] = useState<{ width: number; height: number } | null>(null);

  // Effect to set the initial video and update when channel or show changes
  useEffect(() => {
    if (channels.length > 0) {
      const channel = channels[currentChannelIndex];
      if (channel && channel.shows.length > 0) {
        const validShowIndex = Math.min(currentShowIndex, channel.shows.length - 1);
        setCurrentShowIndex(validShowIndex);
        const videoUrl = channel.shows[validShowIndex].videoUrl;
        setCurrentVideoUrl(videoUrl);
        setIsLoading(true);
        setError(null);

        // Reset aspect ratio when channel or show changes
        setAspectRatio(undefined);
      } else {
        setCurrentVideoUrl(undefined);
        setError('No shows available in this channel');
      }
    } else {
      setCurrentVideoUrl(undefined);
      setError('No channels available');
    }
  }, [channels, currentChannelIndex, currentShowIndex]);

  // Handler for when video metadata is loaded
  const handleLoadedMetadata = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const videoAspectRatio = videoElement.videoWidth / videoElement.videoHeight;
      setAspectRatio(videoAspectRatio);
      setIsLoading(false);
      setVideoDimensions({ width: videoElement.videoWidth, height: videoElement.videoHeight });
      // Dynamically resize the window to match video dimensions (doubled)
      if (onResizeWindow) {
        onResizeWindow({ width: videoElement.videoWidth * 2, height: videoElement.videoHeight * 2 });
      }
    }
  };

  const handleVideoError = () => {
    setError('Failed to load video. Please try another channel.');
    setIsLoading(false);
  };

  const handleNextChannel = () => {
    const nextChannelIndex = (currentChannelIndex + 1) % channels.length;
    setCurrentChannelIndex(nextChannelIndex);
    setCurrentShowIndex(0);
  };

  const handlePreviousChannel = () => {
    const prevChannelIndex = (currentChannelIndex - 1 + channels.length) % channels.length;
    setCurrentChannelIndex(prevChannelIndex);
    setCurrentShowIndex(0);
  };

  const handleNextShow = () => {
    const currentChannel = channels[currentChannelIndex];
    if (currentChannel && currentChannel.shows.length > 0) {
      const nextShowIndex = (currentShowIndex + 1) % currentChannel.shows.length;
      setCurrentShowIndex(nextShowIndex);
    } else {
      handleNextChannel();
    }
  };

  const handleVideoEnded = () => {
    handleNextShow();
  };

  const currentChannel = channels[currentChannelIndex];
  const currentShow = currentChannel?.shows[currentShowIndex];

  return (
    <div className="h-full flex flex-col bg-[var(--win95-window-bg)]" style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: 0 }}>
      {/* TV Screen */}
      <div 
        className="bg-black border-0 flex-1"
        style={{
          width: '100%',
          position: 'relative',
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          margin: 0,
          padding: 0,
        }}
      >
        <div style={{ position: 'relative', flex: 1, minHeight: 0, margin: 0, padding: 0 }}>
        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
            <div className="text-white text-center">
              <div className="mb-4">
                <div className="inline-block w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
              <div>Loading Channel...</div>
            </div>
          </div>
        )}
        {/* Error Display */}
        {error && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
            <div className="text-red-500 text-center p-4 bg-black/50">
              <div className="mb-2 text-xl">ERROR</div>
              <div>{error}</div>
            </div>
          </div>
        )}
        {/* Video Player */}
        {currentVideoUrl && (
            <>
          <video 
            ref={videoRef}
            src={currentVideoUrl}
            controls={false}
            autoPlay
            className="absolute top-0 left-0 w-full h-full object-contain"
                style={{ margin: 0, padding: 0, width: '100%', height: '100%' }}
            onEnded={handleVideoEnded}
            onError={handleVideoError}
            onLoadedMetadata={handleLoadedMetadata}
          />
              {videoDimensions && (
                <div style={{ position: 'absolute', bottom: 8, right: 12, background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: 12, padding: '2px 8px', borderRadius: 4, zIndex: 20 }}>
                  {videoDimensions.width} × {videoDimensions.height}
                </div>
        )}
            </>
          )}
        {/* No Signal Display */}
        {!currentVideoUrl && !error && (
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="text-gray-500 text-2xl">
              <div className="mb-4">NO SIGNAL</div>
              {channels.length === 0 ? (
                <div className="text-xl">Loading Channels...</div>
              ) : currentChannel && currentChannel.shows.length === 0 ? (
                <div className="text-xl">No videos in this channel.</div>
              ) : (
                <div className="text-xl">No Video</div>
              )}
            </div>
          </div>
        )}
      </div>
      </div>
      {/* Controls */}
      <div className="bg-[var(--win95-window-bg)] p-2 border-2 border-[var(--win95-border-inner-dark)]" style={{ flex: 'none', margin: 0 }}>
        <div className="flex gap-2 mb-2 justify-center">
          <button 
            className="win95-button flex-1"
            onClick={handlePreviousChannel}
            disabled={channels.length <= 1 || isLoading}
          >
            ⏪ Prev Channel
          </button>
          <button 
            className="win95-button flex-1"
            onClick={handleNextChannel}
            disabled={channels.length <= 1 || isLoading}
          >
            Next Channel ⏩
          </button>
        </div>
        {/* Channel Info */}
        <div className="text-center text-sm">
          <p>Channel: {currentChannel?.name || 'Loading...'}</p>
          <p>Show: {currentShow?.title || 'Loading...'}</p>
        </div>
      </div>
    </div>
  );
};

export default TVPlayer;
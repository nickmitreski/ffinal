import React from 'react';
import { AppContentProps } from '../../../data/appData.tsx';
import { FolderItem } from '../../../data/folderItemsData.ts';
import StatsPage from './StatsPage';
import { useWindowsContext } from '../../../contexts/WindowsContext';
import RandomAudioPlayer from './RandomAudioPlayer'; // Keep import for other potential uses or future expansion

interface GenericFolderProps extends AppContentProps {
  items: FolderItem[];
  onOpenApp: AppContentProps['onOpenApp'];
}

const AI_TOOL_APP_IDS = [
  'basicChatbot',
  'imageGenerator',
  'chatbot',
  'voicebot',
  'gpt90s',
];

const GAME_APP_IDS = [
  'game-mario',
  'game-zelda',
  'game-mk-wiki',
];

const GenericFolder: React.FC<GenericFolderProps> = ({ onOpenApp, items }) => {
  const { onBack } = useWindowsContext();
  const safeOnBack = onBack || (() => {});

  const handleItemClick = (item: FolderItem, index?: number) => {
    // 1. Video files: always open in a video player window if item.path is .mp4 or .mov
    if (item.path && (/\.(mp4|mov)$/i.test(item.path))) {
      const videoAppId = `video-${item.name.replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')}-${Date.now()}-${Math.floor(Math.random()*10000)}`;
      const VideoPlayer = () => {
        const [error, setError] = React.useState<string | null>(null);
        return (
          <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#000' }}>
            {error ? (
              <div style={{ color: 'white', textAlign: 'center' }}>
                <div style={{ fontSize: 24, marginBottom: 12 }}>⚠️</div>
                <div>Failed to load video.<br />Please check your connection or try again later.</div>
              </div>
            ) : (
              <video 
                src={item.path} 
                controls 
                autoPlay 
                style={{ maxWidth: '100%', maxHeight: '100%' }}
                onError={() => setError('Failed to load video')}
              />
            )}
          </div>
        );
      };
      onOpenApp(
        videoAppId,
        <VideoPlayer />, 
        item.name,
        { x: 200, y: 100 },
        { width: 800, height: 600 }
      );
      return;
    }
    // 2. Images: only open if icon is an image file
    const isImage = (icon: string) => /\.(png|jpg|jpeg|gif)$/i.test(icon);
    if (isImage(item.icon)) {
      const baseX = 200;
      const baseY = 100;
      const offsetX = Math.floor(Math.random() * 401) - 200;
      const offsetY = Math.floor(Math.random() * 201) - 100;
      const imageAppId = `image-${item.name.replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')}-${Date.now()}-${Math.floor(Math.random()*10000)}`;
      // Dynamically size the window to fit the image
      const openImageWindow = (width: number, height: number) => {
        const ImageViewer = () => (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', overflow: 'hidden' }}>
            <img src={item.icon} alt={item.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          </div>
        );
        onOpenApp(
          imageAppId,
          <ImageViewer />,
          item.name,
          { x: baseX + offsetX, y: baseY + offsetY }
        );
      };
      // Preload the image to get its natural size
      const img = new window.Image();
      img.onload = function() {
        // Clamp size for usability
        const maxWidth = 600;
        const maxHeight = 500;
        let width = img.naturalWidth;
        let height = img.naturalHeight;
        if (width > maxWidth) {
          height = Math.round(height * (maxWidth / width));
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = Math.round(width * (maxHeight / height));
          height = maxHeight;
        }
        openImageWindow(width, height);
      };
      img.onerror = function() {
        // Fallback to default size if image fails to load
        openImageWindow(400, 300);
      };
      img.src = item.icon;
      return;
    }
    if (item.isBuiltIn && item.appId) {
      if (item.appId === 'winamp') {
        onOpenApp('winamp');
        return;
      }
      if (item.appId === 'statsPage') {
        onOpenApp(
          item.appId,
          <StatsPage onContinue={safeOnBack} />,
          item.name
        );
      } else if (AI_TOOL_APP_IDS.includes(item.appId)) {
        onOpenApp(item.appId, undefined, undefined, { x: 300, y: 100 });
      } else if (item.appId === 'minesweeper' || item.appId === 'solitaire') {
        onOpenApp(item.appId);
      } else {
        onOpenApp(item.appId);
      }
    } else if (!item.isBuiltIn && item.path) {
      // For external items, check if we have a dedicated launcher
      if (item.name === 'Super Mario') {
        onOpenApp('game-mario');
      } else if (item.name === 'Zelda') {
        onOpenApp('game-zelda');
      } else if (item.name === 'Mortal Kombat Wiki') {
        onOpenApp('game-mk-wiki');
      } else if (item.path && /\.(mp4|mov)$/i.test(item.path)) {
        // Open video files in a custom video player window
        const videoAppId = `video-${item.name.replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')}-${Date.now()}-${Math.floor(Math.random()*10000)}`;
        const VideoPlayer = () => (
          <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#000' }}>
            <video src={item.path} controls autoPlay style={{ maxWidth: '100%', maxHeight: '100%' }} />
          </div>
        );
        onOpenApp(
          videoAppId,
          <VideoPlayer />, 
          item.name,
          { x: 200, y: 100 },
          { width: 800, height: 600 }
        );
        return;
      } else {
        // For other external items, open them in a new window with an iframe
        const externalId = `external-${item.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
        onOpenApp(
          externalId,
          <div style={{ 
            width: '100%', 
            height: '100%', 
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <iframe 
              src={item.path}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                backgroundColor: '#000'
              }}
              title={item.name}
              allow="fullscreen"
            />
          </div>,
          item.name
        );
      }
    } else if (item.audioUrls && item.audioUrls.length > 0) {
      const audioAppId = `audio-${item.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
      onOpenApp(
        audioAppId,
        <RandomAudioPlayer audioUrls={item.audioUrls} />,
        item.name
      );
    }
  };

  return (
    <div className="win95-folder-content">
      {items && items.map((item, index) => (
        <div 
          key={index} 
          className="win95-folder-item"
          onDoubleClick={() => handleItemClick(item, index)}
          onClick={() => {
            if (item.audioUrls || item.openOnSingleClick) {
              handleItemClick(item, index);
            }
          }}
        >
          <img 
            src={item.icon} 
            alt={item.name} 
            className="win95-folder-item-icon" 
          />
          <div className="win95-folder-item-text">{item.name}</div>
        </div>
      ))}
    </div>
  );
};

export default GenericFolder;
import React from 'react';

interface FileIconProps {
  icon: string;
  name: string;
  onOpen: () => void;
  openOnSingleClick?: boolean;
  className?: string;
}

const FileIcon: React.FC<FileIconProps> = ({ icon, name, onOpen, openOnSingleClick, className }) => {
  return (
    <div
      className={`win95-folder-item${className ? ' ' + className : ''}`}
      onDoubleClick={() => { if (!openOnSingleClick) onOpen(); }}
      onClick={() => { if (openOnSingleClick) onOpen(); }}
    >
      <img
        src={icon}
        alt={name}
        className="win95-folder-item-icon"
      />
      <div className="win95-folder-item-text">{name}</div>
    </div>
  );
};

export default FileIcon; 
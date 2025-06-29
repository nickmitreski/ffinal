import React from 'react';

interface FileIconProps {
  icon: string;
  name: string;
  onOpen: () => void;
  openOnSingleClick?: boolean;
  className?: string;
}

const FileIcon: React.FC<FileIconProps> = ({ icon, name, onOpen, openOnSingleClick, className }) => {
  const handleClick = (e: React.MouseEvent) => {
    if (openOnSingleClick) {
      e.preventDefault();
      e.stopPropagation();
      onOpen();
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (!openOnSingleClick) {
      e.preventDefault();
      e.stopPropagation();
      onOpen();
    }
  };

  return (
    <div
      className={`win95-folder-item${className ? ' ' + className : ''}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      data-file-name={name}
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
import React from 'react';
import GenericFolder from './GenericFolder';
import { documentsItems } from '../../../data/folderItemsData';
import { AppContentProps } from '../../../data/appData';

const MyDocuments: React.FC<AppContentProps> = ({ onOpenApp }) => {
  return <GenericFolder items={documentsItems} onOpenApp={onOpenApp} />;
};

export default MyDocuments;
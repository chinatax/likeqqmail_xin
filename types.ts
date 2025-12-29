import React from 'react';

export interface Email {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  snippet: string;
  date: string;
  isRead: boolean;
  isStarred: boolean;
  hasAttachment: boolean;
  body: string;
  folderId: string;
}

export interface Folder {
  id: string;
  name: string;
  icon: React.ReactNode;
  count?: number;
}

export enum FolderType {
  INBOX = 'inbox',
  STARRED = 'starred',
  SENT = 'sent',
  DRAFTS = 'drafts',
  TRASH = 'trash',
  JUNK = 'junk'
}
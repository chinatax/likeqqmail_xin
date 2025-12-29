import React from 'react';
import { Email, FolderType } from './types';
import { Inbox, Star, Send, FileText, Trash2, AlertOctagon } from 'lucide-react';

export const FOLDERS = [
  { id: FolderType.INBOX, name: '收件箱', icon: <Inbox size={16} />, count: 12 },
  { id: FolderType.STARRED, name: '星标邮件', icon: <Star size={16} />, count: 2 },
  { id: FolderType.SENT, name: '已发送', icon: <Send size={16} /> },
  { id: FolderType.DRAFTS, name: '草稿箱', icon: <FileText size={16} />, count: 1 },
  { id: FolderType.JUNK, name: '垃圾箱', icon: <AlertOctagon size={16} /> },
  { id: FolderType.TRASH, name: '已删除', icon: <Trash2 size={16} /> },
];

export const MOCK_EMAILS: Email[] = [
  {
    id: '1',
    senderName: '腾讯企业邮箱团队',
    senderEmail: 'service@exmail.qq.com',
    subject: '欢迎使用腾讯企业邮箱',
    snippet: '尊敬的用户：您好！欢迎使用腾讯企业邮箱。我们致力于为您提供安全、稳定、高效的企业沟通服务...',
    date: '2023-10-24',
    isRead: false,
    isStarred: true,
    hasAttachment: false,
    body: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 20px;">
        <h2 style="color: #333;">欢迎使用腾讯企业邮箱</h2>
        <p style="color: #666; line-height: 1.6;">尊敬的用户：</p>
        <p style="color: #666; line-height: 1.6;">您好！欢迎使用腾讯企业邮箱。我们致力于为您提供安全、稳定、高效的企业沟通服务。</p>
        <p style="color: #666; line-height: 1.6;">您可以点击下方按钮开始配置您的账户。</p>
        <button style="background-color: #0066CC; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;">开始设置</button>
      </div>
    `,
    folderId: FolderType.INBOX
  },
  {
    id: '2',
    senderName: '京东JD.COM',
    senderEmail: 'service@jd.com',
    subject: '订单配送通知：您的订单正在派送中',
    snippet: '尊敬的客户，您的订单 123456789 正在由快递员张三派送中，请保持电话畅通...',
    date: '2023-10-23',
    isRead: true,
    isStarred: false,
    hasAttachment: true,
    body: '尊敬的客户，您的订单 123456789 正在由快递员张三派送中，请保持电话畅通。感谢您在京东购物。',
    folderId: FolderType.INBOX
  },
  {
    id: '3',
    senderName: '阿里云',
    senderEmail: 'system@aliyun.com',
    subject: '【阿里云】云服务器ECS续费提醒',
    snippet: '尊敬的用户，您名下的云服务器ECS实例 i-bp12345... 即将到期，请及时续费以免影响业务...',
    date: '2023-10-22',
    isRead: true,
    isStarred: true,
    hasAttachment: false,
    body: '尊敬的用户，您名下的云服务器ECS实例 i-bp12345... 即将到期，请及时续费以免影响业务。',
    folderId: FolderType.INBOX
  },
  {
    id: '4',
    senderName: 'GitHub',
    senderEmail: 'noreply@github.com',
    subject: '[GitHub] A new personal access token was created',
    snippet: 'A new personal access token was created for your account. If this was not you, please revoke it immediately.',
    date: '2023-10-21',
    isRead: false,
    isStarred: false,
    hasAttachment: false,
    body: 'A new personal access token was created for your account. If this was not you, please revoke it immediately via your account settings.',
    folderId: FolderType.INBOX
  },
  {
    id: '5',
    senderName: 'BOSS直聘',
    senderEmail: 'notify@zhipin.com',
    subject: '您有一条新的面试邀请',
    snippet: 'HR李女士邀请您参加前端开发工程师的面试，点击查看详情...',
    date: '2023-10-20',
    isRead: true,
    isStarred: false,
    hasAttachment: false,
    body: 'HR李女士邀请您参加前端开发工程师的面试，请点击链接查看详情并确认时间。',
    folderId: FolderType.INBOX
  },
  {
    id: '6',
    senderName: 'Product Team',
    senderEmail: 'team@company.com',
    subject: 'Project Alpha Q4 Roadmap Draft',
    snippet: 'Hi team, attached is the draft for Q4. Please review by EOD Friday.',
    date: '2023-10-25',
    isRead: true,
    isStarred: false,
    hasAttachment: true,
    body: 'Hi team, attached is the draft for Q4. Please review by EOD Friday.',
    folderId: FolderType.DRAFTS
  },
  {
    id: '7',
    senderName: 'HR Dept',
    senderEmail: 'hr@company.com',
    subject: 'Holiday Schedule 2024',
    snippet: 'Dear All, here is the official holiday schedule for next year...',
    date: '2023-10-15',
    isRead: true,
    isStarred: false,
    hasAttachment: true,
    body: 'Dear All, here is the official holiday schedule for next year. Please plan accordingly.',
    folderId: FolderType.INBOX
  }
];
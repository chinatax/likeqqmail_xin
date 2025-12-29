import React, { useState } from 'react';
import { TopHeader } from './components/TopHeader';
import { Sidebar } from './components/Sidebar';
import { EmailList } from './components/EmailList';
import { EmailDetail } from './components/EmailDetail';
import { ComposeMail } from './components/ComposeMail';
import { MOCK_EMAILS } from './constants';
import { FolderType } from './types';

const App: React.FC = () => {
  const [currentFolder, setCurrentFolder] = useState<FolderType>(FolderType.INBOX);
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const [isComposing, setIsComposing] = useState<boolean>(false);
  
  // Filter emails based on folder
  const filteredEmails = MOCK_EMAILS.filter(email => {
    if (currentFolder === FolderType.INBOX) return email.folderId === FolderType.INBOX;
    if (currentFolder === FolderType.DRAFTS) return email.folderId === FolderType.DRAFTS;
    return email.folderId === FolderType.INBOX; 
  });

  const selectedEmail = MOCK_EMAILS.find(e => e.id === selectedEmailId) || null;

  // Toggle selection
  const handleEmailSelect = (id: string) => {
    if (selectedEmailId === id) {
      setSelectedEmailId(null);
    } else {
      setSelectedEmailId(id);
    }
  };

  const handleComposeClick = () => {
    setIsComposing(true);
    setSelectedEmailId(null); // Optional: clear selection when writing
  };

  const handleFolderSelect = (folderId: FolderType) => {
    setCurrentFolder(folderId);
    setSelectedEmailId(null);
    setIsComposing(false); // Exit compose mode when switching folders
  };

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-white">
      <TopHeader />
      
      <main className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar - Fixed */}
        <Sidebar 
          currentFolder={currentFolder} 
          onSelectFolder={handleFolderSelect}
          onComposeClick={handleComposeClick}
        />
        
        {/* Content Area */}
        <div className="flex-1 flex relative overflow-hidden bg-gray-50">
          
          {isComposing ? (
            <ComposeMail onCancel={() => setIsComposing(false)} />
          ) : (
            <>
              {/* List View - Animates width on Desktop */}
              <div className={`
                 flex flex-col h-full bg-white transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] z-10 border-r border-gray-200
                 ${selectedEmailId ? 'lg:w-[400px] xl:w-[450px]' : 'lg:w-full'}
                 ${/* Mobile handling: Hidden if detail is open */ selectedEmailId ? 'hidden lg:flex' : 'flex w-full'}
              `}>
                 <EmailList 
                   emails={filteredEmails}
                   selectedEmailId={selectedEmailId}
                   onSelectEmail={handleEmailSelect}
                 />
              </div>

              {/* Desktop Detail View (Drawer) - Slides/Expands in */}
              <div className={`
                 hidden lg:flex flex-col h-full bg-white border-l border-gray-200 shadow-xl
                 transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] overflow-hidden
                 ${selectedEmailId ? 'flex-1 opacity-100 translate-x-0' : 'w-0 opacity-0 translate-x-20'}
              `}>
                 {/* Wrapper to prevent content squashing during width transition */}
                 <div className="h-full w-full min-w-[600px] flex flex-col">
                    <EmailDetail email={selectedEmail} />
                 </div>
              </div>
              
              {/* Mobile Overlay - Standard Stack Navigation */}
              {selectedEmailId && (
                <div className="lg:hidden fixed inset-0 z-50 bg-white flex flex-col animate-in slide-in-from-right duration-200">
                    <div className="flex-none">
                      <button 
                          onClick={() => setSelectedEmailId(null)}
                          className="w-full p-3 bg-gray-50 text-blue-600 font-medium border-b border-gray-200 flex items-center shadow-sm"
                      >
                          <span className="mr-1">←</span> 返回列表
                      </button>
                    </div>
                    <div className="flex-1 overflow-hidden">
                       <EmailDetail email={selectedEmail} />
                    </div>
                </div>
              )}
            </>
          )}
          
        </div>
      </main>
    </div>
  );
};

export default App;
// src/components/Sidebar.js
import { useState } from 'react';
import SubjectSelect from './sidebar/SubjectSelect';
import ChatHistory from './sidebar/ChatHistory';

export default function Sidebar({
  selectedCategory, setSelectedCategory,
  selectedSubject, setSelectedSubject,
  selectedChapter, setSelectedChapter,
  handleStartChat
}) {
  const [chatHistory, setChatHistory] = useState([]);

  const handleStartNewChat = () => {
    const newChatId = Date.now();
    const date = new Date().toLocaleDateString();
    const newThreadTitle = `${date} ${selectedSubject} ${selectedChapter}`;

    const newChat = {
      id: newChatId,
      title: newThreadTitle,
      subject: selectedSubject,
      chapter: selectedChapter,
      date
    };

    setChatHistory(prevHistory => [newChat, ...prevHistory]);

    handleStartChat();
  };

  return (
    <div className="sidebar">
      <h1 className="text-2xl mb-4">言えるかな？</h1>
      <SubjectSelect
        selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
        selectedSubject={selectedSubject} setSelectedSubject={setSelectedSubject}
        selectedChapter={selectedChapter} setSelectedChapter={setSelectedChapter}
      />
      <button
        className="w-full"
        onClick={handleStartNewChat}
      >
        Start
      </button>
      <div className="mt-4">
        <ChatHistory chatHistory={chatHistory} />
      </div>
    </div>
  );
}

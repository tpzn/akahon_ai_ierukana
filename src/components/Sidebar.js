import { useState } from 'react';
import SubjectSelect from './sidebar/SubjectSelect'; 
import ChatHistory from './sidebar/ChatHistory';

export default function Sidebar({
  selectedCategory, setSelectedCategory,
  selectedSubject, setSelectedSubject,
  selectedChapter, setSelectedChapter,
  handleStartChat
}) {
  const [chatHistory, setChatHistory] = useState([]); // 新規チャット履歴のステート

  const handleStartNewChat = () => {
    const newChatId = Date.now(); // 現在のタイムスタンプで新規チャットID生成
    const date = new Date().toLocaleDateString(); // 日付フォーマット
    const newThreadTitle = `${date} ${selectedSubject} ${selectedChapter}`;

    const newChat = {
      id: newChatId,
      title: newThreadTitle,
      subject: selectedSubject,
      chapter: selectedChapter,
      date
    };

    // 新規チャットを履歴に追加
    setChatHistory(prevHistory => [newChat, ...prevHistory]);

    // 新規チャットIDでチャットを開始
    handleStartChat(newChatId);
  };

  return (
    <div className="w-64 bg-green-600 p-4 flex flex-col">
      <h1 className="text-white text-2xl mb-4">言えるかな？</h1>
      <SubjectSelect
        selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
        selectedSubject={selectedSubject} setSelectedSubject={setSelectedSubject}
        selectedChapter={selectedChapter} setSelectedChapter={setSelectedChapter}
      />
      <button
        className="w-full bg-white text-green-600 hover:bg-gray-100 mt-4"
        onClick={handleStartNewChat}
      >
        Start
      </button>
      <ChatHistory chatHistory={chatHistory} />
    </div>
  );
}


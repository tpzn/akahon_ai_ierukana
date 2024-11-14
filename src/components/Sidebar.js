// src/components/Sidebar.js
import React, { useState } from 'react';
import { signOut } from '@aws-amplify/auth';
import SubjectSelect from './sidebar/SubjectSelect';
import { FiUser } from 'react-icons/fi'; // 人のアイコンをインポート

export default function Sidebar({
  selectedCategory, setSelectedCategory,
  selectedSubject, setSelectedSubject,
  selectedChapter, setSelectedChapter,
  selectedField, setSelectedField,
  handleStartChat,
  chatHistory,
  loadChatHistory,
  userName, // ユーザー名を Sidebar に渡す
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // メニューの表示状態を管理

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.reload();
    } catch (error) {
      console.error('ログアウトエラー:', error);
    }
  };

  return (
    <div className="sidebar resizable">
      <div className="header flex items-center mb-4 relative">
        {/* 人のアイコン（クリックでメニューをトグル） */}
        <FiUser 
          className="text-2xl cursor-pointer mr-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />

        {/* メニューのドロップダウン */}
        {isMenuOpen && (
          <div className="dropdown-menu">
            <p className="dropdown-item">{userName}</p> {/* ユーザー名 */}
            <button className="dropdown-item" onClick={handleLogout}>ログアウト</button>
            <button className="dropdown-item" onClick={() => window.location.href = '/'}>TOPへ</button>
          </div>
        )}
        
        <h1 className="text-2xl">言えるかな？</h1>
      </div>
      
      <SubjectSelect
        selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
        selectedSubject={selectedSubject} setSelectedSubject={setSelectedSubject}
        selectedChapter={selectedChapter} setSelectedChapter={setSelectedChapter}
        selectedField={selectedField} setSelectedField={setSelectedField}
      />
      <button
        className="sidebar-button w-full"
        onClick={handleStartChat}
      >
        Start
      </button>
      <div className="mt-4">
        <h2 className="text-lg mb-2">履歴</h2>
        <div className="chat-history-box">
          {chatHistory.map((chat) => (
            <div 
              key={chat.id} 
              className="chat-history-item cursor-pointer"
              onClick={() => loadChatHistory(chat.id)}
            >
              {chat.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

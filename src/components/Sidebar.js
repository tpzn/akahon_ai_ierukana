// src/components/Sidebar.js
import React, { useState, useRef } from 'react';
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
  const [sidebarWidth, setSidebarWidth] = useState(250); // サイドバーの初期幅を設定
  const sidebarRef = useRef();

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.reload();
    } catch (error) {
      console.error('ログアウトエラー:', error);
    }
  };

  // サイドバーのリサイズ処理
  const handleMouseDown = (e) => {
    e.preventDefault();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const newWidth = Math.min(Math.max(200, e.clientX), window.innerWidth / 2);
    setSidebarWidth(newWidth);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div 
      className="sidebar" 
      style={{ width: `${sidebarWidth}px` }} 
      ref={sidebarRef}
    >
      {/* リサイズハンドル */}
      <div 
        className="sidebar-resize-handle" 
        onMouseDown={handleMouseDown} 
      />

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

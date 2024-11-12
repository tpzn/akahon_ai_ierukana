// src/components/ChatUI.js
import { useState } from 'react';
import Sidebar from './Sidebar';
import MainChat from './MainChat';
import { sendMessageToAPI } from '../api';
import './ChatUI.css';

export default function ChatUI() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedField, setSelectedField] = useState('all'); // 分野の状態を ChatUI に統一
  const [chatId, setChatId] = useState(null);
  const [isChatActive, setIsChatActive] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const userMessage = { role: 'user', content: inputMessage };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputMessage('');

    try {
      const response = await sendMessageToAPI(inputMessage, chatId);
      const botMessage = { role: 'bot', content: response };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("API呼び出しエラー:", error);
      setMessages((prevMessages) => [...prevMessages, { role: 'bot', content: "エラーが発生しました。再度お試しください。" }]);
    }
  };

  const handleStartChat = async () => {
    if (!selectedCategory || !selectedSubject || !selectedChapter) {
      alert("カテゴリ、科目、章を全て選択してください。");
      return;
    }

    const newChatId = Date.now();
    setChatId(newChatId);
    setIsChatActive(true);

    // プレースホルダーメッセージを最初に表示
    const placeholderMessage = { role: 'bot', content: "今日も勉強がんばりましょう！質問を考えているから、少しお待ちくださいね。" };
    setMessages([placeholderMessage]);

    // `selectedField` を含む初回メッセージを生成
    const initialMessage = `カテゴリ：${selectedCategory}、科目：${selectedSubject}、章：${selectedChapter}` +
      (selectedField && selectedField !== 'all' ? `、分野：${selectedField}` : '') +
      "の重要語句を問いかけてください。";

    try {
      const response = await sendMessageToAPI(initialMessage, newChatId);
      const botMessage = { role: 'bot', content: response };

      // プレースホルダーを削除して API の応答メッセージを追加
      setMessages([botMessage]);
      updateChatHistory(newChatId, [botMessage]);
    } catch (error) {
      console.error("API呼び出しエラー:", error);
      setMessages([{ role: 'bot', content: "エラーが発生しました。もう一度お試しください。" }]);
    }
  };

  const updateChatHistory = (id, messages) => {
    const title = `${new Date().toLocaleDateString()} ${selectedSubject} ${selectedChapter}` +
      (selectedField !== 'all' ? ` (${selectedField})` : '');
    const newChat = { id, title, messages };
    setChatHistory((prevHistory) => [newChat, ...prevHistory]);
  };

  const loadChatHistory = (id) => {
    const chat = chatHistory.find((chat) => chat.id === id);
    if (chat) {
      setMessages(chat.messages);
      setChatId(chat.id);
      setIsChatActive(true);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
        selectedSubject={selectedSubject} setSelectedSubject={setSelectedSubject}
        selectedChapter={selectedChapter} setSelectedChapter={setSelectedChapter}
        selectedField={selectedField} setSelectedField={setSelectedField} // 分野の状態を Sidebar に渡す
        handleStartChat={handleStartChat}
        chatHistory={chatHistory}
        loadChatHistory={loadChatHistory}
      />
      <MainChat
        messages={messages}
        handleSendMessage={handleSendMessage}
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        isChatActive={isChatActive}
      />
    </div>
  );
}

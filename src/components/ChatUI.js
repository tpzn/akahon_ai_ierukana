// src/components/ChatUI.js
import { useState } from 'react';
import Sidebar from './Sidebar';
import MainChat from './MainChat';
import { sendMessageToAPI } from '../api';

export default function ChatUI() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [chatId, setChatId] = useState(null);  // 初期値をnullに設定

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const userMessage = { role: 'user', content: inputMessage };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputMessage('');

    try {
        console.log("Calling sendMessageToAPI with:", inputMessage);  // 呼び出し前の確認
        const response = await sendMessageToAPI(inputMessage, chatId);

        console.log("Response from sendMessageToAPI:", response);  // APIからの応答確認
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

    // 初回のチャットID生成
    if (!chatId) {
      const newChatId = Date.now();  // Date.now()で数値のchatIdを生成
      setChatId(newChatId);
    }

    const initialMessage = `カテゴリ：${selectedCategory}、科目：${selectedSubject}、章：${selectedChapter}の重要語句を問いかけてください。`;
    const userMessage = { role: 'user', content: initialMessage };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await sendMessageToAPI(initialMessage, chatId || Date.now());  // chatIdをAPIに渡す
      const botMessage = { role: 'bot', content: response };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("API呼び出しエラー:", error);
      setMessages((prevMessages) => [...prevMessages, { role: 'bot', content: "エラーが発生しました。もう一度お試しください。" }]);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
        selectedSubject={selectedSubject} setSelectedSubject={setSelectedSubject}
        selectedChapter={selectedChapter} setSelectedChapter={setSelectedChapter}
        handleStartChat={handleStartChat}
      />
      <MainChat
        messages={messages}
        handleSendMessage={handleSendMessage}
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
      />
    </div>
  );
}

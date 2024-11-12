// src/components/ChatUI.js
import { useState } from 'react';
import Sidebar from './Sidebar';
import MainChat from './MainChat';
import { sendMessageToAPI } from '../api';
import './ChatUI.css'; // CSSファイルをインポート

export default function ChatUI() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [chatId, setChatId] = useState(null);
  const [isChatActive, setIsChatActive] = useState(false);

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

    // 新しいチャットを開始するためにステートをリセット
    setMessages([]); // メッセージ履歴をリセット
    setChatId(Date.now()); // 新しいチャットIDを生成
    setIsChatActive(true); // チャットをアクティブに設定

    // プレースホルダーのメッセージを追加
    const placeholderMessage = { role: 'bot', content: "今日も一緒に勉強がんばりましょう！質問を考えているから、少しお待ちくださいね。" };
    setMessages([placeholderMessage]);

    const initialMessage = `カテゴリ：${selectedCategory}、科目：${selectedSubject}、章：${selectedChapter}の重要語句を問いかけてください。`;

    // 初期メッセージを送信（ユーザーには表示しない）
    try {
      const response = await sendMessageToAPI(initialMessage, Date.now());
      const botMessage = { role: 'bot', content: response };

      // プレースホルダーを削除してAPIからのレスポンスを追加
      setMessages((prevMessages) => [
        ...prevMessages.filter((message) => message !== placeholderMessage),
        botMessage,
      ]);
    } catch (error) {
      console.error("API呼び出しエラー:", error);
      setMessages((prevMessages) => [
        ...prevMessages.filter((message) => message !== placeholderMessage),
        { role: 'bot', content: "エラーが発生しました。もう一度お試しください。" }
      ]);
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
        isChatActive={isChatActive}
      />
    </div>
  );
}

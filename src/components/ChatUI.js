import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Send, User, Bot, Trash2, Plus, Edit3 } from 'lucide-react';
import { sendMessageToAPI } from '../api';
import ReactMarkdown from 'react-markdown';

export default function ChatUI() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [chatHistory, setChatHistory] = useState(() => {
    const savedHistory = JSON.parse(localStorage.getItem('chatThreads')) || [];
    return savedHistory;
  });
  const [currentChatId, setCurrentChatId] = useState(null); // 現在のスレッドID
  const [editingTitle, setEditingTitle] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    let updatedHistory = chatHistory;
    let chatIdToUse = currentChatId;

    if (!currentChatId) {
      chatIdToUse = Date.now();  // chatIdを数値として生成
      const newChat = {
        id: chatIdToUse,
        title: `新規チャット ${chatHistory.length + 1}`,
        messages: [],
      };
      updatedHistory = [newChat, ...chatHistory];
      setChatHistory(updatedHistory);
      setCurrentChatId(chatIdToUse);
      localStorage.setItem('chatThreads', JSON.stringify(updatedHistory));
    }

    const newUserMessage = { id: Date.now(), text: inputMessage, isUser: true };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInputMessage('');

    updatedHistory = updatedHistory.map((chat) =>
      chat.id === chatIdToUse ? { ...chat, messages: updatedMessages } : chat
    );
    setChatHistory(updatedHistory);
    localStorage.setItem('chatThreads', JSON.stringify(updatedHistory));

    const aiResponse = await sendMessageToAPI(inputMessage, chatIdToUse);

    const newBotMessage = { id: Date.now(), text: aiResponse, isUser: false };
    const updatedMessagesWithBot = [...updatedMessages, newBotMessage];
    setMessages(updatedMessagesWithBot);

    updatedHistory = updatedHistory.map((chat) =>
      chat.id === chatIdToUse ? { ...chat, messages: updatedMessagesWithBot } : chat
    );
    setChatHistory(updatedHistory);
    localStorage.setItem('chatThreads', JSON.stringify(updatedHistory));
  };

  const deleteThread = (id) => {
    const updatedHistory = chatHistory.filter((thread) => thread.id !== id);
    setChatHistory(updatedHistory);
    if (currentChatId === id) {
      setCurrentChatId(null);
      setMessages([]);
    }
    localStorage.setItem('chatThreads', JSON.stringify(updatedHistory));
  };

  const startNewChat = () => {
    const newChatId = Date.now();
    const newChat = {
      id: newChatId,
      title: `新規チャット ${chatHistory.length + 1}`,
      messages: [],
    };
    const updatedHistory = [newChat, ...chatHistory];
    setChatHistory(updatedHistory);
    setCurrentChatId(newChatId);
    setMessages([]);
    localStorage.setItem('chatThreads', JSON.stringify(updatedHistory));
  };

  const selectChat = (id) => {
    setCurrentChatId(id);
    const selectedChat = chatHistory.find((chat) => chat.id === id);
    setMessages(selectedChat ? selectedChat.messages : []);
  };

  const renameThread = (id) => {
    const updatedHistory = chatHistory.map((chat) =>
      chat.id === id ? { ...chat, title: newTitle } : chat
    );
    setChatHistory(updatedHistory);
    setEditingTitle(null);
    setNewTitle('');
    localStorage.setItem('chatThreads', JSON.stringify(updatedHistory));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className={`bg-gray-800 text-white transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-16'}`}>
        <button onClick={toggleSidebar} className="p-4 w-full flex justify-center items-center hover:bg-gray-700">
          {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
        </button>
        {isSidebarOpen && (
          <>
            <button onClick={startNewChat} className="w-full p-4 text-left hover:bg-gray-700 flex items-center">
              <Plus className="mr-2" /> 新規チャット
            </button>
            <div className="p-4">
              <h2 className="font-bold mb-2">履歴</h2>
              <ul>
                {chatHistory.map((thread) => (
                  <li
                    key={thread.id}
                    className={`mb-2 flex items-center justify-between p-2 rounded ${thread.id === currentChatId ? 'bg-gray-600' : 'hover:bg-gray-700'}`}
                  >
                    {editingTitle === thread.id ? (
                      <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && renameThread(thread.id)} className="w-full p-1 bg-gray-600 text-white rounded" />
                    ) : (
                      <button onClick={() => selectChat(thread.id)} className="text-left flex-grow">
                        {thread.title}
                      </button>
                    )}
                    <div className="flex space-x-2">
                      <button onClick={() => setEditingTitle(thread.id)} className="text-blue-500 hover:text-blue-700">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteThread(thread.id)} className="text-red-500 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              メッセージを入力して会話を開始してください。
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start space-x-2 max-w-[70%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`rounded-full p-2 ${message.isUser ? 'bg-blue-500' : 'bg-gray-300'}`}>
                    {message.isUser ? <User className="w-6 h-6 text-white" /> : <Bot className="w-6 h-6 text-gray-600" />}
                  </div>
                  <div className={`p-3 rounded-lg ${message.isUser ? 'bg-blue-100' : 'bg-white'}`}>
                    {message.isUser ? (
                      <div>{message.text}</div>
                    ) : (
                      <ReactMarkdown>{message.text}</ReactMarkdown>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 bg-white border-t">
          <div className="flex space-x-2">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="メッセージを入力（Shift + Enterで改行）"
              rows={3}
              className="flex-1 p-2 border rounded-lg"
            />
            <button onClick={handleSendMessage} className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
              <Send className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

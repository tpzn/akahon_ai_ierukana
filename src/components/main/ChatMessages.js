// src/components/main/ChatMessages.js
import { useState, useEffect } from 'react';
import { Bot, User } from 'lucide-react';

export default function ChatMessages({ messages }) {
  const [loading, setLoading] = useState(false);
  const [showLoadingDots, setShowLoadingDots] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  // メッセージ送信後のタイミングでローディングアニメーションを表示
  useEffect(() => {
    if (messages[messages.length - 1]?.role === 'user') {
      setLoading(true);
      setShowLoadingDots(false);
      setLoadingMessage(''); // 初期化

      // 0.3秒後に「...」を表示
      const loadingDotsTimeout = setTimeout(() => {
        setShowLoadingDots(true);
        setLoadingMessage('...');
      }, 300);

      // 3秒後に「ただいま回答を生成しています...」に変更
      const loadingMessageTimeout = setTimeout(() => {
        setLoadingMessage('ただいま回答を生成しています...');
      }, 3300);

      // クリーンアップ関数
      return () => {
        clearTimeout(loadingDotsTimeout);
        clearTimeout(loadingMessageTimeout);
      };
    } else if (messages[messages.length - 1]?.role === 'bot') {
      setLoading(false); // botからのレスポンスでローディングを終了
    }
  }, [messages]);

  // JSONレスポンスの整形関数
  const formatResponse = (response) => {
    try {
      if (typeof response !== 'string') {
        response = JSON.stringify(response);
      }
      const parsed = JSON.parse(response);
      if (parsed.body && typeof parsed.body === 'string') {
        const innerParsed = JSON.parse(parsed.body);
        return innerParsed.response || JSON.stringify(innerParsed, null, 2);
      }
      return parsed.response || JSON.stringify(parsed, null, 2);
    } catch (error) {
      return String(response);
    }
  };

  return (
    <div className="flex-1 bg-white rounded-lg shadow-md p-4 overflow-y-auto mb-4">
      {messages.map((message, index) => {
        const formattedMessage = formatResponse(message.content);
        return (
          <div key={index} className={`flex mb-4 items-start ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.role === 'bot' && (
              <Bot className="w-10 h-10 mr-2 flex-shrink-0 text-green-600" />
            )}
            <div className={`p-2 rounded-lg ${message.role === 'user' ? 'bg-green-100 max-w-[50%]' : 'bg-gray-100 max-w-full'}`}>
              <div className={`text-left ${message.role === 'user' ? 'pr-2' : ''}`}>
                {typeof formattedMessage === 'string' ? (
                  formattedMessage.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))
                ) : (
                  <p>{formattedMessage}</p>
                )}
              </div>
            </div>
            {message.role === 'user' && (
              <User className="w-10 h-10 ml-2 flex-shrink-0 text-blue-600" />
            )}
          </div>
        );
      })}

      {loading && (
        <div className="flex items-start">
          <Bot className="w-10 h-10 mr-2 flex-shrink-0 text-green-600" />
          <p className="text-gray-500 text-sm">
            {showLoadingDots && (
              <span className="animate-dots">{loadingMessage}</span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}


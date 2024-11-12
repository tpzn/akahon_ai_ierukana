// src/components/MainChat.js
import ChatMessages from './main/ChatMessages';

export default function MainChat({ messages, handleSendMessage, inputMessage, setInputMessage }) {

  // Enterキーで送信するためのハンドラ
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Enterでの改行を防止
      handleSendMessage(); // メッセージ送信
    }
  };

  return (
    <div className="flex-1 p-4 flex flex-col">
      <ChatMessages messages={messages} />
      <div className="flex mt-4">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}  // Enterキー押下の検出
          className="flex-1 border rounded-l-lg p-2"
          placeholder="メッセージを入力（Shift + Enterで改行）"
        />
        <button onClick={handleSendMessage} className="bg-blue-500 text-white rounded-r-lg p-2">Send</button>
      </div>
    </div>
  );
}

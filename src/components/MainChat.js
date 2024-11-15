// src/components/MainChat.js
import ChatMessages from './main/ChatMessages';

export default function MainChat({
  messages, handleSendMessage, inputMessage, setInputMessage, isChatActive
}) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="main-chat">
      <ChatMessages messages={messages} />
      <div className="flex mt-4">
        <textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 border rounded-l-lg p-2 resize-none"  // textareaではresizeを無効化
          placeholder="メッセージを入力（Shift + Enterで改行）"
          disabled={!isChatActive}
          rows="3"  // デフォルトの行数を設定
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white rounded-r-lg p-2"
          disabled={!isChatActive}
        >
          Send
        </button>
      </div>
    </div>
  );
}

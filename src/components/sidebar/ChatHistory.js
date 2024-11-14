// src/components/sidebar/ChatHistory.js
export default function ChatHistory({ chatHistory }) {
  return (
    <div className="mt-4">
      <h2 className="text-white text-lg">履歴</h2>
      <ul className="mt-2">
        {chatHistory.map((chat) => (
          <li key={chat.id} className="text-white mb-1">
            {chat.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

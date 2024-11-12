// src/components/Sidebar.js
import SubjectSelect from './sidebar/SubjectSelect';

export default function Sidebar({
  selectedCategory, setSelectedCategory,
  selectedSubject, setSelectedSubject,
  selectedChapter, setSelectedChapter,
  selectedField, setSelectedField, // 分野の状態を Sidebar に渡す
  handleStartChat,
  chatHistory,
  loadChatHistory
}) {
  return (
    <div className="sidebar">
      <h1 className="text-2xl mb-4">言えるかな？</h1>
      <SubjectSelect
        selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
        selectedSubject={selectedSubject} setSelectedSubject={setSelectedSubject}
        selectedChapter={selectedChapter} setSelectedChapter={setSelectedChapter}
        selectedField={selectedField} setSelectedField={setSelectedField} // 分野の状態を SubjectSelect に渡す
      />
      <button
        className="sidebar-button w-full"
        onClick={handleStartChat}
      >
        Start
      </button>
      <div className="mt-4">
        <h2 className="text-lg mb-2">履歴</h2>
        {/* スクロール可能な履歴ボックス */}
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

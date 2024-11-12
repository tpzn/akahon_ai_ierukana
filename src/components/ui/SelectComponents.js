// src/ui/SelectComponents.js
import React from 'react';

export const Select = ({ children }) => <div className="relative">{children}</div>;

export const SelectTrigger = ({ children, onClick }) => (
  <button 
    onClick={onClick} 
    className="w-full bg-[#546E7A] text-white border-none rounded p-2 text-left"
    style={{
      backgroundColor: '#546E7A', // ダークグレー
      color: '#FFFFFF', // 白い文字
    }}
  >
    {children}
  </button>
);

export const SelectContent = ({ isOpen, children }) => (
  isOpen ? (
    <div 
      className="absolute z-10 bg-white border rounded shadow-lg mt-1 w-full"
      style={{
        backgroundColor: '#FFFFFF', // ドロップダウンの白い背景
        color: '#000000', // 黒い文字
      }}
    >
      {children}
    </div>
  ) : null
);

export const SelectItem = ({ children, onClick }) => (
  <div 
    onClick={onClick} 
    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
    style={{
      backgroundColor: '#FFFFFF', // オプションリストの白い背景
      color: '#000000', // 黒い文字
    }}
  >
    {children}
  </div>
);

export const SelectValue = ({ placeholder }) => <span>{placeholder}</span>;

// 各カテゴリごとに選択肢をまとめた関数
export const subjects = {
  専門: [
    "病態学/臨床検査医学", "病理検査学", "血液検査学", "臨床化学検査学", "放射性同位元素検査技術学",
    "医動物学", "一般検査学", "遺伝子関連・染色体検査学", "臨床微生物学", "免疫検査学", 
    "輸血・移植検査学", "医療安全管理学", "生理機能検査学", "臨床検査総合管理学", 
    "検査機器総論", "関係法規"
  ],
  "基礎・専門基礎": [
    "化学", "物理学", "生物学", "数学/統計学", "解剖学", "生理学", 
    "生化学", "病理学", "保健医療福祉概論", "公衆衛生学", "医用工学概論", 
    "情報科学", "チーム医療論(栄養学/薬理学/認知症)"
  ]
};

export const chapters = {
  専門: [
    { value: "3. 止血機構", label: "3. 止血機構" }
  ],
  "基礎・専門基礎": [
    { value: "4. 化学式", label: "4. 化学式" }
  ]
};

// 各カテゴリと科目に基づき選択肢を取得する関数
export const getSubjectsByCategory = (category) => {
  return subjects[category] || [];
};

export const getChaptersBySubject = (category) => {
  return chapters[category] || [];
};

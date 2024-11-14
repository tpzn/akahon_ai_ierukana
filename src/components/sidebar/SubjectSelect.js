// src/components/sidebar/SubjectSelect.js
import React, { useState, useEffect } from 'react';

const SubjectSelect = ({ 
  selectedCategory, setSelectedCategory, 
  selectedSubject, setSelectedSubject, 
  selectedChapter, setSelectedChapter, 
  selectedField, setSelectedField 
}) => {
  const [data, setData] = useState({ categories: [] });
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [isSubjectOpen, setSubjectOpen] = useState(false);
  const [isChapterOpen, setChapterOpen] = useState(false);
  const [isFieldOpen, setFieldOpen] = useState(false);

  useEffect(() => {
    // JSON ファイルを読み込み
    fetch('/subjects.json')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("データの読み込みに失敗しました:", error));
  }, []);

  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName);
    setSelectedSubject('');
    setSelectedChapter('');
    setSelectedField('all'); // カテゴリ変更時に分野をリセット
  };

  const handleSubjectChange = (subjectName) => {
    setSelectedSubject(subjectName);
    setSelectedChapter('');
    setSelectedField('all'); // 科目変更時に分野をリセット
  };

  const handleChapterChange = (chapterName) => {
    setSelectedChapter(chapterName);
    setSelectedField('all'); // 章変更時に分野をリセット
  };

  // 選択されたカテゴリに基づき、対応する科目リストを取得
  const subjects = data.categories.find((cat) => cat.name === selectedCategory)?.subjects || [];
  const chapters = subjects.find((subj) => subj.name === selectedSubject)?.chapters || [];
  const fields = chapters.find((chap) => chap.name === selectedChapter)?.fields || [];

  return (
    <div>
      <div>
        <label className="text-white">専門/専門基礎</label>
        <div>
          <button className="sidebar-select-trigger" onClick={() => setCategoryOpen(!isCategoryOpen)}>
            {selectedCategory || "選択してください"}
          </button>
          {isCategoryOpen && (
            <div className="select-content">
              {data.categories.map((category) => (
                <div 
                  key={category.name} 
                  className="select-option" 
                  onClick={() => { handleCategoryChange(category.name); setCategoryOpen(false); }}
                >
                  {category.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="text-white">科目</label>
        <div>
          <button className="sidebar-select-trigger" onClick={() => setSubjectOpen(!isSubjectOpen)}>
            {selectedSubject || (selectedCategory ? "科目を選択" : "カテゴリを選択してください")}
          </button>
          {isSubjectOpen && (
            <div className="select-content">
              {subjects.map((subject) => (
                <div 
                  key={subject.name} 
                  className="select-option" 
                  onClick={() => { handleSubjectChange(subject.name); setSubjectOpen(false); }}
                >
                  {subject.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="text-white">章</label>
        <div>
          <button className="sidebar-select-trigger" onClick={() => setChapterOpen(!isChapterOpen)}>
            {selectedChapter || "章を選択"}
          </button>
          {isChapterOpen && (
            <div className="select-content">
              {chapters.map((chapter, index) => (
                <div 
                  key={index} 
                  className="select-option" 
                  onClick={() => { handleChapterChange(chapter.name); setChapterOpen(false); }}
                >
                  {chapter.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="text-white">分野</label>
        <div>
          <button className="sidebar-select-trigger" onClick={() => setFieldOpen(!isFieldOpen)}>
            {selectedField || "分野を選択"}
          </button>
          {isFieldOpen && (
            <div className="select-content">
              {fields.map((field, index) => (
                <div 
                  key={index} 
                  className="select-option" 
                  onClick={() => { setSelectedField(field); setFieldOpen(false); }}
                >
                  {field}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectSelect;

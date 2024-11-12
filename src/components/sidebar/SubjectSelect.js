// src/components/sidebar/SubjectSelect.js
import React, { useState } from 'react';
import { 
  Select, 
  SelectTrigger, 
  SelectContent, 
  SelectItem, 
  SelectValue,
  getSubjectsByCategory,
  getChaptersBySubject,
 } from '../ui/SelectComponents';

const SubjectSelect = ({ selectedCategory, setSelectedCategory, selectedSubject, setSelectedSubject, selectedChapter, setSelectedChapter }) => {
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [isSubjectOpen, setSubjectOpen] = useState(false);
  const [isChapterOpen, setChapterOpen] = useState(false);

  return (
    <div>
      <div>
        <label className="text-white">専門/専門基礎</label>
        <Select>
          <SelectTrigger onClick={() => setCategoryOpen(!isCategoryOpen)}>
            <SelectValue placeholder={selectedCategory || "選択してください"} />
          </SelectTrigger>
          <SelectContent isOpen={isCategoryOpen}>
            <SelectItem onClick={() => { setSelectedCategory("専門"); setCategoryOpen(false); }}>専門</SelectItem>
            <SelectItem onClick={() => { setSelectedCategory("基礎・専門基礎"); setCategoryOpen(false); }}>基礎・専門基礎</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-white">科目</label>
        <Select>
          <SelectTrigger onClick={() => setSubjectOpen(!isSubjectOpen)}>
            <SelectValue placeholder={selectedSubject || (selectedCategory ? "科目を選択" : "専門/専門基礎を選択してください")} />
          </SelectTrigger>
          <SelectContent isOpen={isSubjectOpen}>
            {selectedCategory && getSubjectsByCategory(selectedCategory).map((subject) => (
              <SelectItem key={subject} onClick={() => { setSelectedSubject(subject); setSubjectOpen(false); }}>
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-white">章</label>
        <Select>
          <SelectTrigger onClick={() => setChapterOpen(!isChapterOpen)}>
            <SelectValue placeholder={selectedChapter || "章を選択"} />
          </SelectTrigger>
          <SelectContent isOpen={isChapterOpen}>
            {selectedSubject && getChaptersBySubject(selectedCategory).map((chapter) => (
              <SelectItem key={chapter.value} onClick={() => { setSelectedChapter(chapter.value); setChapterOpen(false); }}>
                {chapter.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SubjectSelect;

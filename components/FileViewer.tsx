import React, { useState } from 'react';
import { GeneratedFile } from '../types';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface FileViewerProps {
  file: GeneratedFile;
  isDark: boolean;
}

export const FileViewer: React.FC<FileViewerProps> = ({ file, isDark }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className={`rounded-lg border overflow-hidden flex flex-col ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full px-3 py-2 border-b text-xs font-medium flex justify-between items-center transition-colors ${
          isDark 
            ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800' 
            : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100'
        } ${!isExpanded ? 'border-b-0' : ''}`}
      >
        <div className="flex items-center gap-2">
           {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
           <span>{file.fileName}</span>
        </div>
        <span className="opacity-50 text-[10px] uppercase">{file.language}</span>
      </button>
      
      {isExpanded && (
        <pre className={`p-3 text-[11px] font-mono leading-relaxed overflow-x-auto ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          {file.content}
        </pre>
      )}
    </div>
  );
};
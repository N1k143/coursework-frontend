import React, { useState, useEffect } from 'react';
import { 
  Circle, 
  CheckCircle, 
  Play, 
  ChevronDown, 
  ChevronRight,
  ClipboardList
} from 'lucide-react';

export default function CourseNavigation({
  course,
  sections,
  lessonsBySection,
  currentLessonId,
  onLessonSelect,
  courseProgress = { status: 'not_started' },
  onOpenQuizzes
}) {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  useEffect(() => {
    if (currentLessonId) {
      Object.entries(lessonsBySection).forEach(([sectionId, lessons]) => {
        if (lessons.some(lesson => lesson.id === currentLessonId)) {
          setExpandedSections(prev => ({
            ...prev,
            [sectionId]: true
          }));
        }
      });
    }
  }, [currentLessonId, lessonsBySection]);

  const progressStatus = courseProgress?.status || 'not_started';

  return (
    <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-6 sticky top-32 max-h-[calc(100vh-8rem)] overflow-hidden flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span className="text-slate-500 font-mono text-sm">course_nav</span>
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        <div className="space-y-4">
          {sections.map((section) => {
            const isExpanded = expandedSections[section.id] !== false;
            const sectionLessons = lessonsBySection[section.id] || [];

            return (
              <div key={section.id} className="border-l-2 border-emerald-500/30 pl-4">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full text-left mb-2 hover:opacity-80 transition-opacity"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-emerald-500 font-mono text-sm">
                      {section.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">
                        {sectionLessons.length} уроков
                      </span>
                      {isExpanded ? (
                        <ChevronDown className="w-3 h-3 text-emerald-500" />
                      ) : (
                        <ChevronRight className="w-3 h-3 text-emerald-500" />
                      )}
                    </div>
                  </div>
                </button>

                {isExpanded && sectionLessons.length > 0 && (
                  <div className="space-y-1 ml-2">
                    {sectionLessons.map((lesson) => {
                      const lessonProgress = courseProgress[lesson.id];
                      const isCompleted = lessonProgress?.status === 'completed';
                      const isCurrent = currentLessonId === lesson.id;

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => onLessonSelect(section.id, lesson.id)}
                          className={`w-full text-left p-2 rounded-lg font-mono text-xs transition-all duration-200 ${
                            isCurrent
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                              : isCompleted
                              ? 'bg-slate-800/50 text-slate-300 hover:bg-slate-700'
                              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {isCompleted ? (
                              <CheckCircle className="w-3 h-3 text-green-500" />
                            ) : isCurrent ? (
                              <Play className="w-3 h-3 text-emerald-400 animate-pulse" />
                            ) : (
                              <Circle className="w-3 h-3 text-slate-500" />
                            )}
                            <span className="flex-1 truncate text-left">{lesson.title}</span>
                            {lesson.duration && (
                              <span className="text-slate-500 text-xs shrink-0">
                                {lesson.duration}
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {onOpenQuizzes && (
        <div className="mt-4 pt-4 border-t border-slate-800/30">
          <button
            onClick={onOpenQuizzes}
            className="w-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg p-3 transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            <ClipboardList className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="text-emerald-400 font-mono text-sm">Тесты курса</span>
          </button>
        </div>
      )}

      <div className="mt-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-slate-400 font-mono">Статус курса</span>
          <span className={`text-sm font-mono ${
            progressStatus === 'completed' ? 'text-green-500' :
            progressStatus === 'in_progress' ? 'text-cyan-500' :
            'text-slate-500'
          }`}>
            {progressStatus === 'completed' ? 'COMPLETED' :
             progressStatus === 'in_progress' ? 'IN PROGRESS' :
             'NOT STARTED'}
          </span>
        </div>

        <div className="w-full bg-slate-800 rounded-full h-1 overflow-hidden">
          <div 
            className={`h-1 rounded-full transition-all duration-1000 ease-out ${
              progressStatus === 'completed' 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                : progressStatus === 'in_progress'
                ? 'bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500' 
                : 'bg-gradient-to-r from-slate-600 to-slate-500'
            }`}
            style={{ 
              width: progressStatus === 'completed' ? '100%' : 
                     progressStatus === 'in_progress' ? '50%' : '0%' 
            }}
          ></div>
        </div>
        <div className="flex justify-between text-[10px] text-slate-600 font-mono mt-1">
          <span>NOT STARTED</span>
          <span>IN PROGRESS</span>
          <span>COMPLETED</span>
        </div>
      </div>
    </div>
  );
}
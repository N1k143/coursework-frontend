import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
// light-weight highlight.js core + explicit languages
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import python from 'highlight.js/lib/languages/python';
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';
import css from 'highlight.js/lib/languages/css';
import html from 'highlight.js/lib/languages/xml'; 

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('json', json);
hljs.registerLanguage('css', css);
hljs.registerLanguage('html', html);

const MarkdownRenderer = ({ children }) => {
  return (
    <div className="w-full overflow-hidden">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeHighlight, { detect: false }]]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            if (!inline && match) {
              return (
                <div className="relative my-2 xs:my-3 sm:my-4 w-full overflow-hidden">
                  <div className="absolute top-0 right-0 px-1.5 py-0.5 xs:px-2 xs:py-1 text-[9px] xs:text-[10px] sm:text-xs text-slate-400 bg-slate-800 rounded-bl z-10">
                    {match[1]}
                  </div>
                  <div className="overflow-x-auto w-full">
                    <pre className="bg-slate-800 rounded-lg p-2 xs:p-2.5 sm:p-3 md:p-4 w-full">
                      <code className={`${className} text-[9px] xs:text-[10px] sm:text-xs md:text-sm block whitespace-pre`} style={{minWidth: 'max-content'}} {...props}>
                        {children}
                      </code>
                    </pre>
                  </div>
                </div>
              );
            }
            return (
              <code className="bg-slate-800 text-emerald-400 px-1 py-0.5 rounded text-[9px] xs:text-[10px] sm:text-xs break-all inline-block max-w-full" {...props}>
                {children}
              </code>
            );
          },
          h1: ({node, ...props}) => <h1 className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-emerald-400 mt-3 xs:mt-4 sm:mt-5 md:mt-6 mb-2 xs:mb-2.5 sm:mb-3 md:mb-4 border-b border-emerald-500/30 pb-1.5 xs:pb-2 break-words" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-bold text-emerald-300 mt-2.5 xs:mt-3 sm:mt-4 md:mt-5 mb-1.5 xs:mb-2 sm:mb-3 break-words" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-[11px] xs:text-xs sm:text-sm md:text-base lg:text-lg font-bold text-emerald-200 mt-2 xs:mt-2.5 sm:mt-3 md:mt-4 mb-1.5 xs:mb-2 break-words" {...props} />,
          h4: ({node, ...props}) => <h4 className="text-[10px] xs:text-xs sm:text-sm md:text-base font-bold text-emerald-100 mt-2 xs:mt-2.5 sm:mt-3 mb-1.5 xs:mb-2 break-words" {...props} />,
          p: ({node, ...props}) => <p className="text-slate-300 text-[10px] xs:text-[11px] sm:text-xs md:text-sm lg:text-base leading-relaxed mb-2 xs:mb-2.5 sm:mb-3 md:mb-4 break-words" {...props} />,
          ul: ({node, ...props}) => <ul className="text-slate-300 text-[10px] xs:text-[11px] sm:text-xs md:text-sm lg:text-base mb-2 xs:mb-2.5 sm:mb-3 md:mb-4 ml-3 xs:ml-4 sm:ml-5 md:ml-6 list-disc space-y-0.5 xs:space-y-1 pl-1 xs:pl-1.5 sm:pl-2" {...props} />,
          ol: ({node, ...props}) => <ol className="text-slate-300 text-[10px] xs:text-[11px] sm:text-xs md:text-sm lg:text-base mb-2 xs:mb-2.5 sm:mb-3 md:mb-4 ml-3 xs:ml-4 sm:ml-5 md:ml-6 list-decimal space-y-0.5 xs:space-y-1 pl-1 xs:pl-1.5 sm:pl-2" {...props} />,
          li: ({node, ...props}) => <li className="break-words leading-relaxed" {...props} />,
          table: ({node, ...props}) => (
            <div className="w-full overflow-x-auto my-2 xs:my-3 sm:my-4 md:my-6">
              <table className="border-collapse border border-slate-700 text-[9px] xs:text-[10px] sm:text-xs md:text-sm min-w-full" style={{tableLayout: 'auto'}} {...props} />
            </div>
          ),
          th: ({node, ...props}) => (
            <th className="border border-slate-700 px-1 xs:px-1.5 sm:px-2 md:px-3 lg:px-4 py-0.5 xs:py-1 sm:py-1.5 md:py-2 text-left bg-slate-800 text-emerald-300 font-mono text-[9px] xs:text-[10px] sm:text-xs md:text-sm whitespace-normal" {...props} />
          ),
          td: ({node, ...props}) => (
            <td className="border border-slate-700 px-1 xs:px-1.5 sm:px-2 md:px-3 lg:px-4 py-0.5 xs:py-1 sm:py-1.5 md:py-2 text-slate-300 text-[9px] xs:text-[10px] sm:text-xs md:text-sm break-words whitespace-normal" {...props} />
          ),
          blockquote: ({node, ...props}) => (
            <blockquote className="border-l-2 xs:border-l-3 sm:border-l-4 border-emerald-500 pl-2 xs:pl-2.5 sm:pl-3 md:pl-4 my-2 xs:my-2.5 sm:my-3 md:my-4 italic text-slate-400 bg-slate-800/50 py-1 xs:py-1.5 sm:py-2 text-[10px] xs:text-[11px] sm:text-xs md:text-sm lg:text-base break-words" {...props} />
          ),
          a: ({node, ...props}) => <a className="text-emerald-400 hover:text-emerald-300 underline break-all text-[10px] xs:text-[11px] sm:text-xs md:text-sm lg:text-base" target="_blank" rel="noopener noreferrer" {...props} />,
          hr: ({node, ...props}) => <hr className="border-slate-700 my-2 xs:my-3 sm:my-4 md:my-6" {...props} />,
          strong: ({node, ...props}) => <strong className="font-bold text-emerald-300" {...props} />,
          em: ({node, ...props}) => <em className="italic text-slate-300" {...props} />
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};

export default React.memo(MarkdownRenderer);
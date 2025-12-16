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
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}

      rehypePlugins={[[rehypeHighlight, { detect: false }]]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          if (!inline && match) {
            return (
              <div className="relative">
                <div className="absolute top-0 right-0 px-2 py-1 text-xs text-slate-400 bg-slate-800 rounded-bl">
                  {match[1]}
                </div>
                <pre className="bg-slate-800 rounded-lg p-4 overflow-x-auto mt-6">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              </div>
            );
          }
          return (
            <code className="bg-slate-800 text-emerald-400 px-1.5 py-0.5 rounded text-sm" {...props}>
              {children}
            </code>
          );
        },
        h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-emerald-400 mt-6 mb-4 border-b border-emerald-500/30 pb-2" {...props} />,
        h2: ({node, ...props}) => <h2 className="text-xl font-bold text-emerald-300 mt-5 mb-3" {...props} />,
        h3: ({node, ...props}) => <h3 className="text-lg font-bold text-emerald-200 mt-4 mb-2" {...props} />,
        p: ({node, ...props}) => <p className="text-slate-300 leading-relaxed mb-4" {...props} />,
        ul: ({node, ...props}) => <ul className="text-slate-300 mb-4 ml-4 list-disc space-y-1" {...props} />,
        ol: ({node, ...props}) => <ol className="text-slate-300 mb-4 ml-4 list-decimal space-y-1" {...props} />,
        table: ({node, ...props}) => (
          <div className="overflow-x-auto my-6">
            <table className="min-w-full border-collapse border border-slate-700" {...props} />
          </div>
        ),
        th: ({node, ...props}) => (
          <th className="border border-slate-700 px-4 py-2 text-left bg-slate-800 text-emerald-300 font-mono" {...props} />
        ),
        td: ({node, ...props}) => (
          <td className="border border-slate-700 px-4 py-2 text-slate-300" {...props} />
        ),
        blockquote: ({node, ...props}) => (
          <blockquote className="border-l-4 border-emerald-500 pl-4 my-4 italic text-slate-400 bg-slate-800/50 py-2" {...props} />
        ),
        a: ({node, ...props}) => <a className="text-emerald-400 hover:text-emerald-300 underline" target="_blank" rel="noopener noreferrer" {...props} />
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export default React.memo(MarkdownRenderer);

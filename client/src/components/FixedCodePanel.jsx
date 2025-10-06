import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  prism,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check, Code } from "lucide-react";

function extractCodeBlock(text) {
  const match = text.match(/```(\w+)?\n([\s\S]*?)```/);
  if (match) {
    return { lang: match[1] || "javascript", code: match[2].trim() };
  }
  return { lang: "javascript", code: text };
}

export default function FixedCodePanel({ fixedCode, loading, darkMode }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!fixedCode) return;

    const codeBlock = extractCodeBlock(fixedCode);
    await navigator.clipboard.writeText(codeBlock.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div
        className={`h-full min-h-[300px] p-3 sm:p-4 md:p-6 flex flex-col items-center justify-center rounded-xl sm:rounded-2xl transition-colors duration-300 border ${
          darkMode
            ? "bg-gray-800/50 backdrop-blur-xl border-gray-700"
            : "bg-white/90 backdrop-blur-sm border-gray-200 shadow-xl"
        }`}
      >
        <div className="animate-spin w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-3 sm:border-4 border-emerald-400 border-t-transparent rounded-full"></div>
        <p
          className={`mt-3 sm:mt-4 animate-pulse transition-colors duration-300 text-sm sm:text-base text-center px-2 sm:px-4 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Fixing your code...
        </p>
      </div>
    );
  }

  if (!fixedCode) {
    return (
      <div
        className={`h-full min-h-[300px] p-3 sm:p-4 md:p-6 flex flex-col items-center justify-center text-center rounded-xl sm:rounded-2xl transition-colors duration-300 border-2 ${
          darkMode
            ? "bg-gray-800/50 backdrop-blur-xl border-gray-700"
            : "bg-white/90 backdrop-blur-sm border-gray-500 shadow-xl"
        }`}
      >
        <Code
          size={
            window.innerWidth < 480 ? 32 : window.innerWidth < 640 ? 40 : 48
          }
          className={`mb-3 sm:mb-4 animate-float transition-colors duration-300 ${
            darkMode ? "text-gray-500" : "text-gray-400"
          }`}
        />
        <h3
          className={`text-base sm:text-lg md:text-xl font-semibold mb-2 transition-colors duration-300 px-2 sm:px-4 ${
            darkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          No Fixed Code Yet
        </h3>
        <p
          className={`transition-colors duration-300 text-xs sm:text-sm md:text-base px-2 sm:px-4 max-w-xs sm:max-w-none ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Click "Fix Code" to get an improved version of your code
        </p>
      </div>
    );
  }

  const codeBlock = extractCodeBlock(fixedCode);

  return (
    <div
      className={`h-full flex flex-col shadow-xl rounded-xl sm:rounded-2xl overflow-hidden transition-colors duration-300 border ${
        darkMode
          ? "bg-gray-800/50 backdrop-blur-xl border-gray-700"
          : "bg-white/90 backdrop-blur-sm border-gray-200 shadow-2xl"
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between p-3 sm:p-4 border-b flex-shrink-0 transition-colors duration-300 ${
          darkMode
            ? "border-gray-700 bg-gray-800/30"
            : "border-gray-200 bg-gray-50/50"
        }`}
      >
        <h2
          className={`text-lg sm:text-xl font-bold flex items-center gap-2 transition-colors duration-300 truncate flex-1 min-w-0 ${
            darkMode ? "text-gray-100" : "text-gray-800"
          }`}
        >
          <Code
            size={window.innerWidth < 640 ? 18 : 20}
            className="flex-shrink-0"
          />
          <span className="truncate">Fixed Code</span>
        </h2>

        {/* Action buttons - Responsive layout */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          {/* Copy button */}
          <button
            onClick={handleCopy}
            className={`p-2 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-sm hover:shadow-md"
            }`}
            title="Copy to clipboard"
          >
            {copied ? (
              <Check size={14} className="text-green-500 sm:w-4 sm:h-4" />
            ) : (
              <Copy size={14} className="sm:w-4 sm:h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Code Display */}
      <div className="flex-1 overflow-hidden min-h-0">
        <div className="h-full overflow-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-500 scrollbar-track-gray-100 dark:scrollbar-track-gray-700 hover:scrollbar-thumb-gray-500 dark:hover:scrollbar-thumb-gray-400">
          <SyntaxHighlighter
            language={codeBlock.lang}
            style={darkMode ? vscDarkPlus : prism}
            customStyle={{
              margin: 0,
              background: "transparent",
              fontSize: window.innerWidth < 640 ? "12px" : "14px",
              fontFamily:
                'Fira Code, Monaco, Consolas, "Courier New", monospace',
              padding: window.innerWidth < 640 ? "0.75rem" : "1rem",
              lineHeight: window.innerWidth < 640 ? "1.4" : "1.5",
              minHeight: "100%",
              minWidth: "max-content", 
              whiteSpace: "pre", // Preserves formatting and enables horizontal scroll
              overflow: "visible", 
            }}
            showLineNumbers={window.innerWidth >= 640} 
            wrapLines={false}
            wrapLongLines={false}
            lineNumberStyle={{
              minWidth: window.innerWidth < 640 ? "2em" : "3em",
              paddingRight: window.innerWidth < 640 ? "0.5em" : "1em",
              fontSize: window.innerWidth < 640 ? "10px" : "12px",
            }}
            codeTagProps={{
              style: {
                fontSize: window.innerWidth < 640 ? "12px" : "14px",
                fontFamily:
                  'Fira Code, Monaco, Consolas, "Courier New", monospace',
                whiteSpace: "pre", // Preserve whitespace and prevent wrapping
                display: "block",
                minWidth: "max-content", 
              },
            }}
            PreTag={({ children, ...props }) => (
              <pre
                {...props}
                style={{
                  ...props.style,
                  whiteSpace: "pre",
                  overflowX: "auto",
                  overflowY: "visible",
                  minWidth: "max-content",
                }}
              >
                {children}
              </pre>
            )}
          >
            {codeBlock.code}
          </SyntaxHighlighter>
        </div>
      </div>
      {/* Mobile-only bottom actions bar */}
      <div
        className={`sm:hidden flex items-center justify-center gap-3 p-3 border-t transition-colors duration-300 ${
          darkMode
            ? "border-gray-700 bg-gray-800/30"
            : "border-gray-200 bg-gray-50/50"
        }`}
      >
        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${
            copied
              ? darkMode
                ? "bg-green-700 text-white"
                : "bg-green-100 text-green-700"
              : darkMode
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md"
          }`}
        >
          {copied ? (
            <>
              <Check size={14} />
              Copied!
            </>
          ) : (
            <>
              <Copy size={14} />
              Copy Code
            </>
          )}
        </button>
      </div>
    </div>
  );
}

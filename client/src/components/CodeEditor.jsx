import React, { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Play, Wrench, ChevronDown } from "lucide-react";

const languages = [
  { id: "javascript", name: "JavaScript" },
  { id: "typescript", name: "TypeScript" },
  { id: "python", name: "Python" },
  { id: "java", name: "Java" },
  { id: "cpp", name: "C++" },
  { id: "c", name: "C" },
  { id: "html", name: "HTML" },
  { id: "css", name: "CSS" },
  { id: "sql", name: "SQL" },
  { id: "php", name: "PHP" },
];

export default function CodeEditor({
  value,
  onChange,
  onReview,
  onFix,
  loading,
  darkMode,
}) {
  const [language, setLanguage] = useState("javascript");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [editorSettings] = useState({
    fontSize: 14,
    wordWrap: "off",
    minimap: false,
    formatOnPaste: true,
    formatOnType: true,
    autoIndent: "advanced",
  });
  const editorRef = useRef(null);
  const monacoRef = useRef(null);

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (editorRef.current) {
        editorRef.current.layout();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Configure advanced IntelliSense and validation for all languages
    configureLanguageFeatures(monaco);

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK, () => {
      editor.getAction("editor.action.formatDocument").run();
    });

    setTimeout(() => {
      editor.layout();
    }, 100);
  };

  const configureLanguageFeatures = (monaco) => {
    // Configure JavaScript/TypeScript with enhanced features
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.Latest,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      jsx: monaco.languages.typescript.JsxEmit.React,
      reactNamespace: "React",
      allowJs: true,
      typeRoots: ["node_modules/@types"],
    });

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.Latest,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
      reactNamespace: "React",
      jsx: monaco.languages.typescript.JsxEmit.React,
    });

    const libSource = [
      "declare class Console {",
      "  log(message?: any, ...optionalParams: any[]): void;",
      "  warn(message?: any, ...optionalParams: any[]): void;",
      "  error(message?: any, ...optionalParams: any[]): void;",
      "}",
      "declare var console: Console;",
    ].join("\n");

    const libUri = "ts:filename/global.d.ts";
    monaco.languages.typescript.javascriptDefaults.addExtraLib(
      libSource,
      libUri
    );
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      libSource,
      libUri
    );

    // Configure CSS validation
    monaco.languages.css.cssDefaults.setOptions({
      validate: true,
      lint: {
        compatibleVendorPrefixes: "ignore",
        vendorPrefix: "warning",
        duplicateProperties: "warning",
        emptyRules: "warning",
        importStatement: "ignore",
        boxModel: "ignore",
        universalSelector: "ignore",
        zeroUnits: "ignore",
        fontFaceProperties: "warning",
        hexColorLength: "error",
        argumentsInColorFunction: "error",
        unknownProperties: "warning",
        ieHack: "ignore",
        unknownVendorSpecificProperties: "ignore",
        propertyIgnoredDueToDisplay: "warning",
        important: "ignore",
        float: "ignore",
        idSelector: "ignore",
      },
    });

    // Configure HTML validation
    monaco.languages.html.htmlDefaults.setOptions({
      validate: true,
      format: {
        tabSize: 2,
        insertSpaces: true,
        wrapLineLength: 120,
        unformatted:
          'default": "a, abbr, acronym, b, bdo, big, br, button, cite, code, dfn, em, i, img, input, kbd, label, map, mark, math, meter, noscript, object, output, progress, q, ruby, s, samp, script, select, small, span, strong, sub, sup, textarea, time, tt, u, var, wbr',
      },
    });
  };

  return (
    <div
      className={`h-full flex flex-col shadow-xl rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden transition-colors duration-300 border ${
        darkMode
          ? "bg-gray-800/50 backdrop-blur-xl border-gray-700"
          : "bg-white/90 backdrop-blur-sm border-gray-200 shadow-2xl"
      }`}
    >
      {/* Header*/}
      <div
        className={`flex flex-col gap-2 sm:gap-3 p-2 sm:p-3 lg:p-4 border-b transition-colors duration-300 ${
          darkMode
            ? "border-gray-700 bg-gray-800/30"
            : "border-gray-200 bg-gray-50/50"
        }`}
      >
        {/* Title */}
        <h2
          className={`text-base sm:text-lg lg:text-xl font-bold transition-colors duration-300 text-center sm:text-left ${
            darkMode ? "text-gray-100" : "text-gray-800"
          }`}
        >
          Code Editor
        </h2>

        {/* Controls Container */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 lg:gap-4">
          {/* Language Selector */}
          <div className="relative w-full sm:min-w-[120px] sm:max-w-[160px] lg:min-w-[140px] lg:max-w-[180px]">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={`w-full appearance-none px-2 sm:px-3 py-1.5 sm:py-2 pr-6 sm:pr-8 rounded-md sm:rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm font-medium cursor-pointer ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-white border-gray-600 focus:border-blue-400"
                  : "bg-white hover:bg-gray-50 text-gray-800 border-gray-300 focus:border-blue-500 shadow-sm"
              }`}
            >
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>
            <ChevronDown
              className={`absolute right-1.5 sm:right-2.5 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 pointer-events-none transition-colors duration-300 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 sm:gap-3 flex-1 sm:flex-initial">
            <button
              onClick={onReview}
              disabled={loading.review}
              className={`flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex-1 sm:flex-initial sm:min-w-[90px] lg:min-w-[110px] ${
                darkMode
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
              }`}
            >
              {loading.review ? (
                <div className="animate-spin w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <Play size={isMobile ? 14 : 16} />
              )}
              <span className="hidden xs:inline">
                {loading.review ? "Reviewing..." : "Review"}
              </span>
              <span className="xs:hidden">
                {loading.review ? "..." : "Review"}
              </span>
            </button>

            <button
              onClick={onFix}
              disabled={loading.fix}
              className={`flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex-1 sm:flex-initial sm:min-w-[90px] lg:min-w-[110px] ${
                darkMode
                  ? "bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg"
                  : "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl"
              }`}
            >
              {loading.fix ? (
                <div className="animate-spin w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <Wrench size={isMobile ? 14 : 16} />
              )}
              <span className="hidden xs:inline">
                {loading.fix ? "Fixing..." : "Fix"}
              </span>
              <span className="xs:hidden">{loading.fix ? "..." : "Fix"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 relative overflow-hidden min-h-[250px] xs:min-h-[300px] sm:min-h-[400px] lg:min-h-[500px]">
        <Editor
          height="100%"
          defaultLanguage={language}
          language={language}
          value={value}
          onChange={onChange}
          onMount={handleEditorDidMount}
          theme={darkMode ? "vs-dark" : "light"}
          options={{
            scrollBeyondLastLine: true, 
            scrollBeyondLastColumn: 50, 
            automaticLayout: true,

            // Mobile-specific optimizations
            minimap: { enabled: !isMobile }, 
            fontSize: isMobile
              ? window.innerWidth < 480
                ? 11
                : 12
              : editorSettings.fontSize,
            lineNumbers: isMobile && window.innerWidth < 480 ? "off" : "on",

            wordWrap: isMobile ? "on" : "off",
            wordWrapColumn: 80,

            roundedSelection: false,
            tabSize: 2,
            fontFamily: 'Fira Code, Monaco, Consolas, "Courier New", monospace',
            fontLigatures: !isMobile, 

            quickSuggestions: {
              other: true,
              comments: true,
              strings: true,
            },
            parameterHints: {
              enabled: true,
            },
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnEnter: "on",
            acceptSuggestionOnCommitCharacter: true,
            snippetSuggestions: "top",
            wordBasedSuggestions: true,

            formatOnPaste: editorSettings.formatOnPaste,
            formatOnType: editorSettings.formatOnType,
            autoIndent: editorSettings.autoIndent,

            multiCursorModifier: "ctrlCmd",
            wordSeparators: "`~!@#$%^&*()-=+[{]}\\|;:'\",.<>/?",
            autoClosingBrackets: "always",
            autoClosingQuotes: "always",
            autoSurround: "languageDefined",
            colorDecorators: true,
            contextmenu: true,
            copyWithSyntaxHighlighting: true,

            scrollbar: {
              vertical: "auto", 
              horizontal: "auto", 
              verticalScrollbarSize: isMobile ? 16 : 14, 
              horizontalScrollbarSize: isMobile ? 16 : 14,
              alwaysConsumeMouseWheel: true, 
              useShadows: false,
              verticalHasArrows: false,
              horizontalHasArrows: false,
              arrowSize: 11,
              verticalSliderSize: isMobile ? 16 : 14,
              horizontalSliderSize: isMobile ? 16 : 14,
              handleMouseWheel: true, 
            },

            // Advanced features
            find: {
              addExtraSpaceOnTop: false,
              autoFindInSelection: "never",
              seedSearchStringFromSelection: "always",
            },
            folding: !isMobile, 
            foldingStrategy: "indentation",
            showFoldingControls: !isMobile ? "mouseover" : "never",
            renderWhitespace: "selection",

            // Performance optimizations
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: !isMobile, 
            smoothScrolling: !isMobile,
            mouseWheelScrollSensitivity: 1,
            fastScrollSensitivity: 5,

            padding: {
              top: isMobile ? 6 : 12,
              bottom: isMobile ? 6 : 12,
              left: isMobile ? 4 : 8,
              right: isMobile ? 4 : 8,
            },

            selectOnLineNumbers: true,
            selectionHighlight: true,
            occurrencesHighlight: true,

            glyphMargin: !isMobile,
            lineNumbersMinChars: isMobile ? 2 : 3,
            overviewRulerBorder: !isMobile,
            overviewRulerLanes: !isMobile ? 2 : 0,

            readOnly: false,
            domReadOnly: false,

            fixedOverflowWidgets: isMobile,

            // Mouse and touch settings
            multiCursorMergeOverlapping: true,
            dragAndDrop: !isMobile, 

            // Viewport settings for better mobile experience
            revealHorizontalRightPadding: 30,
            rulers: [],

            // Performance settings
            disableLayerHinting: isMobile,
            disableMonospaceOptimizations: false,

            matchBrackets: "always",
            bracketPairColorization: {
              enabled: !isMobile,
            },
          }}
        />
      </div>
    </div>
  );
}

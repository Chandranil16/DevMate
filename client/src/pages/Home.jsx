import React, { useState, useEffect } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import CodeEditor from "../components/CodeEditor";
import ReviewPanel from "../components/ReviewPanel";
import FixedCodePanel from "../components/FixedCodePanel";
import { getReview, getFixedCode } from "../api";

export default function Home({ darkMode }) {
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");
  const [fixedCode, setFixedCode] = useState("");
  const [loading, setLoading] = useState({ review: false, fix: false });
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleReview = async () => {
    if (!code.trim()) {
      setReview("❌ Error: Please enter some code to review.");
      return;
    }

    setLoading((prev) => ({ ...prev, review: true }));
    setReview("");

    try {
      const result = await getReview(code);
      const reviewText =
        result.fullReview || result.review || result.response || result;
      setReview(reviewText);
    } catch (error) {
      setReview(`❌ Error: ${error.message}`);
    } finally {
      setLoading((prev) => ({ ...prev, review: false }));
    }
  };

  const handleFix = async () => {
    if (!code.trim()) {
      setFixedCode("❌ Error: Please enter some code to fix.");
      return;
    }

    setLoading((prev) => ({ ...prev, fix: true }));
    setFixedCode("");

    try {
      const result = await getFixedCode(code);
      const fixedText =
        result.recommendedFix ||
        result.fixedCode ||
        result.fullReview ||
        result;
      setFixedCode(fixedText);
    } catch (error) {
      setFixedCode(`❌ Error: ${error.message}`);
    } finally {
      setLoading((prev) => ({ ...prev, fix: false }));
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
      }`}
    >
      {/* Header */}
      <header
        className={`p-3 sm:p-4 md:p-6 text-center border-b transition-colors duration-300 backdrop-blur-sm
    animate-fade-slide-down
    ${
      darkMode
        ? "border-gray-700 bg-gray-900/70"
        : "border-gray-500 bg-white/70 shadow-sm"
    }`}
      >
        <h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-purple-600 bg-clip-text text-transparent mb-1 sm:mb-2
      animate-gradient-move"
          style={{
            backgroundSize: "200% 200%",
            animation: "gradientMove 4s ease-in-out infinite",
          }}
        >
          DevMate
        </h1>
        <p
          className={`text-sm sm:text-base md:text-lg transition-colors duration-300 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          } animate-fade-in px-2`}
        >
          Get instant professional code reviews and improvements
        </p>
      </header>

      {/* Main Content - Responsive Layout */}
      <div
        className={`${
          isMobile
            ? "h-auto"
            : "h-[calc(100vh-120px)] sm:h-[calc(100vh-140px)]"
        } p-2 sm:p-4 md:p-6`}
      >
        {isMobile ? (
          // Mobile Layout 
          <div className="flex flex-col gap-4 min-h-screen">
            {/* Code Editor */}
            <div className="min-h-[400px] h-[60vh] max-h-[70vh]">
              <CodeEditor
                value={code}
                onChange={setCode}
                onReview={handleReview}
                onFix={handleFix}
                loading={loading}
                darkMode={darkMode}
              />
            </div>

            {/* Review and Fixed Code - Stacked on mobile */}
            <div className="flex flex-col gap-4 flex-1">
              <div className="min-h-[250px] flex-1 overflow-auto">
                <ReviewPanel
                  review={review}
                  loading={loading.review}
                  darkMode={darkMode}
                />
              </div>

              <div className="min-h-[250px] flex-1 overflow-auto">
                <FixedCodePanel
                  fixedCode={fixedCode}
                  loading={loading.fix}
                  darkMode={darkMode}
                />
              </div>
            </div>
          </div>
        ) : (
          // Desktop/Tablet Layout - Resizable panels
          <PanelGroup direction="vertical" className="h-full">
            {/* Code Editor Panel */}
            <Panel defaultSize={60} minSize={30} maxSize={80}>
              <CodeEditor
                value={code}
                onChange={setCode}
                onReview={handleReview}
                onFix={handleFix}
                loading={loading}
                darkMode={darkMode}
              />
            </Panel>

            {/* Horizontal Resize Handle */}
            <PanelResizeHandle
              className={`h-2 transition-colors cursor-row-resize flex items-center justify-center group ${
                darkMode
                  ? "bg-gray-700 hover:bg-blue-600"
                  : "bg-gray-300 hover:bg-blue-500"
              }`}
            >
              <div
                className={`w-8 sm:w-12 h-1 rounded-full transition-colors ${
                  darkMode
                    ? "bg-gray-500 group-hover:bg-white"
                    : "bg-gray-500 group-hover:bg-white"
                }`}
              ></div>
            </PanelResizeHandle>

            {/* Bottom Panel for Review + Fixed Code */}
            <Panel defaultSize={40} minSize={20} maxSize={70}>
              <PanelGroup direction="horizontal" className="h-full">
                {/* Review Panel */}
                <Panel defaultSize={50} minSize={30}>
                  <ReviewPanel
                    review={review}
                    loading={loading.review}
                    darkMode={darkMode}
                  />
                </Panel>

                {/* Vertical Resize Handle */}
                <PanelResizeHandle
                  className={`w-2 transition-colors cursor-col-resize flex items-center justify-center group ${
                    darkMode
                      ? "bg-gray-700 hover:bg-blue-600"
                      : "bg-gray-300 hover:bg-blue-500"
                  }`}
                >
                  <div
                    className={`h-8 sm:h-12 w-1 rounded-full transition-colors ${
                      darkMode
                        ? "bg-gray-500 group-hover:bg-white"
                        : "bg-gray-500 group-hover:bg-white"
                    }`}
                  ></div>
                </PanelResizeHandle>

                {/* Fixed Code Panel */}
                <Panel defaultSize={50} minSize={30}>
                  <FixedCodePanel
                    fixedCode={fixedCode}
                    loading={loading.fix}
                    darkMode={darkMode}
                  />
                </Panel>
              </PanelGroup>
            </Panel>
          </PanelGroup>
        )}
      </div>
    </div>
  );
}

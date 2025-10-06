import React from "react";
import {
  FileText,
  Star,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  Wrench,
} from "lucide-react";

function parseReview(reviewText) {
  if (!reviewText) return { sections: [], rawText: "" };

  const sections = [];
  const lines = reviewText.split("\n");
  let currentSection = null;

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (
      trimmed.includes("🔍 Overall Review:") ||
      trimmed.includes("**🔍 Overall Review:**")
    ) {
      if (currentSection) sections.push(currentSection);
      currentSection = {
        type: "overall",
        title: "Overall Review",
        icon: CheckCircle,
        content: [],
        color: "blue",
      };
    } else if (
      trimmed.includes("⚠️ Issues & Bugs Found:") ||
      trimmed.includes("**⚠️ Issues & Bugs Found:**")
    ) {
      if (currentSection) sections.push(currentSection);
      currentSection = {
        type: "issues",
        title: "Issues & Bugs Found",
        icon: AlertTriangle,
        content: [],
        color: "red",
      };
    } else if (
      trimmed.includes("💡 Suggestions for Improvement:") ||
      trimmed.includes("**💡 Suggestions for Improvement:**")
    ) {
      if (currentSection) sections.push(currentSection);
      currentSection = {
        type: "suggestions",
        title: "Suggestions for Improvement",
        icon: Lightbulb,
        content: [],
        color: "yellow",
      };
    } else if (
      trimmed.includes("⭐ Code Quality Rating:") ||
      trimmed.includes("**⭐ Code Quality Rating:**")
    ) {
      if (currentSection) sections.push(currentSection);
      currentSection = {
        type: "rating",
        title: "Code Quality Rating",
        icon: Star,
        content: [],
        color: "orange",
      };
    } else if (
      trimmed.includes("✅ Positive Highlights:") ||
      trimmed.includes("**✅ Positive Highlights:**")
    ) {
      if (currentSection) sections.push(currentSection);
      currentSection = {
        type: "highlights",
        title: "Positive Highlights",
        icon: CheckCircle,
        content: [],
        color: "green",
      };
    } else if (
      trimmed.includes("🛠 Recommended Fix") ||
      trimmed.includes("**🛠 Recommended Fix**")
    ) {
      if (currentSection) sections.push(currentSection);
      currentSection = {
        type: "fix",
        title: "Recommended Fix / Corrected Code",
        icon: Wrench,
        content: [],
        color: "purple",
      };
    } else if (currentSection && trimmed) {
      currentSection.content.push(line);
    }
  });

  if (currentSection) sections.push(currentSection);

  return { sections, rawText: reviewText };
}

function formatContent(content) {
  const text = content.join("\n").trim();

  const emojiHeaders = ["🔍", "⚠️", "💡", "⭐", "✅", "🛠️"];

  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => {
      if (!line) return false;
      // Check if line starts with any emoji header
      return !emojiHeaders.some((emoji) => line.startsWith(emoji));
    })
    .map((line) => {
      // Handle bullet points
      if (line.startsWith("- ")) {
        return `• ${line.substring(2)}`;
      }
      return line;
    });
}

function renderFormattedText(lines, darkMode) {
  return lines.map((line, index) => {
    // Handle bold text **text**
    const parts = line.split(/(\*\*.*?\*\*)/g);

    return (
      <div key={index} className="mb-2 leading-relaxed">
        {parts.map((part, partIndex) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={partIndex} className="font-semibold">
                {part.slice(2, -2)}
              </strong>
            );
          }
          // Handle inline code `code`
          const codeParts = part.split(/(`[^`]+`)/g);
          return codeParts.map((codePart, codeIndex) => {
            if (codePart.startsWith("`") && codePart.endsWith("`")) {
              return (
                <code
                  key={codeIndex}
                  className={`px-1 py-0.5 mx-0.5 rounded text-xs sm:text-sm font-mono transition-colors duration-300 break-all ${
                    darkMode
                      ? "bg-gray-700 text-gray-200"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {codePart.slice(1, -1)}
                </code>
              );
            }
            return codePart;
          });
        })}
      </div>
    );
  });
}

export default function ReviewPanel({ review, loading, darkMode }) {
  const { sections, rawText } = parseReview(review);

   if (loading) {
    return (
      <div
        className={`h-full min-h-[300px] p-3 sm:p-4 md:p-6 flex flex-col items-center justify-center rounded-xl sm:rounded-2xl transition-colors duration-300 border ${
          darkMode
            ? "bg-gray-800/50 backdrop-blur-xl border-gray-700"
            : "bg-white/90 backdrop-blur-sm border-gray-200 shadow-xl"
        }`}
      >
        <div className="animate-spin w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-3 sm:border-4 border-blue-400 border-t-transparent rounded-full"></div>
        <p
          className={`mt-3 sm:mt-4 animate-pulse transition-colors duration-300 text-sm sm:text-base text-center px-2 sm:px-4 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Analyzing your code...
        </p>
      </div>
    );
  }

    if (!review) {
    return (
      <div
        className={`h-full min-h-[300px] p-3 sm:p-4 md:p-6 flex flex-col items-center justify-center text-center rounded-xl sm:rounded-2xl transition-colors duration-300 border-2 ${
          darkMode
            ? "bg-gray-800/50 backdrop-blur-xl border-gray-700"
            : "bg-white/90 backdrop-blur-sm border-gray-500 shadow-xl"
        }`}
      >
        <FileText
          size={window.innerWidth < 480 ? 32 : window.innerWidth < 640 ? 40 : 48}
          className={`mb-3 sm:mb-4 animate-float transition-colors duration-300 ${
            darkMode ? "text-gray-500" : "text-gray-400"
          }`}
        />
        <h3
          className={`text-base sm:text-lg md:text-xl font-semibold mb-2 transition-colors duration-300 px-2 sm:px-4 ${
            darkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          No Review Yet
        </h3>
        <p
          className={`transition-colors duration-300 text-xs sm:text-sm md:text-base px-2 sm:px-4 max-w-xs sm:max-w-none ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Click "Review Code" to get detailed feedback on your code
        </p>
      </div>
    );
  }

  return (
    <div
      className={`h-full flex flex-col shadow-xl rounded-xl sm:rounded-2xl overflow-hidden transition-colors duration-300 border ${
        darkMode
          ? "bg-gray-800/50 backdrop-blur-xl border-gray-700"
          : "bg-white/90 backdrop-blur-sm border-gray-300 shadow-2xl"
      }`}
    >
      {/* Header */}
      <div
        className={`p-3 sm:p-4 border-b flex-shrink-0 transition-colors duration-300 ${
          darkMode ? "border-gray-700 bg-gray-800/30" : "border-gray-200 bg-gray-50/50"
        }`}
      >
        <h2
          className={`text-base sm:text-lg md:text-xl font-bold flex items-center gap-2 transition-colors duration-300 ${
            darkMode ? "text-gray-100" : "text-gray-800"
          }`}
        >
          <FileText size={window.innerWidth < 480 ? 16 : window.innerWidth < 640 ? 18 : 20} />
          <span className="truncate">Code Review</span>
        </h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {sections.length > 0 ? (
          sections.map((section, index) => {
            const IconComponent = section.icon;
            const colorClasses = {
              blue: {
                bg: darkMode ? "bg-blue-900/30" : "bg-blue-50",
                icon: "text-blue-500",
                border: darkMode ? "border-blue-800/50" : "border-blue-300",
                text: darkMode ? 'text-gray-300' : 'text-gray-800'
              },
              red: {
                bg: darkMode ? "bg-red-900/30" : "bg-red-50",
                icon: "text-red-500",
                border: darkMode ? "border-red-800/50" : "border-red-300",
                text: darkMode ? 'text-gray-300' : 'text-gray-800'
              },
              yellow: {
                bg: darkMode ? "bg-yellow-900/30" : "bg-yellow-50",
                icon: "text-yellow-500",
                border: darkMode ? "border-yellow-800/50" : "border-yellow-300",
                text: darkMode ? 'text-gray-300' : 'text-gray-800'
              },
              orange: {
                bg: darkMode ? "bg-orange-900/30" : "bg-orange-50",
                icon: "text-orange-500",
                border: darkMode ? "border-orange-800/50" : "border-orange-300",
                text: darkMode ? 'text-gray-300' : 'text-gray-800'
              },
              green: {
                bg: darkMode ? "bg-green-900/30" : "bg-green-50",
                icon: "text-green-500",
                border: darkMode ? "border-green-800/50" : "border-green-300",
                text: darkMode ? 'text-gray-300' : 'text-gray-800'
              },
               purple: { 
                bg: darkMode ? 'bg-purple-900/30' : 'bg-purple-50', 
                icon: 'text-purple-500', 
                border: darkMode ? 'border-purple-800/50' : 'border-purple-300',
                text: darkMode ? 'text-gray-300' : 'text-gray-800'
              }
            };
            const colors = colorClasses[section.color] || colorClasses.blue;

            return (
              <div
                key={index}
                className={`rounded-lg sm:rounded-xl border-2 p-3 sm:p-5 transition-all duration-300 hover:shadow-lg ${colors.border} ${colors.bg}`}
              >
                <h3
                  className={`font-bold flex items-center gap-2 mb-3 sm:mb-4 text-base sm:text-lg transition-colors duration-300 ${
                    darkMode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  <IconComponent size={window.innerWidth < 640 ? 16 : 20} className={`${colors.icon} flex-shrink-0`} />
                  <span className="break-words">{section.title}</span>
                </h3>
                <div
                  className={`leading-relaxed transition-colors duration-300 text-sm sm:text-base overflow-hidden ${
                    colors.text
                  }`}
                >
                  {renderFormattedText(
                    formatContent(section.content),
                    darkMode
                  )}
                </div>
              </div>
            );
          })
        ) : (
          // Fallback: show raw text if parsing fails
          <div
            className={`rounded-lg sm:rounded-xl p-3 sm:p-5 border-2 transition-colors duration-300 ${
              darkMode
                ? "bg-gray-700/50 border-gray-600"
                : "bg-gray-50 border-gray-300"
            }`}
          >
            <h3
              className={`font-bold mb-3 sm:mb-4 flex items-center gap-2 transition-colors duration-300 text-base sm:text-lg ${
                darkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              <FileText
                size={window.innerWidth < 640 ? 16 : 20}
                className={`${darkMode ? "text-gray-400" : "text-gray-600"} flex-shrink-0`}
              />
              <span className="break-words">Review Results</span>
            </h3>
            <div
              className={`leading-relaxed whitespace-pre-wrap transition-colors duration-300 text-sm sm:text-base break-words overflow-hidden ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {rawText}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

# 🧠 "DevMate" – AI-Powered Code Reviewer

**DevMate** is an intelligent, AI-powered instant code reviewer that analyzes any given code.
It provides structured reviews, actionable insights, and generates an improved version of your code — all within a sleek, responsive user interface.

---

## 🚀 Features

- **🤖 AI-Powered Code Review – Get detailed, structured feedback including:**

   - Overall Review

   - Issues & Bugs Found

   - Suggestions for Improvement

   - Recommended Code Fix / Improved Version

   - Code Quality Rating (out of 10)

   - Positive Highlights

- **⭐ Code Improvements and Copy Feature**

   - Provides a complete improved and balanced code version.

   - Users can copy the improved code from the “Fixed code” panel to test it instantly.

- **🛠️ Built-in Code Editor – Designed like modern editors**

   - Language selection dropdown

   - Code formatting and indentation

   - Light/Dark mode toggle

   - Real-time editing and review generation

- **🖥️ Responsive UI & Resizable Layout**

   - Works seamlessly across all devices

   - Each section is resizable for a smooth and user-friendly experience
 
- **🧠 Few-Shot Prompting**

   - Integrates **Gemini-2.5-Flash** LLM with carefully designed few-shot examples to ensure context-aware and high-quality code reviews.

---

## 🛡️ Technologies Used

- **Frontend**: React.js, Tailwind CSS, Axios, lucide-react icons, react-syntax-highlighter,monaco-editor-react, CORS

- **Backend**: Node.js, Express.js, nodemon, dotenv, CORS

- **AI Prompting**: Few-shot examples to return accurate and consistent code reviews using **gemini-2.5-flash**

---

## ⚙️ How It Works

- 🧩 Users paste or type their code in the built-in editor.

- 🧠 Backend sends the code to the Gemini-2.5-Flash LLM with structured few-shot examples.

- 📋 Model responds with a full review: overview, issues, suggestions, fixes, and rating.

- 💡 Frontend displays the results across the Review and Fixes panels.

- 📋 Users can copy the improved version of code and test it instantly.

---

## 🤖 AI Prompting Strategy

- **DevMate** uses few-shot prompting to train the LLM to behave as an expert code reviewer.
  This ensures:

  - Accurate identification of bugs and bad practices

  - Consistent structured output (Overview, Issues, Fixes, Rating, etc.)

  - Balanced suggestions with clear examples

  - Language detection for proper syntax highlighting in code

---

## Author

  Developed with ❤️ by myself (Chandranil Adhikary)

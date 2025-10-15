const API_BASE = "https://devmate-code-backend.onrender.com/api";

export async function getReview(userCode) {
  try {
    const res = await fetch(`${API_BASE}/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userCode }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log("Review response:", data);
    return data;
  } catch (error) {
    console.error("Review API error:", error);
    throw error;
  }
}

export async function getFixedCode(userCode) {
  try {
    const fixPrompt = `Please provide ONLY the corrected/improved version of this code with proper formatting:

${userCode}

Return the fixed code in a markdown code block.`;

    const res = await fetch(`${API_BASE}/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: fixPrompt }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log("Fix response:", data);
    return data;
  } catch (error) {
    console.error("Fix API error:", error);
    throw error;
  }
}

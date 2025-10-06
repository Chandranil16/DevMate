const aiservice = require("../services/aiservice");

const aicontroller = async (req, res) => {
  try {
    const prompt = req.body.prompt;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const response = await aiservice(prompt);

    // Return structured response
    res.json({
      fullReview: response.fullReview,
      recommendedFix: response.recommendedFix,
      success: true,
    });
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({
      error: "Failed to process request",
      message: error.message,
    });
  }
};

module.exports = aicontroller;

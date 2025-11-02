const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    const r = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.1",
        prompt: message,
        stream: false, 
        options: {
          temperature: 0.7
        }
      })
    });

    const data = await r.json();
    const ai = data?.response || "Sorry — no response.";

    res.json({ reply: ai });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ reply: "Server error talking to the model." });
  }
});

const PORT = process.env.PORT || 8787;
app.listen(PORT, () => {
  console.log(`AI server listening on http://localhost:${PORT}`);
});

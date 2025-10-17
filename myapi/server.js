import express from "express";
import { createCanvas } from "canvas";

const app = express();
app.use(express.json());

// API endpoint
app.get("/", async (req, res) => {
  const { name, username, number, email } = req.query;

  if (!name || !username || !number || !email)
    return res.status(400).json({
      error: "Missing required fields: name, username, number, email"
    });

  // Create image (UI Card)
  const canvas = createCanvas(600, 300);
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#0f172a";
  ctx.fillRect(0, 0, 600, 300);

  // Text
  ctx.fillStyle = "#3b82f6";
  ctx.font = "bold 28px Sans-serif";
  ctx.fillText(name, 40, 80);

  ctx.fillStyle = "#e2e8f0";
  ctx.font = "20px Sans-serif";
  ctx.fillText("Username: " + username, 40, 130);
  ctx.fillText("Number: " + number, 40, 170);
  ctx.fillText("Email: " + email, 40, 210);

  // Convert to base64 image
  const imageBase64 = canvas.toDataURL("image/png");

  // Response JSON
  res.json({
    success: true,
    data: { name, username, number, email },
    image: imageBase64
  });
});

app.listen(3000, () => console.log("✅ API running on port 3000"));

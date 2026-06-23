import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.post("/api/insights", async (req, res) => {
    try {
      const { stats, chartData } = req.body;
      
      const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.warn("API Key not found. Returning mock data.");
        res.json([
          { title: "Data Missing", description: "API Key is required to generate real AI insights.", type: "neutral" }
        ]);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });

      const prompt = `
        Act as a healthcare data analyst. Analyze the following hospital dashboard data:
        
        Key Metrics:
        ${JSON.stringify(stats)}
        
        Weekly Trends (Patients vs Consultations):
        ${JSON.stringify(chartData)}
        
        Provide 3 concise, actionable insights or observations.
        Return the response in valid JSON format with the following schema:
        Array of objects, where each object has:
        - title: string (short headline)
        - description: string (1-2 sentences)
        - type: string (one of: 'positive', 'warning', 'neutral')
      `;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                type: { type: Type.STRING, enum: ["positive", "warning", "neutral"] },
              },
              required: ["title", "description", "type"]
            }
          }
        }
      });

      const rawText = response.text;
      if (!rawText) {
        res.json([]);
        return;
      }
      
      res.json(JSON.parse(rawText));
    } catch (error) {
      console.error("Error generating insights:", error);
      res.status(500).json([
        {
          title: "Analysis Failed",
          description: "Could not generate insights at this time. Please try again later.",
          type: "warning"
        }
      ]);
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

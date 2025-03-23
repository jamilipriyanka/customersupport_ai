import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { processChat } from "./controllers/chatController";

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat API route
  app.post('/api/chat', processChat);
  
  // User-specific chat history
  app.get('/api/chat/history/:userId', async (req, res) => {
    try {
      // This would normally fetch chat history from a database
      res.json({ messages: [] });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch chat history' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

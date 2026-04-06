import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(server: Server, app: Express) {
  // Get all active profiles
  app.get("/api/profiles", async (_req, res) => {
    const profiles = await storage.getActiveProfiles();
    res.json(profiles);
  });

  // Get profile by id
  app.get("/api/profiles/:id", async (req, res) => {
    const profile = await storage.getProfile(Number(req.params.id));
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.json(profile);
  });

  // Join waitlist
  app.post("/api/waitlist", async (req, res) => {
    try {
      const entry = await storage.addToWaitlist({
        email: req.body.email,
        role: req.body.role || "woman_dater",
        createdAt: new Date().toISOString(),
      });
      res.json(entry);
    } catch (e: any) {
      if (e.message?.includes("UNIQUE")) {
        return res.status(409).json({ error: "Already on waitlist" });
      }
      res.status(500).json({ error: "Failed to join waitlist" });
    }
  });

  // Like a profile
  app.post("/api/likes", async (req, res) => {
    const like = await storage.createLike({
      fromUserId: req.body.fromUserId,
      toProfileId: req.body.toProfileId,
      createdAt: new Date().toISOString(),
    });
    res.json(like);
  });
}

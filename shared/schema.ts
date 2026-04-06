import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  role: text("role").notNull(), // "wing_girl" | "man" | "woman_dater"
  verified: integer("verified", { mode: "boolean" }).default(false),
  avatarUrl: text("avatar_url"),
  points: integer("points").default(0),
});

export const profiles = sqliteTable("profiles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id),
  createdByUserId: integer("created_by_user_id").references(() => users.id),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  city: text("city").notNull(),
  bio: text("bio").notNull(),
  greenFlags: text("green_flags").notNull(), // JSON array
  redFlags: text("red_flags"), // JSON array, optional
  datingIntent: text("dating_intent").notNull(),
  personality: text("personality").notNull(), // JSON array
  career: text("career"),
  education: text("education"),
  energy: text("energy"), // e.g. "Ambitious / Soft / Funny"
  tagline: text("tagline"), // personal tagline e.g. "Mean Girl", "IT GIRL"
  wingGirlNote: text("wing_girl_note"),
  wingGirlName: text("wing_girl_name"),
  wingGirlRelation: text("wing_girl_relation"), // "sister", "friend", "cousin", "coworker"
  songTitle: text("song_title"),
  songArtist: text("song_artist"),
  photoUrls: text("photo_urls").notNull(), // JSON array of URLs
  badge: text("badge"), // "Sister Approved", "Friend Vouched", "Cousin Certified"
  approved: integer("approved", { mode: "boolean" }).default(false),
  active: integer("active", { mode: "boolean" }).default(true),
});

export const likes = sqliteTable("likes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  fromUserId: integer("from_user_id").references(() => users.id),
  toProfileId: integer("to_profile_id").references(() => profiles.id),
  createdAt: text("created_at").notNull(),
});

export const matches = sqliteTable("matches", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  profileId: integer("profile_id").references(() => profiles.id),
  womanUserId: integer("woman_user_id").references(() => users.id),
  createdAt: text("created_at").notNull(),
  active: integer("active", { mode: "boolean" }).default(true),
});

export const messages = sqliteTable("messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  matchId: integer("match_id").references(() => matches.id),
  senderId: integer("sender_id").references(() => users.id),
  content: text("content").notNull(),
  createdAt: text("created_at").notNull(),
});

export const waitlist = sqliteTable("waitlist", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  role: text("role").notNull(),
  createdAt: text("created_at").notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true, points: true, verified: true });
export const insertProfileSchema = createInsertSchema(profiles).omit({ id: true, approved: true, active: true });
export const insertLikeSchema = createInsertSchema(likes).omit({ id: true });
export const insertMatchSchema = createInsertSchema(matches).omit({ id: true, active: true });
export const insertMessageSchema = createInsertSchema(messages).omit({ id: true });
export const insertWaitlistSchema = createInsertSchema(waitlist).omit({ id: true });

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Profile = typeof profiles.$inferSelect;
export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Like = typeof likes.$inferSelect;
export type InsertLike = z.infer<typeof insertLikeSchema>;
export type Match = typeof matches.$inferSelect;
export type InsertMatch = z.infer<typeof insertMatchSchema>;
export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Waitlist = typeof waitlist.$inferSelect;
export type InsertWaitlist = z.infer<typeof insertWaitlistSchema>;

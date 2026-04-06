import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { eq } from "drizzle-orm";
import {
  users, profiles, likes, matches, messages, waitlist,
  type User, type InsertUser,
  type Profile, type InsertProfile,
  type Like, type InsertLike,
  type Match, type InsertMatch,
  type Message, type InsertMessage,
  type Waitlist, type InsertWaitlist,
} from "@shared/schema";

interface IStorage {
  getUser(id: number): User | undefined;
  createUser(data: InsertUser): User;
  getActiveProfiles(): Profile[];
  getProfile(id: number): Profile | undefined;
  createProfile(data: InsertProfile): Profile;
  createLike(data: InsertLike): Like;
  createMatch(data: InsertMatch): Match;
  createMessage(data: InsertMessage): Message;
  getMessagesByMatch(matchId: number): Message[];
  addToWaitlist(data: InsertWaitlist): Waitlist;
}

const sqlite = new Database("wing-girl.db");
const db = drizzle(sqlite);

// Create tables
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    verified INTEGER DEFAULT 0,
    avatar_url TEXT,
    points INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER REFERENCES users(id),
    created_by_user_id INTEGER REFERENCES users(id),
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    city TEXT NOT NULL,
    bio TEXT NOT NULL,
    green_flags TEXT NOT NULL,
    red_flags TEXT,
    dating_intent TEXT NOT NULL,
    personality TEXT NOT NULL,
    career TEXT,
    education TEXT,
    energy TEXT,
    tagline TEXT,
    wing_girl_note TEXT,
    wing_girl_name TEXT,
    wing_girl_relation TEXT,
    song_title TEXT,
    song_artist TEXT,
    photo_urls TEXT NOT NULL,
    badge TEXT,
    approved INTEGER DEFAULT 0,
    active INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS likes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    from_user_id INTEGER REFERENCES users(id),
    to_profile_id INTEGER REFERENCES profiles(id),
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS matches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    profile_id INTEGER REFERENCES profiles(id),
    woman_user_id INTEGER REFERENCES users(id),
    created_at TEXT NOT NULL,
    active INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    match_id INTEGER REFERENCES matches(id),
    sender_id INTEGER REFERENCES users(id),
    content TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS waitlist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL,
    created_at TEXT NOT NULL
  );
`);

export const storage: IStorage = {
  getUser(id: number) {
    return db.select().from(users).where(eq(users.id, id)).get();
  },
  createUser(data: InsertUser) {
    return db.insert(users).values(data).returning().get();
  },
  getActiveProfiles() {
    return db.select().from(profiles).where(eq(profiles.active, true)).all();
  },
  getProfile(id: number) {
    return db.select().from(profiles).where(eq(profiles.id, id)).get();
  },
  createProfile(data: InsertProfile) {
    return db.insert(profiles).values(data).returning().get();
  },
  createLike(data: InsertLike) {
    return db.insert(likes).values(data).returning().get();
  },
  createMatch(data: InsertMatch) {
    return db.insert(matches).values(data).returning().get();
  },
  createMessage(data: InsertMessage) {
    return db.insert(messages).values(data).returning().get();
  },
  getMessagesByMatch(matchId: number) {
    return db.select().from(messages).where(eq(messages.matchId, matchId)).all();
  },
  addToWaitlist(data: InsertWaitlist) {
    return db.insert(waitlist).values(data).returning().get();
  },
};

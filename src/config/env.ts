import dotenv from "dotenv";
dotenv.config();

export const DB_URL = process.env.DB_URL ?? "";
export const FAKE_URL = process.env.FAKE_URL ?? "";
export const Port = process.env.Port
export const Key = process.env.Key
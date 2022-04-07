import express from "express";
import { getClient } from "../db";
import Session from "../models/Session";

const sessionRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

sessionRouter.get("/", async (req, res) => {
  try {
    const client = await getClient();
    const results = await client
      .db()
      .collection<Session>("sessions")
      .find()
      .toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

export default sessionRouter;

import express from "express";
import { getClient } from "../db";
import Update from "../models/Update";
import User from "../models/User";
import UserUpdate from "../models/UserUpdate";

const userRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

userRouter.get("/", async (req, res) => {
  try {
    const client = await getClient();
    const results = await client
      .db()
      .collection<User>("user_stats")
      .find()
      .toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

userRouter.get("/:uid", async (req, res) => {
  try {
    const uid: string = req.params.uid;
    const client = await getClient();
    const result = await client
      .db()
      .collection<User>("user_stats")
      .findOne({ uid });
    res.json(result);
  } catch (err) {
    errorResponse(err, res);
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const newUser: User = req.body;
    const client = await getClient();
    await client.db().collection<User>("user_stats").insertOne(newUser);
    res.status(201).json(newUser);
  } catch (err) {
    errorResponse(err, res);
  }
});

userRouter.put("/:uid", async (req, res) => {
  try {
    const uid: string = req.params.uid;
    const userUpdate: UserUpdate = req.body;
    const update: Update = { $inc: {} };
    if (userUpdate.difficulty === "easy") {
      if (userUpdate.correct === true) {
        update.$inc.eC = 1;
        update.$inc.eT = 1;
        update.$inc.tC = 1;
        update.$inc.tT = 1;
      } else {
        update.$inc.eI = 1;
        update.$inc.eT = 1;
        update.$inc.tI = 1;
        update.$inc.tT = 1;
      }
    } else if (userUpdate.difficulty === "medium") {
      if (userUpdate.correct === true) {
        update.$inc.mC = 1;
        update.$inc.mT = 1;
        update.$inc.tC = 1;
        update.$inc.tT = 1;
      } else {
        update.$inc.mI = 1;
        update.$inc.mT = 1;
        update.$inc.tI = 1;
        update.$inc.tT = 1;
      }
    } else if (userUpdate.difficulty === "hard") {
      if (userUpdate.correct === true) {
        update.$inc.hC = 1;
        update.$inc.hT = 1;
        update.$inc.tC = 1;
        update.$inc.tT = 1;
      } else {
        update.$inc.hI = 1;
        update.$inc.hT = 1;
        update.$inc.tI = 1;
        update.$inc.tT = 1;
      }
    } else if (userUpdate.difficulty === "insanus") {
      if (userUpdate.correct === true) {
        update.$inc.iC = 1;
        update.$inc.iT = 1;
        update.$inc.tC = 1;
        update.$inc.tT = 1;
      } else {
        update.$inc.iI = 1;
        update.$inc.iT = 1;
        update.$inc.tI = 1;
        update.$inc.tT = 1;
      }
    }
    const client = await getClient();
    await client
      .db()
      .collection<User>("user_stats")
      .updateOne({ uid }, update as any);
    res.status(200).json(update);
  } catch (err) {
    errorResponse(err, res);
  }
});

export default userRouter;

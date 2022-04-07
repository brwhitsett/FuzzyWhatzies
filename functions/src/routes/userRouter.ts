import express from "express";
import { getClient } from "../db";
import User from "../models/User";
import UserUpdate from "../models/userUpdate";

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

userRouter.post("/:uid", async (req, res) => {
  const uid: string = req.params.uid;
  try {
    if (uid) {
      const newUser: User = {
        uid,
        eC: 0,
        eI: 0,
        eT: 0,
        mC: 0,
        mI: 0,
        mT: 0,
        hC: 0,
        hI: 0,
        hT: 0,
        iC: 0,
        iI: 0,
        iT: 0,
        tT: 0,
        tC: 0,
        tI: 0,
        newName: "",
      };
      const client = await getClient();
      await client.db().collection<User>("user_stats").insertOne(newUser);
      res.status(201).json(newUser);
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

userRouter.put("/:uid", async (req, res) => {
  try {
    const uid: string = req.params.uid;
    const userUpdate: UserUpdate = req.body;
    const update: any = { $inc: {} };
    if (userUpdate.difficulty === "easy") {
      if (userUpdate.correct) {
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
      if (userUpdate.correct) {
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
      if (userUpdate.correct) {
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
      if (userUpdate.correct) {
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
    await client.db().collection<User>("user_stats").updateOne({ uid }, update);
    res.status(200).json(update);
  } catch (err) {
    errorResponse(err, res);
  }
});

export default userRouter;

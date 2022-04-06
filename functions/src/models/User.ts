import { ObjectId } from "mongodb";

export default interface User {
  _id?: ObjectId;
  name: string;
  lifetimeScore: number;
  singleGameHighScore: number;
  lifetimeQuestionsAsked: number;
  lifetimeQuestionsCorrect: number;
  totalPlayTime?: number;
}

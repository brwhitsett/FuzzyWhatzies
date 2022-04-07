import { ObjectId } from "mongodb";

export default interface Session {
  _id?: ObjectId;
  uid: number;
  name: string;
  difficulty: string;
  speed: number;
  correct: number;
  incorrect: number;
  total: number;
}

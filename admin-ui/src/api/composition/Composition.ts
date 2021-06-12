import { Match } from "../match/Match";
import { Position } from "../position/Position";
import { User } from "../user/User";

export type Composition = {
  createdAt: Date;
  id: string;
  match?: Match | null;
  positions?: Array<Position>;
  updatedAt: Date;
  user?: User | null;
};

import { Match } from "../match/Match";
import { Position } from "../position/Position";
import { Team } from "../team/Team";
import { User } from "../user/User";

export type Composition = {
  createdAt: Date;
  id: string;
  match?: Match | null;
  position?: Position | null;
  team?: Team | null;
  updatedAt: Date;
  user?: User | null;
};

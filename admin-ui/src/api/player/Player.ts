import { Position } from "../position/Position";
import { Team } from "../team/Team";

export type Player = {
  createdAt: Date;
  displayName: string | null;
  firstName: string | null;
  id: string;
  lastName: string | null;
  number: number | null;
  positions?: Array<Position>;
  poste: string | null;
  teams?: Array<Team>;
  updatedAt: Date;
};

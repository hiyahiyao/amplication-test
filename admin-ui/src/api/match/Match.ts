import { Team } from "../team/Team";
import { Composition } from "../composition/Composition";

export type Match = {
  awayTeam?: Team | null;
  competition: string | null;
  compositions?: Array<Composition>;
  createdAt: Date;
  homeTeam?: Team | null;
  id: string;
  score: string | null;
  stadium: string | null;
  startDate: Date | null;
  updatedAt: Date;
};

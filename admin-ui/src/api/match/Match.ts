import { Composition } from "../composition/Composition";

export type Match = {
  competition: string | null;
  compositions?: Array<Composition>;
  createdAt: Date;
  endDate: Date | null;
  id: string;
  score: string | null;
  stadium: string | null;
  startDate: Date | null;
  updatedAt: Date;
};

import { Position } from "../position/Position";
import { Team } from "../team/Team";

export type Player = {
  age: number | null;
  birthday: Date | null;
  createdAt: Date;
  displayName: string | null;
  firstName: string | null;
  id: string;
  isLegendary: boolean | null;
  lastName: string | null;
  number: string | null;
  positions?: Array<Position>;
  team?: Team | null;
  updatedAt: Date;
};

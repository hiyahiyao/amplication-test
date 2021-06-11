import { Team } from "../team/Team";

export type LegendaryPlayer = {
  createdAt: Date;
  id: string;
  name: string;
  team?: Array<Team>;
  updatedAt: Date;
};

import { Team } from "../team/Team";

export type LegendaryPlayer = {
  createdAt: Date;
  fieldPoste: string | null;
  id: string;
  name: string;
  team?: Array<Team>;
  updatedAt: Date;
};

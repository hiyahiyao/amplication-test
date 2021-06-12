import { Composition } from "../composition/Composition";
import { Team } from "../team/Team";

export type User = {
  address: string | null;
  composition?: Array<Composition>;
  createdAt: Date;
  firstName: string;
  gender: number;
  id: string;
  isStadiumSubscriber: boolean | null;
  lastName: string;
  postalCode: string | null;
  roles: Array<string>;
  team?: Team | null;
  updatedAt: Date;
  username: string;
};

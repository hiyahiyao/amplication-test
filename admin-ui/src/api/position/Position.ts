import { Composition } from "../composition/Composition";
import { Player } from "../player/Player";

export type Position = {
  composition?: Composition | null;
  createdAt: Date;
  fieldPosition: number | null;
  id: string;
  player?: Player | null;
  updatedAt: Date;
};

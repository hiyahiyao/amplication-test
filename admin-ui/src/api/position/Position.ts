import { Composition } from "../composition/Composition";
import { Player } from "../player/Player";

export type Position = {
  compositions?: Array<Composition>;
  createdAt: Date;
  id: string;
  number: number | null;
  player?: Array<Player>;
  updatedAt: Date;
};

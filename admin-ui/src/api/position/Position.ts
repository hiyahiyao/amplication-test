import { Composition } from "../composition/Composition";
import { Player } from "../player/Player";

export type Position = {
  compositions?: Composition | null;
  createdAt: Date;
  id: string;
  number: number | null;
  player?: Player;
  updatedAt: Date;
};

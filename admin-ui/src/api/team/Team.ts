import { Composition } from "../composition/Composition";
import { LegendaryPlayer } from "../legendaryPlayer/LegendaryPlayer";
import { Match } from "../match/Match";
import { Player } from "../player/Player";

export type Team = {
  compositions?: Array<Composition>;
  createdAt: Date;
  firstColor: string | null;
  id: string;
  illustration: string | null;
  legendaryPlayers?: Array<LegendaryPlayer>;
  matchesAsAway?: Array<Match>;
  matchesAsHome?: Array<Match>;
  name: string | null;
  players?: Array<Player>;
  secondColor: string | null;
  thirdColor: string | null;
  updatedAt: Date;
};

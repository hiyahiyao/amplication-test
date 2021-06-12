import { LegendaryPlayer } from "../legendaryPlayer/LegendaryPlayer";
import { Player } from "../player/Player";
import { User } from "../user/User";

export type Team = {
  createdAt: Date;
  firstColor: string | null;
  id: string;
  illustration: string | null;
  legendaryPlayers?: Array<LegendaryPlayer>;
  name: string | null;
  players?: Array<Player>;
  secondColor: string | null;
  thirdColor: string | null;
  updatedAt: Date;
  users?: Array<User>;
};

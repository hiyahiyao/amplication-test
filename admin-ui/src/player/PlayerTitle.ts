import { Player as TPlayer } from "../api/player/Player";

export const PLAYER_TITLE_FIELD = "displayName";

export const PlayerTitle = (record: TPlayer) => {
  return record.displayName;
};

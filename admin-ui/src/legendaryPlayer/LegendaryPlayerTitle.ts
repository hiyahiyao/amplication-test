import { LegendaryPlayer as TLegendaryPlayer } from "../api/legendaryPlayer/LegendaryPlayer";

export const LEGENDARYPLAYER_TITLE_FIELD = "name";

export const LegendaryPlayerTitle = (record: TLegendaryPlayer) => {
  return record.name;
};

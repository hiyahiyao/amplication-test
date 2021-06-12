import { Match as TMatch } from "../api/match/Match";

export const MATCH_TITLE_FIELD = "competition";

export const MatchTitle = (record: TMatch) => {
  return record.competition;
};

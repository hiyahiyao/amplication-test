import { TeamWhereUniqueInput } from "../team/TeamWhereUniqueInput";

export type MatchCreateInput = {
  awayTeam?: TeamWhereUniqueInput | null;
  competition?: string | null;
  homeTeam?: TeamWhereUniqueInput | null;
  score?: string | null;
  stadium?: string | null;
  startDate?: Date | null;
};

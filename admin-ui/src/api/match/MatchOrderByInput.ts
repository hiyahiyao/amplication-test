import { SortOrder } from "../../util/SortOrder";

export type MatchOrderByInput = {
  awayTeamId?: SortOrder;
  competition?: SortOrder;
  createdAt?: SortOrder;
  homeTeamId?: SortOrder;
  id?: SortOrder;
  score?: SortOrder;
  stadium?: SortOrder;
  startDate?: SortOrder;
  updatedAt?: SortOrder;
};

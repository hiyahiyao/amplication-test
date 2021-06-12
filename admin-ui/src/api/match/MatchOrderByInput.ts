import { SortOrder } from "../../util/SortOrder";

export type MatchOrderByInput = {
  competition?: SortOrder;
  createdAt?: SortOrder;
  endDate?: SortOrder;
  id?: SortOrder;
  score?: SortOrder;
  stadium?: SortOrder;
  startDate?: SortOrder;
  updatedAt?: SortOrder;
};

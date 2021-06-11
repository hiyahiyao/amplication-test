import { MatchWhereInput } from "./MatchWhereInput";
import { MatchOrderByInput } from "./MatchOrderByInput";

export type MatchFindManyArgs = {
  where?: MatchWhereInput;
  orderBy?: MatchOrderByInput;
  skip?: number;
  take?: number;
};

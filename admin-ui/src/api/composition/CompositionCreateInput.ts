import { MatchWhereUniqueInput } from "../match/MatchWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type CompositionCreateInput = {
  match?: MatchWhereUniqueInput | null;
  user?: UserWhereUniqueInput | null;
};

import { MatchWhereUniqueInput } from "../match/MatchWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type CompositionUpdateInput = {
  match?: MatchWhereUniqueInput | null;
  user?: UserWhereUniqueInput | null;
};

import { MatchWhereUniqueInput } from "../match/MatchWhereUniqueInput";
import { TeamWhereUniqueInput } from "../team/TeamWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type CompositionCreateInput = {
  match?: MatchWhereUniqueInput | null;
  team?: TeamWhereUniqueInput | null;
  user?: UserWhereUniqueInput | null;
};

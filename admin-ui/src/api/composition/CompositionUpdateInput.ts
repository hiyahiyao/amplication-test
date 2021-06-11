import { MatchWhereUniqueInput } from "../match/MatchWhereUniqueInput";
import { TeamWhereUniqueInput } from "../team/TeamWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type CompositionUpdateInput = {
  match?: MatchWhereUniqueInput;
  team?: TeamWhereUniqueInput;
  user?: UserWhereUniqueInput;
};

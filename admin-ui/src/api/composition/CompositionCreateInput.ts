import { MatchWhereUniqueInput } from "../match/MatchWhereUniqueInput";
import { PositionWhereUniqueInput } from "../position/PositionWhereUniqueInput";
import { TeamWhereUniqueInput } from "../team/TeamWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type CompositionCreateInput = {
  match?: MatchWhereUniqueInput | null;
  position?: PositionWhereUniqueInput | null;
  team?: TeamWhereUniqueInput | null;
  user?: UserWhereUniqueInput | null;
};

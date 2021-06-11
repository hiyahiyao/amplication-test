import { StringFilter } from "../../util/StringFilter";
import { MatchWhereUniqueInput } from "../match/MatchWhereUniqueInput";
import { TeamWhereUniqueInput } from "../team/TeamWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type CompositionWhereInput = {
  id?: StringFilter;
  match?: MatchWhereUniqueInput;
  team?: TeamWhereUniqueInput;
  user?: UserWhereUniqueInput;
};

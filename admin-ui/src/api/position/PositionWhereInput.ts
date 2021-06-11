import { CompositionWhereUniqueInput } from "../composition/CompositionWhereUniqueInput";
import { StringFilter } from "../../util/StringFilter";
import { IntNullableFilter } from "../../util/IntNullableFilter";
import { PlayerWhereUniqueInput } from "../player/PlayerWhereUniqueInput";

export type PositionWhereInput = {
  compositions?: CompositionWhereUniqueInput;
  id?: StringFilter;
  number?: IntNullableFilter;
  player?: PlayerWhereUniqueInput;
};

import { CompositionWhereUniqueInput } from "../composition/CompositionWhereUniqueInput";
import { IntNullableFilter } from "../../util/IntNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { PlayerWhereUniqueInput } from "../player/PlayerWhereUniqueInput";

export type PositionWhereInput = {
  composition?: CompositionWhereUniqueInput;
  fieldPosition?: IntNullableFilter;
  id?: StringFilter;
  player?: PlayerWhereUniqueInput;
};

import { StringFilter } from "../../util/StringFilter";
import { IntNullableFilter } from "../../util/IntNullableFilter";

export type PositionWhereInput = {
  id?: StringFilter;
  number?: IntNullableFilter;
};

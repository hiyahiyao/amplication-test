import { IntNullableFilter } from "../../util/IntNullableFilter";
import { DateTimeNullableFilter } from "../../util/DateTimeNullableFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { BooleanNullableFilter } from "../../util/BooleanNullableFilter";
import { TeamWhereUniqueInput } from "../team/TeamWhereUniqueInput";

export type PlayerWhereInput = {
  age?: IntNullableFilter;
  birthday?: DateTimeNullableFilter;
  displayName?: StringNullableFilter;
  firstName?: StringNullableFilter;
  id?: StringFilter;
  isLegendary?: BooleanNullableFilter;
  lastName?: StringNullableFilter;
  number?: StringNullableFilter;
  team?: TeamWhereUniqueInput;
};

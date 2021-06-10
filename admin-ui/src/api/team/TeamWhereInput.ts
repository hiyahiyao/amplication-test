import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";

export type TeamWhereInput = {
  firstColor?: StringNullableFilter;
  id?: StringFilter;
  illustration?: StringNullableFilter;
  name?: StringNullableFilter;
  secondColor?: StringNullableFilter;
  thirdColor?: StringNullableFilter;
};

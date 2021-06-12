import { StringNullableFilter } from "../../util/StringNullableFilter";
import { DateTimeNullableFilter } from "../../util/DateTimeNullableFilter";
import { StringFilter } from "../../util/StringFilter";

export type MatchWhereInput = {
  competition?: StringNullableFilter;
  endDate?: DateTimeNullableFilter;
  id?: StringFilter;
  score?: StringNullableFilter;
  stadium?: StringNullableFilter;
  startDate?: DateTimeNullableFilter;
};

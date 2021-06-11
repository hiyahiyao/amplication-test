import { TeamWhereUniqueInput } from "../team/TeamWhereUniqueInput";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { DateTimeNullableFilter } from "../../util/DateTimeNullableFilter";

export type MatchWhereInput = {
  awayTeam?: TeamWhereUniqueInput;
  competition?: StringNullableFilter;
  homeTeam?: TeamWhereUniqueInput;
  id?: StringFilter;
  score?: StringNullableFilter;
  stadium?: StringNullableFilter;
  startDate?: DateTimeNullableFilter;
};

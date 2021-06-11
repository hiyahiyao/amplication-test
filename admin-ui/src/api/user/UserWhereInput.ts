import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { IntFilter } from "../../util/IntFilter";
import { BooleanNullableFilter } from "../../util/BooleanNullableFilter";

export type UserWhereInput = {
  address?: StringNullableFilter;
  firstName?: StringFilter;
  gender?: IntFilter;
  id?: StringFilter;
  isStadiumSubscriber?: BooleanNullableFilter;
  lastName?: StringFilter;
  postalCode?: StringNullableFilter;
  username?: StringFilter;
};

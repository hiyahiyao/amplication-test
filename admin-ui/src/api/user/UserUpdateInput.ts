import { TeamWhereUniqueInput } from "../team/TeamWhereUniqueInput";

export type UserUpdateInput = {
  address?: string | null;
  firstName?: string;
  gender?: number;
  isStadiumSubscriber?: boolean | null;
  lastName?: string;
  password?: string;
  postalCode?: string | null;
  roles?: Array<string>;
  team?: TeamWhereUniqueInput | null;
  username?: string;
};

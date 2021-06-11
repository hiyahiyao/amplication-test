export type UserCreateInput = {
  address?: string | null;
  firstName: string;
  gender: number;
  isStadiumSubscriber?: boolean | null;
  lastName: string;
  password: string;
  postalCode?: string | null;
  roles: Array<string>;
  username: string;
};

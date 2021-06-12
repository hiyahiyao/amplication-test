import { TeamWhereUniqueInput } from "../team/TeamWhereUniqueInput";

export type PlayerUpdateInput = {
  age?: number | null;
  birthday?: Date | null;
  displayName?: string | null;
  firstName?: string | null;
  isLegendary?: boolean | null;
  lastName?: string | null;
  number?: string | null;
  team?: TeamWhereUniqueInput | null;
};

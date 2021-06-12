import { LegendaryPlayerWhereInput } from "./LegendaryPlayerWhereInput";
import { LegendaryPlayerOrderByInput } from "./LegendaryPlayerOrderByInput";

export type LegendaryPlayerFindManyArgs = {
  where?: LegendaryPlayerWhereInput;
  orderBy?: LegendaryPlayerOrderByInput;
  skip?: number;
  take?: number;
};

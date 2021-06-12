import { PositionWhereInput } from "./PositionWhereInput";
import { PositionOrderByInput } from "./PositionOrderByInput";

export type PositionFindManyArgs = {
  where?: PositionWhereInput;
  orderBy?: PositionOrderByInput;
  skip?: number;
  take?: number;
};

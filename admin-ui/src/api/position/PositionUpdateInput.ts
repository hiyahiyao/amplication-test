import { CompositionWhereUniqueInput } from "../composition/CompositionWhereUniqueInput";
import { PlayerWhereUniqueInput } from "../player/PlayerWhereUniqueInput";

export type PositionUpdateInput = {
  compositions?: CompositionWhereUniqueInput | null;
  number?: number | null;
  player?: PlayerWhereUniqueInput;
};

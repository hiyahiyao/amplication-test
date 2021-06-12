import { CompositionWhereUniqueInput } from "../composition/CompositionWhereUniqueInput";
import { PlayerWhereUniqueInput } from "../player/PlayerWhereUniqueInput";

export type PositionUpdateInput = {
  composition?: CompositionWhereUniqueInput | null;
  fieldPosition?: number | null;
  player?: PlayerWhereUniqueInput | null;
};

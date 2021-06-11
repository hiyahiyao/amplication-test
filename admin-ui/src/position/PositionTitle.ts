import { Position as TPosition } from "../api/position/Position";

export const POSITION_TITLE_FIELD = "id";

export const PositionTitle = (record: TPosition) => {
  return record.id;
};

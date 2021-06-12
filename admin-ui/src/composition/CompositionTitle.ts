import { Composition as TComposition } from "../api/composition/Composition";

export const COMPOSITION_TITLE_FIELD = "id";

export const CompositionTitle = (record: TComposition) => {
  return record.id;
};

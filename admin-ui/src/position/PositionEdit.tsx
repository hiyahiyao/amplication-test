import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  ReferenceInput,
  SelectInput,
  NumberInput,
} from "react-admin";
import { CompositionTitle } from "../composition/CompositionTitle";
import { PlayerTitle } from "../player/PlayerTitle";

export const PositionEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <ReferenceInput
          source="composition.id"
          reference="Composition"
          label="composition"
        >
          <SelectInput optionText={CompositionTitle} />
        </ReferenceInput>
        <NumberInput step={1} label="fieldPosition" source="fieldPosition" />
        <ReferenceInput source="player.id" reference="Player" label="player">
          <SelectInput optionText={PlayerTitle} />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  );
};

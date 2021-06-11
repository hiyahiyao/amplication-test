import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  ReferenceInput,
  SelectInput,
  NumberInput,
} from "react-admin";
import { CompositionTitle } from "../composition/CompositionTitle";
import { PlayerTitle } from "../player/PlayerTitle";

export const PositionCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <ReferenceInput
          source="composition.id"
          reference="Composition"
          label="Compositions"
        >
          <SelectInput optionText={CompositionTitle} />
        </ReferenceInput>
        <NumberInput step={1} label="number" source="number" />
        <ReferenceInput source="player.id" reference="Player" label="player">
          <SelectInput optionText={PlayerTitle} />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};

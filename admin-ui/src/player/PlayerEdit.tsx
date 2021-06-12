import * as React from "react";

import {
  Edit,
  SimpleForm,
  EditProps,
  NumberInput,
  DateInput,
  TextInput,
  BooleanInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";

import { TeamTitle } from "../team/TeamTitle";

export const PlayerEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <NumberInput step={1} label="age" source="age" />
        <DateInput label="birthday" source="birthday" />
        <TextInput label="displayName" source="displayName" />
        <TextInput label="firstName" source="firstName" />
        <BooleanInput label="isLegendary" source="isLegendary" />
        <TextInput label="lastName" source="lastName" />
        <TextInput label="number" source="number" />
        <ReferenceInput source="team.id" reference="Team" label="team">
          <SelectInput optionText={TeamTitle} />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  );
};

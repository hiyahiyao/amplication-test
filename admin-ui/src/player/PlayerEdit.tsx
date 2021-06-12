import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  TextInput,
  NumberInput,
} from "react-admin";

export const PlayerEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="displayName" source="displayName" />
        <TextInput label="firstName" source="firstName" />
        <TextInput label="lastName" source="lastName" />
        <NumberInput step={1} label="number" source="number" />
        <TextInput label="poste" source="poste" />
      </SimpleForm>
    </Edit>
  );
};

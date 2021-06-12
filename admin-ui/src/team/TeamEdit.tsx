import * as React from "react";
import { Edit, SimpleForm, EditProps, TextInput } from "react-admin";

export const TeamEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="firstColor" source="firstColor" />
        <TextInput label="illustration" source="illustration" />
        <TextInput label="name" source="name" />
        <TextInput label="secondColor" source="secondColor" />
        <TextInput label="thirdColor" source="thirdColor" />
      </SimpleForm>
    </Edit>
  );
};

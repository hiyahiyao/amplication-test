import * as React from "react";
import { Create, SimpleForm, CreateProps, TextInput } from "react-admin";

export const TeamCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="firstColor" source="firstColor" />
        <TextInput label="illustration" source="illustration" />
        <TextInput label="name" source="name" />
        <TextInput label="secondColor" source="secondColor" />
        <TextInput label="thirdColor" source="thirdColor" />
      </SimpleForm>
    </Create>
  );
};

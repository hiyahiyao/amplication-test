import * as React from "react";
import { Create, SimpleForm, CreateProps, TextInput } from "react-admin";

export const LegendaryPlayerCreate = (
  props: CreateProps
): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="fieldPoste" source="fieldPoste" />
        <TextInput label="name" source="name" />
      </SimpleForm>
    </Create>
  );
};

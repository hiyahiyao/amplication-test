import * as React from "react";
import { Edit, SimpleForm, EditProps, TextInput } from "react-admin";

export const LegendaryPlayerEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="fieldPoste" source="fieldPoste" />
        <TextInput label="name" source="name" />
      </SimpleForm>
    </Edit>
  );
};

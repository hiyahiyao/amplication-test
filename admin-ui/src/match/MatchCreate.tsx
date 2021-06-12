import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  TextInput,
  DateTimeInput,
} from "react-admin";

export const MatchCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="competition" source="competition" />
        <DateTimeInput label="endDate" source="endDate" />
        <TextInput label="score" source="score" />
        <TextInput label="stadium" source="stadium" />
        <DateTimeInput label="startDate" source="startDate" />
      </SimpleForm>
    </Create>
  );
};

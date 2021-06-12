import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  TextInput,
  DateTimeInput,
} from "react-admin";

export const MatchEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="competition" source="competition" />
        <DateTimeInput label="endDate" source="endDate" />
        <TextInput label="score" source="score" />
        <TextInput label="stadium" source="stadium" />
        <DateTimeInput label="startDate" source="startDate" />
      </SimpleForm>
    </Edit>
  );
};

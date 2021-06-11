import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  ShowProps,
  DateField,
  TextField,
} from "react-admin";

export const TeamShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <DateField source="createdAt" label="Created At" />
        <TextField label="firstColor" source="firstColor" />
        <TextField label="ID" source="id" />
        <TextField label="illustration" source="illustration" />
        <TextField label="name" source="name" />
        <TextField label="secondColor" source="secondColor" />
        <TextField label="thirdColor" source="thirdColor" />
        <DateField source="updatedAt" label="Updated At" />
      </SimpleShowLayout>
    </Show>
  );
};

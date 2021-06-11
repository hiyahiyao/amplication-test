import * as React from "react";
import { Create, SimpleForm, CreateProps, NumberInput } from "react-admin";

export const PositionCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <NumberInput step={1} label="number" source="number" />
      </SimpleForm>
    </Create>
  );
};

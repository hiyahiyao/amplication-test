import * as React from "react";

import {
  Edit,
  SimpleForm,
  EditProps,
  TextInput,
  NumberInput,
  BooleanInput,
  PasswordInput,
  SelectArrayInput,
} from "react-admin";

import { ROLES_OPTIONS } from "../user/RolesOptions";

export const UserEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="address" source="address" />
        <TextInput label="First Name" source="firstName" />
        <NumberInput step={1} label="gender" source="gender" />
        <BooleanInput
          label="isStadiumSubscriber"
          source="isStadiumSubscriber"
        />
        <TextInput label="Last Name" source="lastName" />
        <PasswordInput label="Password" source="password" disabled />
        <TextInput label="postalCode" source="postalCode" />
        <SelectArrayInput
          source="roles"
          choices={ROLES_OPTIONS}
          optionText="label"
          optionValue="value"
        />
        <TextInput label="Username" source="username" />
      </SimpleForm>
    </Edit>
  );
};

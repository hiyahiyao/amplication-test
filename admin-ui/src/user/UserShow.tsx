import * as React from "react";

import {
  Show,
  SimpleShowLayout,
  ShowProps,
  TextField,
  DateField,
  BooleanField,
  ReferenceField,
} from "react-admin";

import { TEAM_TITLE_FIELD } from "../team/TeamTitle";

export const UserShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField label="address" source="address" />
        <DateField source="createdAt" label="Created At" />
        <TextField label="First Name" source="firstName" />
        <TextField label="gender" source="gender" />
        <TextField label="ID" source="id" />
        <BooleanField
          label="isStadiumSubscriber"
          source="isStadiumSubscriber"
        />
        <TextField label="Last Name" source="lastName" />
        <TextField label="postalCode" source="postalCode" />
        <TextField label="Roles" source="roles" />
        <ReferenceField label="team" source="team.id" reference="Team">
          <TextField source={TEAM_TITLE_FIELD} />
        </ReferenceField>
        <DateField source="updatedAt" label="Updated At" />
        <TextField label="Username" source="username" />
      </SimpleShowLayout>
    </Show>
  );
};

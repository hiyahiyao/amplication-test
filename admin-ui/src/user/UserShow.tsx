import * as React from "react";

import {
  Show,
  SimpleShowLayout,
  ShowProps,
  TextField,
  DateField,
  BooleanField,
  ReferenceManyField,
  Datagrid,
  ReferenceField,
} from "react-admin";

import { MATCH_TITLE_FIELD } from "../match/MatchTitle";
import { POSITION_TITLE_FIELD } from "../position/PositionTitle";
import { TEAM_TITLE_FIELD } from "../team/TeamTitle";
import { USER_TITLE_FIELD } from "./UserTitle";

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
        <DateField source="updatedAt" label="Updated At" />
        <TextField label="Username" source="username" />
        <ReferenceManyField
          reference="Composition"
          target="UserId"
          label="Compositions"
        >
          <Datagrid rowClick="show">
            <DateField source="createdAt" label="Created At" />
            <TextField label="ID" source="id" />
            <ReferenceField label="match" source="match.id" reference="Match">
              <TextField source={MATCH_TITLE_FIELD} />
            </ReferenceField>
            <ReferenceField
              label="position"
              source="position.id"
              reference="Position"
            >
              <TextField source={POSITION_TITLE_FIELD} />
            </ReferenceField>
            <ReferenceField label="team" source="team.id" reference="Team">
              <TextField source={TEAM_TITLE_FIELD} />
            </ReferenceField>
            <DateField source="updatedAt" label="Updated At" />
            <ReferenceField label="User" source="user.id" reference="User">
              <TextField source={USER_TITLE_FIELD} />
            </ReferenceField>
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
};

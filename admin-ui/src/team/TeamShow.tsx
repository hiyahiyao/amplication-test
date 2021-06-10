import * as React from "react";

import {
  Show,
  SimpleShowLayout,
  ShowProps,
  DateField,
  TextField,
  ReferenceManyField,
  Datagrid,
  ReferenceField,
  BooleanField,
} from "react-admin";

import { MATCH_TITLE_FIELD } from "../match/MatchTitle";
import { TEAM_TITLE_FIELD } from "./TeamTitle";
import { USER_TITLE_FIELD } from "../user/UserTitle";

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
        <ReferenceManyField
          reference="Composition"
          target="TeamId"
          label="Compositions"
        >
          <Datagrid rowClick="show">
            <DateField source="createdAt" label="Created At" />
            <TextField label="ID" source="id" />
            <ReferenceField label="match" source="match.id" reference="Match">
              <TextField source={MATCH_TITLE_FIELD} />
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
        <ReferenceManyField reference="Match" target="TeamId" label="Matches">
          <Datagrid rowClick="show">
            <ReferenceField label="awayTeam" source="team.id" reference="Team">
              <TextField source={TEAM_TITLE_FIELD} />
            </ReferenceField>
            <TextField label="competition" source="competition" />
            <DateField source="createdAt" label="Created At" />
            <ReferenceField label="homeTeam" source="team.id" reference="Team">
              <TextField source={TEAM_TITLE_FIELD} />
            </ReferenceField>
            <TextField label="ID" source="id" />
            <TextField label="score" source="score" />
            <TextField label="stadium" source="stadium" />
            <TextField label="startDate" source="startDate" />
            <DateField source="updatedAt" label="Updated At" />
          </Datagrid>
        </ReferenceManyField>
        <ReferenceManyField reference="Match" target="TeamId" label="Matches">
          <Datagrid rowClick="show">
            <ReferenceField label="awayTeam" source="team.id" reference="Team">
              <TextField source={TEAM_TITLE_FIELD} />
            </ReferenceField>
            <TextField label="competition" source="competition" />
            <DateField source="createdAt" label="Created At" />
            <ReferenceField label="homeTeam" source="team.id" reference="Team">
              <TextField source={TEAM_TITLE_FIELD} />
            </ReferenceField>
            <TextField label="ID" source="id" />
            <TextField label="score" source="score" />
            <TextField label="stadium" source="stadium" />
            <TextField label="startDate" source="startDate" />
            <DateField source="updatedAt" label="Updated At" />
          </Datagrid>
        </ReferenceManyField>
        <ReferenceManyField reference="Player" target="TeamId" label="Players">
          <Datagrid rowClick="show">
            <TextField label="age" source="age" />
            <TextField label="birthday" source="birthday" />
            <DateField source="createdAt" label="Created At" />
            <TextField label="displayName" source="displayName" />
            <TextField label="firstName" source="firstName" />
            <TextField label="ID" source="id" />
            <BooleanField label="isLegendary" source="isLegendary" />
            <TextField label="lastName" source="lastName" />
            <TextField label="number" source="number" />
            <ReferenceField label="team" source="team.id" reference="Team">
              <TextField source={TEAM_TITLE_FIELD} />
            </ReferenceField>
            <DateField source="updatedAt" label="Updated At" />
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
};

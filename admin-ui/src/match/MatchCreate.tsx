import * as React from "react";

import {
  Create,
  SimpleForm,
  CreateProps,
  ReferenceInput,
  SelectInput,
  TextInput,
  DateTimeInput,
} from "react-admin";

import { TeamTitle } from "../team/TeamTitle";

export const MatchCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <ReferenceInput source="team.id" reference="Team" label="awayTeam">
          <SelectInput optionText={TeamTitle} />
        </ReferenceInput>
        <TextInput label="competition" source="competition" />
        <ReferenceInput source="team.id" reference="Team" label="homeTeam">
          <SelectInput optionText={TeamTitle} />
        </ReferenceInput>
        <TextInput label="score" source="score" />
        <TextInput label="stadium" source="stadium" />
        <DateTimeInput label="startDate" source="startDate" />
      </SimpleForm>
    </Create>
  );
};

import * as React from "react";

import {
  Show,
  SimpleShowLayout,
  ShowProps,
  TextField,
  DateField,
  BooleanField,
  ReferenceField,
  ReferenceManyField,
  Datagrid,
} from "react-admin";

import { COMPOSITION_TITLE_FIELD } from "../composition/CompositionTitle";
import { PLAYER_TITLE_FIELD } from "./PlayerTitle";
import { TEAM_TITLE_FIELD } from "../team/TeamTitle";

export const PlayerShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
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
        <ReferenceManyField
          reference="Position"
          target="PlayerId"
          label="Positions"
        >
          <Datagrid rowClick="show">
            <ReferenceField
              label="Compositions"
              source="composition.id"
              reference="Composition"
            >
              <TextField source={COMPOSITION_TITLE_FIELD} />
            </ReferenceField>
            <DateField source="createdAt" label="Created At" />
            <TextField label="ID" source="id" />
            <TextField label="number" source="number" />
            <ReferenceField
              label="player"
              source="player.id"
              reference="Player"
            >
              <TextField source={PLAYER_TITLE_FIELD} />
            </ReferenceField>
            <DateField source="updatedAt" label="Updated At" />
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
};

import * as React from "react";

import {
  Show,
  SimpleShowLayout,
  ShowProps,
  DateField,
  TextField,
  ReferenceField,
  ReferenceManyField,
  Datagrid,
} from "react-admin";

import { COMPOSITION_TITLE_FIELD } from "./CompositionTitle";
import { PLAYER_TITLE_FIELD } from "../player/PlayerTitle";
import { MATCH_TITLE_FIELD } from "../match/MatchTitle";
import { USER_TITLE_FIELD } from "../user/UserTitle";

export const CompositionShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <DateField source="createdAt" label="Created At" />
        <TextField label="ID" source="id" />
        <ReferenceField label="match" source="match.id" reference="Match">
          <TextField source={MATCH_TITLE_FIELD} />
        </ReferenceField>
        <DateField source="updatedAt" label="Updated At" />
        <ReferenceField label="User" source="user.id" reference="User">
          <TextField source={USER_TITLE_FIELD} />
        </ReferenceField>
        <ReferenceManyField
          reference="Position"
          target="CompositionId"
          label="Positions"
        >
          <Datagrid rowClick="show">
            <ReferenceField
              label="composition"
              source="composition.id"
              reference="Composition"
            >
              <TextField source={COMPOSITION_TITLE_FIELD} />
            </ReferenceField>
            <DateField source="createdAt" label="Created At" />
            <TextField label="fieldPosition" source="fieldPosition" />
            <TextField label="ID" source="id" />
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

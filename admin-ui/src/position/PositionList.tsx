import * as React from "react";
import {
  List,
  Datagrid,
  ListProps,
  ReferenceField,
  TextField,
  DateField,
} from "react-admin";
import Pagination from "../Components/Pagination";
import { COMPOSITION_TITLE_FIELD } from "../composition/CompositionTitle";
import { PLAYER_TITLE_FIELD } from "../player/PlayerTitle";

export const PositionList = (props: ListProps): React.ReactElement => {
  return (
    <List
      {...props}
      bulkActionButtons={false}
      title={"Positions"}
      perPage={50}
      pagination={<Pagination />}
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
        <ReferenceField label="player" source="player.id" reference="Player">
          <TextField source={PLAYER_TITLE_FIELD} />
        </ReferenceField>
        <DateField source="updatedAt" label="Updated At" />
      </Datagrid>
    </List>
  );
};

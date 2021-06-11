import * as React from "react";
import { List, Datagrid, ListProps, DateField, TextField } from "react-admin";
import Pagination from "../Components/Pagination";

export const TeamList = (props: ListProps): React.ReactElement => {
  return (
    <List
      {...props}
      bulkActionButtons={false}
      title={"Teams"}
      perPage={50}
      pagination={<Pagination />}
    >
      <Datagrid rowClick="show">
        <DateField source="createdAt" label="Created At" />
        <TextField label="firstColor" source="firstColor" />
        <TextField label="ID" source="id" />
        <TextField label="illustration" source="illustration" />
        <TextField label="name" source="name" />
        <TextField label="secondColor" source="secondColor" />
        <TextField label="thirdColor" source="thirdColor" />
        <DateField source="updatedAt" label="Updated At" />
      </Datagrid>
    </List>
  );
};

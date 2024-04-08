import { OpenButton } from "@/helpers/OpenDialog";

export const COLUMNS_DEFS = [
  { field: "id", flex: 1 },
  { field: "name", flex: 2 },
  { field: "email", flex: 2 },
  { field: "phone", flex: 2 },
  { field: "contactEmail", flex: 2 },
  { field: "industry", flex: 2 },
  { headerName: 'Type', field: "__typename", flex: 2 },
  { field: "Actions", cellRenderer: OpenButton, flex: 2, sortable: false },
];
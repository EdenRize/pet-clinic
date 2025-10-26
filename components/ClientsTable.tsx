import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { IClient } from "models/clients.interface";

interface ClientsTableProps {
  clients: IClient[];
  onEditClient: (client: IClient) => void;
}

export const ClientsTable = ({ clients, onEditClient }: ClientsTableProps) => {
  const columnHelper = createColumnHelper<IClient>();

  const columns = [
    columnHelper.accessor("name", { header: "Client Name" }),
    columnHelper.accessor("phone", { header: "Phone" }),
    columnHelper.accessor("petName", { header: "Pet Name" }),
    columnHelper.accessor("petAge", { header: "Pet Age" }),
    columnHelper.accessor("petType", { header: "Pet Type" }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (props) => (
        <IconButton
          onClick={() => onEditClient(props.row.original)}
          size="small"
          color="primary"
        >
          <EditIcon />
        </IconButton>
      ),
    }),
  ];

  const table = useReactTable({
    data: clients,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

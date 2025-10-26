import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
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
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import { IClient } from "models/clients.interface";

interface ClientsTableProps {
  clients: IClient[];
  onEditClient: (client: IClient) => void;
}

export const ClientsTable = ({ clients, onEditClient }: ClientsTableProps) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const columnHelper = createColumnHelper<IClient>();

  const createSortableHeader =
    (label: string) =>
    ({ column }: any) =>
      (
        <Box
          display={"flex"}
          alignItems={"center"}
          gap={1}
          sx={{ cursor: "pointer" }}
          onClick={() => column.toggleSorting()}
        >
          {label}
          {column.getIsSorted() === "asc" ? (
            <ArrowUpwardIcon fontSize="small" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDownwardIcon fontSize="small" />
          ) : (
            <UnfoldMoreIcon fontSize="small" />
          )}
        </Box>
      );

  const caseInsensitiveSortingFn =
    (accessor: string) => (rowA: any, rowB: any) => {
      const a = rowA.getValue(accessor).toLowerCase();
      const b = rowB.getValue(accessor).toLowerCase();
      return a.localeCompare(b);
    };

  const columns = [
    columnHelper.accessor("name", {
      header: createSortableHeader("Client Name"),
      enableSorting: true,
      sortingFn: caseInsensitiveSortingFn("name"),
    }),
    columnHelper.accessor("phone", { header: "Phone" }),
    columnHelper.accessor("petName", {
      header: createSortableHeader("Pet Name"),
      enableSorting: true,
      sortingFn: caseInsensitiveSortingFn("petName"),
    }),
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
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
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

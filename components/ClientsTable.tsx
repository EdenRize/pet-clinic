import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
  ColumnFiltersState,
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
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import { IClient } from "models/clients.interface";
import { useState, useEffect } from "react";

interface ClientsTableProps {
  clients: IClient[];
  onEditClient: (client: IClient) => void;
}

const ClientNameHeader = React.memo(({ column }: any) => {
  return (
    <Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        gap={1}
        sx={{ cursor: "pointer" }}
        onClick={() => column.toggleSorting()}
      >
        Client Name
        {column.getIsSorted() === "asc" ? (
          <ArrowUpwardIcon fontSize="small" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDownwardIcon fontSize="small" />
        ) : (
          <UnfoldMoreIcon fontSize="small" />
        )}
      </Box>
      <TextField
        size="small"
        placeholder="Search Client Name..."
        value={(column.getFilterValue() ?? "") as string}
        onChange={(e) => column.setFilterValue(e.target.value)}
        onClick={(e) => e.stopPropagation()}
        sx={{ mt: 1, width: "100%" }}
      />
    </Box>
  );
});

const PetNameHeader = React.memo(({ column }: any) => {
  return (
    <Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        gap={1}
        sx={{ cursor: "pointer" }}
        onClick={() => column.toggleSorting()}
      >
        Pet Name
        {column.getIsSorted() === "asc" ? (
          <ArrowUpwardIcon fontSize="small" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDownwardIcon fontSize="small" />
        ) : (
          <UnfoldMoreIcon fontSize="small" />
        )}
      </Box>
      <TextField
        size="small"
        placeholder="Search Pet Name..."
        value={(column.getFilterValue() ?? "") as string}
        onChange={(e) => column.setFilterValue(e.target.value)}
        onClick={(e) => e.stopPropagation()}
        sx={{ mt: 1, width: "100%" }}
      />
    </Box>
  );
});

export const ClientsTable = ({ clients, onEditClient }: ClientsTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const columnHelper = createColumnHelper<IClient>();

  const caseInsensitiveSortingFn =
    (accessor: string) => (rowA: any, rowB: any) => {
      const a = rowA.getValue(accessor).toLowerCase();
      const b = rowB.getValue(accessor).toLowerCase();
      return a.localeCompare(b);
    };

  const columns = React.useMemo(
    () => [
      columnHelper.accessor("name", {
        header: ClientNameHeader,
        enableSorting: true,
        sortingFn: caseInsensitiveSortingFn("name"),
        filterFn: "includesString",
      }),
      columnHelper.accessor("phone", { header: "Phone" }),
      columnHelper.accessor("petName", {
        header: PetNameHeader,
        enableSorting: true,
        sortingFn: caseInsensitiveSortingFn("petName"),
        filterFn: "includesString",
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
    ],
    [columnHelper, onEditClient],
  );

  const table = useReactTable({
    data: clients,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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

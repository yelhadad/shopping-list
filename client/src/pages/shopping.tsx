import React from "react";
import ReactDOM from "react-dom";

import {
  ScopedCssBaseline,
  Button,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
import { setConstantValue } from "typescript";

interface Column {
  id: "item" | "quantity" | "id";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "id", label: "id", minWidth: 170 },
  { id: "item", label: "item", minWidth: 100 },
  { id: "quantity", label: "quantity", minWidth: 100 },
];

interface Data {
  id: number;
  item: string;
  quantity: number;
}

function createData(id: number, item: string, quantity: number): Data {
  return { id, item, quantity };
}

export default function Shopping() {
  let shoppingList;
  const fetchItems = async () => {
    try {
      const res = await axios.get("/api/shopping/all");
      shoppingList = res.data;
      return res.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  const [rows, setRows] = React.useState<Data[]>([]);
  React.useEffect(() => {
    console.log("useEffect runs");
    shoppingList = fetchItems();
    setRows([
      createData(1, "India", 1324171354),
      createData(2, "China", 1403500365),
      createData(3, "Italy", 60483973),
      createData(4, "United States", 327167434),
    ]);
  }, []);

  const remove = (index: number) => {
    setRows([...rows.slice(0, index), ...rows.slice(index + 1)]);
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.item}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <>
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        </>
                      );
                    })}
                    <TableCell>
                      <Button
                        color="error"
                        onClick={() => {
                          setRows([
                            ...rows.slice(0, index),
                            ...rows.slice(index + 1),
                          ]);
                        }}
                      >
                        remove
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

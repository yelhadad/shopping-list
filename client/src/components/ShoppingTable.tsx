import React, { FC } from "react";
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
  IconButton,
  TextField,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

interface Row {
  data: any[];
  i: number;
  header: any[];
  startEditing: Function;
  editIdx: number;
  handleRemove: Function;
  handleChange: Function;
  stopEditing: Function;
}

const Row: FC<Row> = ({
  data,
  i,
  header,
  handleRemove,
  startEditing,
  editIdx,
  handleChange,
  stopEditing,
}) => {
  const currentlyEditing = editIdx === i;
  return (
    <TableRow key={`tr-${i}`}>
      {header.map((cell, k) => (
        <TableCell key={`trc-${k}`}>
          {currentlyEditing ? (
            <TextField
              name={cell.prop}
              onChange={(e) => handleChange(e, cell.prop, i)}
              value={data[cell.prop]}
            />
          ) : (
            data[cell.prop]
          )}
        </TableCell>
      ))}
      <TableCell>
        {currentlyEditing ? (
          <CheckIcon onClick={() => stopEditing()} />
        ) : (
          <EditIcon onClick={() => startEditing(i)} />
        )}
      </TableCell>
      <TableCell>
        <RemoveCircleOutlineIcon onClick={() => handleRemove(i)} />
      </TableCell>
    </TableRow>
  );
};

interface ShoppingTableint {
  header: any[];
  startEditing: Function;
  editIdx: number;
  handleRemove: Function;
  handleChange: Function;
  stopEditing: Function;
  data: any[];
}

const ShoppingTable: FC<ShoppingTableint> = ({
  data,
  header,
  handleRemove,
  startEditing,
  editIdx,
  handleChange,
  stopEditing,
}) => {
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            {header.map((x, i) => (
              <TableHead key={`thc-${i}`}>{x.name}</TableHead>
            ))}
            <TableHead />
            <TableHead />
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((data, i) =>
            Row({
              data,
              i,
              header,
              handleRemove,
              startEditing,
              editIdx,
              handleChange,
              stopEditing,
            })
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default ShoppingTable;

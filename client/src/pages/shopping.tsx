import React, { Component } from "react";
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
import ShoppingTable from "../components/ShoppingTable";

export default function Shopping() {
  const [data, setData] = React.useState<any[]>([]);
  const [editIdx, setEditIdx] = React.useState(-1);

  const [inputItem, setInputItem] = React.useState("");
  const [inputQuantity, setInputQuantity] = React.useState<string>("");

  const handleRemove = (i: number) => {
    setData(data.filter((row, j) => j !== i));
  };

  const startEditing = (i: number) => {
    setEditIdx(i);
  };

  const stopEditing = () => {
    setEditIdx(-1);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: any,
    i: number
  ) => {
    const { value } = e.target;
    setData(data.map((row, j) => (j === i ? { ...row, [name]: value } : row)));
  };

  return (
    <>
      <Paper component="form">
        <TextField
          label="item"
          onChange={(e) => setInputItem(e.target.value)}
        />
        <TextField
          type="number"
          label="quantity"
          onChange={(e) => setInputQuantity(e.target.value)}
        />
        <Button
          color="success"
          onSubmit={() => {
            //@ts-ignore
            setData(...data, [inputItem, inputQuantity]);
          }}
        >
          add
        </Button>
      </Paper>
      <ShoppingTable
        handleRemove={handleRemove}
        startEditing={startEditing}
        editIdx={editIdx}
        stopEditing={stopEditing}
        handleChange={handleChange}
        data={data}
        header={[
          {
            name: "item",
            prop: "item",
          },
          {
            name: "quantity",
            prop: "quantity",
          },
        ]}
      />
    </>
  );
}

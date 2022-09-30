import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, IconButton, TextField } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useState, useEffect } from "react";
import axios from "axios";
import { Console } from "console";

type Row = (string | number)[];

const EmptyLine = ({
  setIsAddingFalse,
  addRow,
}: {
  setIsAddingFalse: () => void;
  addRow: (row: Row) => void;
}) => {
  const [row, setRow] = useState<Row>(["", "", ""]);
  const onSubmit = async () => {
    console.log("onSummit runs");
    try {
      let res = await axios.post("/api/shopping/insert_one", {
        product: row[1],
        quantity: row[2],
      });
      addRow(row);
      setIsAddingFalse();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      {row.map((cell, j) => (
        <TableCell align="center" key={"cell" + j}>
          <TextField
            name="cell"
            variant="standard"
            value={cell}
            onChange={(e) => {
              let newRow = [...row];
              newRow[j] = e.target.value;
              setRow(newRow);
            }}
          />
        </TableCell>
      ))}
      <IconButton onClick={setIsAddingFalse}>
        <ClearIcon />
      </IconButton>
      <IconButton onClick={onSubmit}>
        <CheckIcon />
      </IconButton>
    </TableRow>
  );
};

export default function ShoppingTest() {
  const [editIndex, setEditIndex] = useState(-1);
  const [isAdding, setIsAdding] = useState(false);
  const [rows, setRows] = useState<Row[]>([]);
  const [editedRow, setEditedRow] = useState<Row>([]);

  const startEditing = (index: number) => {
    setEditIndex(index);
  };

  const finishEditing = () => {
    setEditIndex(-1);
  };

  const setIsAddingFalse = () => {
    setIsAdding(false);
  };

  const removeRow = async (row: Row, i: number) => {
    try {
      let res = await axios.post("/api/shopping/delete_item", {
        id: row[0],
      });
      setRows([...rows.slice(0, i), ...rows.slice(i + 1)]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAll = async () => {
    try {
      let res = await axios.get("/api/shopping/all");
      console.log(res.data);
      setRows(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addRow = (row: Row) => {
    const newRowsArr = [...rows];
    newRowsArr.push(row);
    setRows(newRowsArr);
  };

  const editRow = async (row: Row, index: number, value: number | string) => {
    let newRowArr = [...row];
    newRowArr[index] = value;
    setEditedRow(newRowArr);
  };

  const saveEditRow = async (row: Row, rowIndex: number) => {
    try {
      let res = await axios.put("/api/shopping/change_item", {
        id: row[0],
        product: row[1],
        quantity: row[2],
      });
      let newRowsArr = [...rows];
      newRowsArr[rowIndex] = [...row];
      setRows(newRowsArr);
      setEditedRow([]);
    } catch (error) {
      console.log(error);
    }
    setEditIndex(-1);
    setEditedRow([]);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="sticky table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center">id</TableCell>
              <TableCell align="center">product (100g serving)</TableCell>
              <TableCell align="center">quantity</TableCell>
              <TableCell align="left">
                <Button onClick={() => setIsAdding(true)}>add line</Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isAdding ? (
              <EmptyLine setIsAddingFalse={setIsAddingFalse} addRow={addRow} />
            ) : null}
            {rows.map((row, i) => {
              return (
                <TableRow
                  key={"row" + i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {row.map((cell, j) => (
                    <TableCell align="center" key={"cell" + j}>
                      {editIndex === i ? (
                        <TextField
                          name="cell"
                          variant="standard"
                          defaultValue={cell}
                          onChange={(e) => editRow(row, j, e.target.value)}
                        />
                      ) : (
                        cell
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    <IconButton color="error" onClick={() => removeRow(row, i)}>
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    {editIndex !== i ? (
                      <IconButton onClick={() => setEditIndex(i)}>
                        <EditIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        color="success"
                        onClick={() => saveEditRow(editedRow, i)}
                      >
                        <CheckIcon />
                      </IconButton>
                    )}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

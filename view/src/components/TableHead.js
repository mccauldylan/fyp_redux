import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import EditIcon from "@material-ui/icons/Edit";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const StyledTableCell = withStyles((theme) => ({}))(TableCell);

const StyledTableRow = withStyles((theme) => ({}))(TableRow);

class MyTableHead extends Component {
  render() {
    return (
      <div>
        <TableRow>
          <TableCell style={{ width: "5%" }} align="left">
            Index
          </TableCell>
          <TableCell style={{ width: "10%" }} align="left">
            Clinic Visit
          </TableCell>
          <TableCell style={{ width: "40%" }} align="left">
            Info
          </TableCell>
          <TableCell style={{ width: "10%" }} align="left">
            Datatype
          </TableCell>
          <TableCell style={{ width: "10%" }} align="left">
            Options
          </TableCell>
          <TableCell style={{ width: "5%" }} align="left">
            Approve
          </TableCell>
          <TableCell style={{ width: "5%" }} align="left">
            Disapprove
          </TableCell>
          <TableCell style={{ width: "5%" }} align="left"></TableCell>
          <TableCell style={{ width: "5%" }} align="left"></TableCell>
        </TableRow>
      </div>
    );
  }
}

export default MyTableHead;

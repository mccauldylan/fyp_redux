import React, { Component } from "react";
import PropTypes from "prop-types";

// MUI Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
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

// components
import MyTableHead from "./TableHead";
import MyTableRow from "./MyTableRow";

// Icons
import ChatIcon from "@material-ui/icons/Chat";
// Redux
import { connect } from "react-redux";

class MyTable extends Component {
  render() {
    const { category } = this.props;
    return (
      <div>
        {/* <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <MyTableHead />
              </TableHead>
              <TableBody>
                {category.map((row) => {
                  <TableRow key={row.rowId}>
                    <TableCell>{row.index}</TableCell>
                    <TableCell>{row.visit}</TableCell>
                    <TableCell>{row.body}</TableCell>
                    <TableCell>{row.dataType}</TableCell>
                    <TableCell>{row.approveCount}</TableCell>
                    <TableCell>{row.disapproveCount}</TableCell>
                  </TableRow>;
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper> */}
        <ul>
          {category.map((row) => {
            <li>{row.body}</li>;
          })}
        </ul>
      </div>
    );
  }
}

Table.propTypes = {
  user: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(MyTable);

import React, { Component } from "react";
import Profile from "../components/Profile";
import { connect } from "react-redux";
import { getCategory } from "../redux/actions/dataActions";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import MyTableHead from "../components/TableHead";
import Paper from "@material-ui/core/Paper";
import MyForm from "../components/MyForm";
import MyDelete from "../components/buttons/MyDelete";
import MyEdit from "../components/buttons/MyEdit";

class document extends Component {
  componentDidMount() {
    const categoryId = this.props.match.params.categoryId;
    this.props.getCategory(categoryId);
  }

  render() {
    const categoryId = this.props.match.params.categoryId;

    const { category, loading } = this.props.data;
    let placeholder = !loading ? (
      <div>
        <center>
          <h1>{categoryId}</h1>
          <h1> </h1>
        </center>

        <br></br>
        <Paper>
          <TableContainer>
            <TableHead>
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
            </TableHead>
            <TableBody>
              {category.map((row) => (
                <TableRow key={row.rowId}>
                  <TableCell align="left">{row.index}</TableCell>
                  <TableCell align="left">{row.visit}</TableCell>
                  <TableCell align="left">{row.body}</TableCell>
                  <TableCell align="left">{row.dataType}</TableCell>
                  <TableCell align="left">
                    {/* <MyOptions rowId={row.rowId} /> */}
                  </TableCell>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left">
                    <MyEdit
                      index={row.index}
                      visit={row.visit}
                      body={row.body}
                      dataType={row.dataType}
                      rowId={row.rowId}
                      categoryId={categoryId}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <MyDelete rowId={row.rowId} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableContainer>
        </Paper>
        <br></br>
        <MyForm categoryId={categoryId} />
      </div>
    ) : (
      <p>Loading...</p>
    );
    return <div>{placeholder}</div>;
  }
}

document.propTypes = {
  getCategory: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getCategory })(document);

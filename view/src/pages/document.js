import React, { Component } from "react";
import Profile from "../components/Profile";
import { connect } from "react-redux";
import { getCategory } from "../redux/actions/dataActions";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
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
import ApproveButton from "../components/buttons/ApproveButton";
import DisapproveButton from "../components/buttons/DisapproveButton";
import ValidateButton from "../components/buttons/ValidateButton";

import Button from "@material-ui/core/Button";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MyOptions from "../components/buttons/Options/MyOptions";
import RowComments from "../components/buttons/RowComments/RowComments";

import Comments from "../components/Comments";

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
                  Vote to Include
                </TableCell>
                <TableCell style={{ width: "5%" }} align="left">
                  Vote to Disclude
                </TableCell>
                <TableCell style={{ width: "5%" }} align="center"></TableCell>

                {this.props.user.credentials.isAdmin ? (
                  <TableCell style={{ width: "5%" }} align="left"></TableCell>
                ) : null}
                {this.props.user.credentials.isAdmin ? (
                  <TableCell style={{ width: "5%" }} align="left"></TableCell>
                ) : null}
                {this.props.user.credentials.isSuperUser ? (
                  <TableCell style={{ width: "5%" }} align="left"></TableCell>
                ) : null}
              </TableRow>
            </TableHead>
            <TableBody>
              {category?.map((row) => (
                <TableRow key={row.rowId}>
                  <TableCell align="left">{row.index}</TableCell>
                  <TableCell align="left">{row.visit}</TableCell>
                  {row.index.length > 1 ? (
                    <TableCell align="left">
                      <span></span>
                      {row.body}
                    </TableCell>
                  ) : (
                    <TableCell align="left">{row.body}</TableCell>
                  )}
                  <TableCell align="left">{row.dataType}</TableCell>
                  <TableCell align="left">
                    <MyOptions rowId={row.rowId} categoryId={categoryId} />
                  </TableCell>
                  <TableCell align="center">
                    <ApproveButton rowId={row.rowId} />
                    {row.approveCount}
                  </TableCell>
                  <TableCell align="center">
                    <DisapproveButton rowId={row.rowId} />
                    {row.disapproveCount}
                  </TableCell>
                  {this.props.user.credentials.isSuperUser ? (
                    <TableCell align="center">
                      <ValidateButton
                        rowId={row.rowId}
                        validated={row.validated}
                      />
                    </TableCell>
                  ) : null}
                  {this.props.user.credentials.isAdmin ? (
                    <TableCell align="center">
                      <MyEdit
                        index={row.index}
                        visit={row.visit}
                        body={row.body}
                        dataType={row.dataType}
                        rowId={row.rowId}
                        categoryId={categoryId}
                      />
                    </TableCell>
                  ) : null}
                  {this.props.user.credentials.isAdmin ? (
                    <TableCell align="center">
                      <MyDelete rowId={row.rowId} />
                    </TableCell>
                  ) : null}
                  <TableCell>
                    <RowComments rowId={row.rowId} categoryId={categoryId} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableContainer>
        </Paper>
        <br></br>
        {this.props.user.credentials.isAdmin ? (
          <MyForm categoryId={categoryId} />
        ) : null}
        <br></br>
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
  user: state.user,
});

export default connect(mapStateToProps, { getCategory })(document);

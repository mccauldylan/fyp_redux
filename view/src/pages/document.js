import React, { Component } from "react";

//MUI
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

// Redux
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCategory } from "../redux/actions/dataActions";

// Components
import MyOptions from "../components/buttons/Options/MyOptions";
import RowComments from "../components/buttons/RowComments/RowComments";
import MyForm from "../components/MyForm";
import MyDelete from "../components/buttons/MyDelete";
import MyEdit from "../components/buttons/MyEdit";
import ApproveButton from "../components/buttons/ApproveButton";
import DisapproveButton from "../components/buttons/DisapproveButton";
import ValidateButton from "../components/buttons/ValidateButton";
import NaButton from "../components/buttons/NaButton";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#fff",
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

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
        <TableContainer>
          <TableHead>
            <TableRow>
              <TableCell colSpan={11} style={{ backgroundColor: "white" }}>
                <center>
                  <Typography variant="h5" component="h2">
                    {categoryId}
                  </Typography>
                </center>
              </TableCell>
            </TableRow>
            <StyledTableRow>
              <StyledTableCell style={{ width: "5%" }} align="left">
                Index
              </StyledTableCell>
              <StyledTableCell style={{ width: "10%" }} align="left">
                Clinic Visit
              </StyledTableCell>
              <StyledTableCell style={{ width: "40%" }} align="left">
                Question
              </StyledTableCell>
              <StyledTableCell style={{ width: "10%" }} align="left">
                Datatype
              </StyledTableCell>
              <StyledTableCell style={{ width: "10%" }} align="left">
                Options
              </StyledTableCell>
              <StyledTableCell style={{ width: "5%" }} align="left">
                Vote to Include
              </StyledTableCell>
              <StyledTableCell style={{ width: "5%" }} align="left">
                Vote to Exclude
              </StyledTableCell>
              <StyledTableCell style={{ width: "5%" }} align="left">
                Vote N/A
              </StyledTableCell>
              <StyledTableCell
                style={{ width: "5%" }}
                align="center"
              ></StyledTableCell>

              {this.props.user.credentials.isAdmin ? (
                <StyledTableCell
                  style={{ width: "5%" }}
                  align="left"
                ></StyledTableCell>
              ) : null}
              {this.props.user.credentials.isAdmin ? (
                <StyledTableCell
                  style={{ width: "5%" }}
                  align="left"
                ></StyledTableCell>
              ) : null}
              {this.props.user.credentials.isSuperUser ? (
                <StyledTableCell
                  style={{ width: "5%" }}
                  align="left"
                ></StyledTableCell>
              ) : null}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {category?.map((row) => (
              <StyledTableRow key={row.rowId}>
                <StyledTableCell align="left">{row.index}</StyledTableCell>
                <StyledTableCell align="left">{row.visit}</StyledTableCell>
                {row.index.length > 1 ? (
                  <StyledTableCell align="left">
                    <span></span>
                    <b>{row.body}</b>
                  </StyledTableCell>
                ) : (
                  <StyledTableCell align="left">
                    <b>{row.body}</b>
                  </StyledTableCell>
                )}
                <StyledTableCell align="left">{row.dataType}</StyledTableCell>
                <StyledTableCell align="left">
                  <MyOptions rowId={row.rowId} categoryId={categoryId} />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <ApproveButton rowId={row.rowId} />
                  {row.approveCount}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <DisapproveButton rowId={row.rowId} />
                  {row.disapproveCount}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <NaButton rowId={row.rowId} />
                  {row.naCount}
                </StyledTableCell>
                {this.props.user.credentials.isSuperUser ? (
                  <StyledTableCell align="center">
                    <ValidateButton
                      rowId={row.rowId}
                      validated={row.validated}
                    />
                  </StyledTableCell>
                ) : null}
                {this.props.user.credentials.isAdmin ? (
                  <StyledTableCell align="center">
                    <MyEdit
                      index={row.index}
                      visit={row.visit}
                      body={row.body}
                      dataType={row.dataType}
                      rowId={row.rowId}
                      categoryId={categoryId}
                    />
                  </StyledTableCell>
                ) : null}
                <StyledTableCell>
                  <RowComments rowId={row.rowId} categoryId={categoryId} />
                </StyledTableCell>
                {this.props.user.credentials.isAdmin ? (
                  <StyledTableCell align="center">
                    <MyDelete rowId={row.rowId} />
                  </StyledTableCell>
                ) : null}
              </StyledTableRow>
            ))}
          </TableBody>
        </TableContainer>
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

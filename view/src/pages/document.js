import React, { Component } from "react";

//MUI
import Table from "@material-ui/core/Table";

import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
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
        <br></br>

        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell colSpan={12}>
                  <center>
                    <Typography variant="h5" color="textSecondary">
                      {categoryId}
                    </Typography>
                  </center>
                </TableCell>
              </TableRow>
              <StyledTableRow>
                {this.props.user.credentials.isAdmin ? (
                  <StyledTableCell style={{ width: "5%" }} align="left">
                    <Typography variant="subtitle2">Index</Typography>
                  </StyledTableCell>
                ) : null}
                <StyledTableCell style={{ width: "10%" }} align="left">
                  <Typography variant="subtitle2">Clinic Visit</Typography>
                </StyledTableCell>
                <StyledTableCell style={{ width: "40%" }} align="left">
                  <Typography variant="subtitle2">Question</Typography>
                </StyledTableCell>
                <StyledTableCell style={{ width: "10%" }} align="left">
                  <Typography variant="subtitle2">Datatype</Typography>
                </StyledTableCell>
                <StyledTableCell style={{ width: "10%" }} align="left">
                  <Typography variant="subtitle2">Options</Typography>
                </StyledTableCell>
                <StyledTableCell style={{ width: "5%" }} align="left">
                  <Typography variant="subtitle2">Vote to Include</Typography>
                </StyledTableCell>
                <StyledTableCell style={{ width: "5%" }} align="left">
                  <Typography variant="subtitle2">Vote to Exclude</Typography>
                </StyledTableCell>
                <StyledTableCell style={{ width: "5%" }} align="left">
                  <Typography variant="subtitle2">Vote N/A</Typography>
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
                <StyledTableRow
                  style={{ backgroundColor: row.validated ? "#90EE90" : "" }}
                  key={row.rowId}
                >
                  {this.props.user.credentials.isAdmin ? (
                    <StyledTableCell style={{ width: "5%" }} align="left">
                      <Typography>{row.index}</Typography>
                    </StyledTableCell>
                  ) : null}
                  <StyledTableCell align="left">
                    <Typography variant="subtitle2">{row.visit}</Typography>
                  </StyledTableCell>
                  {Number.isInteger(row.index) ? (
                    <StyledTableCell align="left">
                      <Typography variant="subtitle2">{row.body}</Typography>
                    </StyledTableCell>
                  ) : (
                    <StyledTableCell align="left">↪ {row.body}</StyledTableCell>
                  )}
                  <StyledTableCell align="left">
                    <Typography variant="subtitle2">{row.dataType}</Typography>
                  </StyledTableCell>
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
                  <StyledTableCell>
                    <RowComments rowId={row.rowId} categoryId={categoryId} />
                  </StyledTableCell>
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

                  {this.props.user.credentials.isAdmin ? (
                    <StyledTableCell align="center">
                      <MyDelete rowId={row.rowId} />
                    </StyledTableCell>
                  ) : null}
                </StyledTableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colspan={12}>
                  <Typography>
                    <span style={{ color: "#90EE90" }}>** Green </span>denotes a
                    validated row
                  </Typography>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
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

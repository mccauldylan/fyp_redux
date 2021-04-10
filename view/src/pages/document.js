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
    "&:nth-of-type(even)": {
      backgroundColor: "#fff",
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
        <div
          style={{
            backgroundImage: `url("https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dreamstime.com%2Fphotos-images%2Fmedical.html&psig=AOvVaw1FKwMXMvUhFuCbF_W4wZA5&ust=1618055944939000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKiksqGO8e8CFQAAAAAdAAAAABAN")`,
          }}
        ></div>
        <br></br>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell colSpan={12}>
                  <center>
                    <Typography variant="h3" color="textPrimary">
                      {categoryId}
                    </Typography>
                  </center>
                  <br></br>
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
                <StyledTableCell style={{ width: "10%" }} align="center">
                  <Typography variant="subtitle2">Options</Typography>
                </StyledTableCell>
                <StyledTableCell style={{ width: "5%" }} align="center">
                  <Typography variant="subtitle2">Include</Typography>
                </StyledTableCell>
                <StyledTableCell style={{ width: "5%" }} align="center">
                  <Typography variant="subtitle2">Exclude</Typography>
                </StyledTableCell>
                <StyledTableCell style={{ width: "5%" }} align="center">
                  <Typography variant="subtitle2">N/A</Typography>
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
                    <StyledTableCell align="left">
                      <Typography variant="subtitle3">﹥ {row.body}</Typography>
                    </StyledTableCell>
                  )}
                  <StyledTableCell align="left">
                    <Typography variant="subtitle2">{row.dataType}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <MyOptions rowId={row.rowId} categoryId={categoryId} />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <ApproveButton rowId={row.rowId} />
                    <Typography>{row.approveCount}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <DisapproveButton rowId={row.rowId} />
                    <Typography>{row.disapproveCount}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <NaButton rowId={row.rowId} />
                    <Typography>{row.naCount}</Typography>
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

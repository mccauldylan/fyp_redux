import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
// MUI Stuff
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

// Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
// Redux stuff
import { connect } from "react-redux";
import {
  getRow,
  clearErrors,
  postOption,
} from "../../../redux/actions/dataActions";

class MyOptions extends Component {
  state = {
    open: false,
    oldPath: "",
    newPath: "",
    index: "",
    body: "",
  };

  handleOpen = () => {
    let oldPath = window.location.pathname;

    const { categoryId, rowId } = this.props;
    const newPath = `/categories/${categoryId}/row/${rowId}`;

    if (oldPath === newPath) oldPath = `/categories/${categoryId}`;

    window.history.pushState(null, null, newPath);

    this.setState({ open: true, oldPath, newPath });
    this.props.getRow(this.props.rowId);
  };
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const newOption = {
      index: this.state.index,
      body: this.state.body,
    };
    this.props.postOption(this.props.rowId, newOption);
    this.setState({
      index: "",
      body: "",
    });
  };

  render() {
    const {
      row: { options, body },
      UI: { loading },
    } = this.props;
    const optionsDialog = loading ? (
      <div>
        <center>
          <CircularProgress size={100} thickness={5} />
        </center>
      </div>
    ) : (
      <div>
        <form>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left" colSpan={3}>
                    <b>{body} Options:</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {options?.map((option) => (
                  <TableRow>
                    <TableCell style={{ width: "15%" }}>
                      {option.index}
                    </TableCell>
                    <TableCell>{option.body}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell>
                    <TextField
                      id="standard-basic"
                      label="Index"
                      name="index"
                      type="number"
                      value={this.state.index}
                      onChange={(e) => this.handleChange(e)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      id="standard-basic"
                      label="Body"
                      fullWidth
                      name="body"
                      value={this.state.body}
                      onChange={(e) => this.handleChange(e)}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={this.handleSubmit}
                    >
                      +
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </form>
      </div>
    );
    return (
      <Fragment>
        <Button onClick={this.handleOpen}>
          <UnfoldMore color="primary" />
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <Button onClick={this.handleClose}>
            <CloseIcon />
          </Button>
          <DialogContent>{optionsDialog}</DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

MyOptions.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getRow: PropTypes.func.isRequired,
  rowId: PropTypes.string.isRequired,
  row: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  row: state.data.row,
  UI: state.UI,
});

const mapActionsToProps = {
  getRow,
  clearErrors,
  postOption,
};

export default connect(mapStateToProps, mapActionsToProps)(MyOptions);

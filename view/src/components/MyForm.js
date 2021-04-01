import React, { Component } from "react";

// MUI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

// Redux
import { connect } from "react-redux";
import { postRow, clearErrors } from "../redux/actions/dataActions";

class MyForm extends Component {
  state = {
    index: "",
    visit: "",
    body: "",
    dataType: "",
    options: [],
    buttonType: "",
    errors: {},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({
        index: "",
        visit: "",
        body: "",
        dataType: "",
        open: false,
      });
    }
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const newRow = {
      index: this.state.index,
      body: this.state.body,
      dataType: this.state.dataType,
      visit: this.state.visit,
    };
    this.props.postRow(this.props.categoryId, newRow);
  };

  render() {
    const { authenticated } = this.props;
    const errors = this.state.errors;

    const rowForm = authenticated ? (
      <div>
        <center>
          <Button
            size="large"
            variant="outlined"
            color="primary"
            onClick={this.handleOpen}
          >
            Add New Row
          </Button>
        </center>
        <Dialog
          fullWidth
          maxWidth="lg"
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <DialogContentText>Add New Row</DialogContentText>
            <form onSubmit={this.handleSubmit}>
              <TableRow>
                <TableCell style={{ width: "10%" }} align="left">
                  <TextField
                    id="standard-basic"
                    label="Index"
                    error={errors.index ? true : false}
                    name="index"
                    type="number"
                    value={this.state.index}
                    onChange={(e) => this.handleChange(e)}
                  />
                </TableCell>
                <TableCell style={{ width: "10%" }} align="left">
                  <TextField
                    id="standard-basic"
                    label="Visit"
                    error={errors.index ? true : false}
                    name="visit"
                    value={this.state.visit}
                    onChange={(e) => this.handleChange(e)}
                  />
                </TableCell>
                <TableCell style={{ width: "60%" }} align="left">
                  <TextField
                    id="standard-basic"
                    label="Body"
                    fullWidth
                    error={errors.index ? true : false}
                    name="body"
                    value={this.state.body}
                    onChange={(e) => this.handleChange(e)}
                  />
                </TableCell>
                <TableCell style={{ width: "20%" }} align="left">
                  <TextField
                    id="standard-basic"
                    label="Data Type"
                    error={errors.index ? true : false}
                    name="dataType"
                    value={this.state.dataType}
                    onChange={(e) => this.handleChange(e)}
                  />
                </TableCell>
              </TableRow>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    ) : null;

    return <div>{rowForm}</div>;
  }
}

MyForm.propTypes = {
  postRow: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  categoryId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { postRow, clearErrors })(MyForm);

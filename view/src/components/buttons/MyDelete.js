import React, { Component, Fragment } from "react";

// MUI
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import { deleteRow } from "../../redux/actions/dataActions";

export class MyDelete extends Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleDelete = () => {
    this.props.deleteRow(this.props.rowId);
    this.setState({ open: false });
    // window.location.reload();
  };
  render() {
    return (
      <Fragment>
        <Button onClick={this.handleOpen}>
          <HighlightOffIcon style={{ color: "black" }} />
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Are you sure you want to delete this row ?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleDelete} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

MyDelete.propTypes = {
  deleteRow: PropTypes.func.isRequired,
  rowId: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteRow: (rowId) => dispatch(deleteRow(rowId)),
  };
};

export default connect(null, mapDispatchToProps)(MyDelete);

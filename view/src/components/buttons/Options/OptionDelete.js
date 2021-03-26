import React, { Component, Fragment } from "react";

// MUI
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

// Redux
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteOption } from "../../../redux/actions/dataActions";

export class DeleteOption extends Component {
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
    this.props.deleteOption(this.props.optionId);
    this.setState({ open: false });
    // window.location.reload();
  };
  render() {
    return (
      <Fragment>
        <Button onClick={this.handleOpen}>
          <HighlightOffIcon style={{ color: "red" }} />
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Are you sure you want to delete this option ?
          </DialogTitle>
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

DeleteOption.propTypes = {
  deleteOption: PropTypes.func.isRequired,
  optionId: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteOption: (optionId) => dispatch(deleteOption(optionId)),
  };
};

export default connect(null, mapDispatchToProps)(DeleteOption);

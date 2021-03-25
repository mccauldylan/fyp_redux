import React, { Component, Fragment } from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { deleteComment } from "../../../redux/actions/dataActions";

export class CommentDelete extends Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({ open: true });
    console.log(this.props.commentId);
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleDelete = () => {
    this.props.deleteComment(this.props.commentId);
    this.setState({ open: false });
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
            Are you sure you want to delete this comment ?
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

CommentDelete.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  commentId: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteComment: (commentId) => dispatch(deleteComment(commentId)),
  };
};

export default connect(null, mapDispatchToProps)(CommentDelete);

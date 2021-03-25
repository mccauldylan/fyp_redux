import React, { Component } from "react";
import { connect } from "react-redux";
import { editRow, clearErrors } from "../../redux/actions/dataActions";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

class MyEdit extends Component {
  state = {
    validated: this.props.validated,
    errors: {},
    open: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({
        validated: this.props.validated,
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

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.validated);
    let placeholder = !this.state.validated;

    this.setState({ validated: !placeholder, errors: {} });
    console.log(this.state.validated);

    const newRow = {
      validated: placeholder,
    };
    this.props.editRow(this.props.rowId, newRow);
    this.setState({ open: false });
    // window.location.reload();
  };

  render() {
    const { authenticated } = this.props;
    const errors = this.state.errors;

    const rowForm = authenticated ? (
      <div>
        <center>
          <Button
            size="small"
            variant="outlined"
            style={{ color: "black" }}
            onClick={this.handleOpen}
          >
            Validate
          </Button>
        </center>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Are you sure you want to validate this row ?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Validate
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    ) : null;

    return <div>{rowForm}</div>;
  }
}

MyEdit.propTypes = {
  editRow: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { editRow, clearErrors })(MyEdit);

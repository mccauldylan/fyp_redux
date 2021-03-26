import React, { Component } from "react";

// MUI
import Button from "@material-ui/core/Button";
import RemoveSharpIcon from "@material-ui/icons/RemoveSharp";

// Redux
import PropTypes from "prop-types";
import {
  notApplicableRow,
  undoNotApplicableRow,
} from "../../redux/actions/dataActions";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class NaButton extends Component {
  state;
  alreadyNaRow = () => {
    if (
      this.props.user.notApplicables &&
      this.props.user.notApplicables.find(
        (notApplicable) => notApplicable.rowId === this.props.rowId
      )
    )
      return true;
    else return false;
  };
  notApplicableRow = () => {
    this.props.notApplicableRow(this.props.rowId);
  };
  undoNotApplicableRow = () => {
    this.props.undoNotApplicableRow(this.props.rowId);
  };

  render() {
    const { authenticated } = this.props.user;
    const naButton = !authenticated ? (
      <Link to="/login">
        <Button>
          <RemoveSharpIcon />
        </Button>
      </Link>
    ) : this.alreadyNaRow() ? (
      <Button onClick={this.undoNotApplicableRow}>
        <RemoveSharpIcon color="primary" />
      </Button>
    ) : (
      <Button onClick={this.notApplicableRow}>
        <RemoveSharpIcon />
      </Button>
    );
    return naButton;
  }
}

NaButton.propTypes = {
  user: PropTypes.object.isRequired,
  rowId: PropTypes.string.isRequired,
  notApplicableRow: PropTypes.func.isRequired,
  undoNotApplicableRow: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  notApplicableRow,
  undoNotApplicableRow,
};

export default connect(mapStateToProps, mapActionsToProps)(NaButton);

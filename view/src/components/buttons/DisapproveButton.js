import React, { Component } from "react";

// MUI
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

// Redux
import {
  disapproveRow,
  undoDisapproveRow,
} from "../../redux/actions/dataActions";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class DisapproveButton extends Component {
  state;
  disapprovedRow = () => {
    if (
      this.props.user.disapproves &&
      this.props.user.disapproves.find(
        (disapprove) => disapprove.rowId === this.props.rowId
      )
    )
      return true;
    else return false;
  };
  disapproveRow = () => {
    this.props.disapproveRow(this.props.rowId);
  };
  undoDisapproveRow = () => {
    this.props.undoDisapproveRow(this.props.rowId);
  };

  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <Button>
          <ArrowDownwardIcon />
        </Button>
      </Link>
    ) : this.disapprovedRow() ? (
      <Button onClick={this.undoDisapproveRow}>
        <ArrowDownwardIcon style={{ color: "red" }} />
      </Button>
    ) : (
      <Button onClick={this.disapproveRow}>
        <ArrowDownwardIcon />
      </Button>
    );
    return likeButton;
  }
}

DisapproveButton.propTypes = {
  user: PropTypes.object.isRequired,
  rowId: PropTypes.string.isRequired,
  disapproveRow: PropTypes.func.isRequired,
  undoDisapproveRow: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  disapproveRow,
  undoDisapproveRow,
};

export default connect(mapStateToProps, mapActionsToProps)(DisapproveButton);

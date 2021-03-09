import React, { Component } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { approveRow, unapproveRow } from "../../redux/actions/dataActions";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

class ApproveButton extends Component {
  state;
  approvedRow = () => {
    if (
      this.props.user.approves &&
      this.props.user.approves.find(
        (approve) => approve.rowId === this.props.rowId
      )
    )
      return true;
    else return false;
  };
  approveRow = () => {
    this.props.approveRow(this.props.rowId);
  };
  unapproveRow = () => {
    this.props.unapproveRow(this.props.rowId);
  };

  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <Button>
          <ArrowUpwardIcon />
        </Button>
      </Link>
    ) : this.approvedRow() ? (
      <Button onClick={this.unapproveRow}>
        <ArrowUpwardIcon style={{ color: "green" }} />
      </Button>
    ) : (
      <Button onClick={this.approveRow}>
        <ArrowUpwardIcon />
      </Button>
    );
    return likeButton;
  }
}

ApproveButton.propTypes = {
  user: PropTypes.object.isRequired,
  rowId: PropTypes.string.isRequired,
  approveRow: PropTypes.func.isRequired,
  unapproveRow: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  approveRow,
  unapproveRow,
};

export default connect(mapStateToProps, mapActionsToProps)(ApproveButton);

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { getRow } from "../redux/actions/dataActions";
import TableCell from "@material-ui/core/TableCell";

class MyTableRow extends Component {
  componentDidMount() {
    const { rowId } = this.props;
    getRow(rowId);
  }

  render() {
    const {
      row: { rowId, body, createdAt, approveCount, disapproveCount, options },
    } = this.props;
    return (
      <div>
        <TableCell>{body}</TableCell>
      </div>
    );
  }
}

MyTableRow.propTypes = {
  getRow: PropTypes.func.isRequired,
  rowId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  row: state.data.row,
  UI: state.UI,
});

const mapActionsToProps = {
  getRow,
};

export default connect(mapStateToProps, mapActionsToProps)(MyTableRow);

import React, { Component } from "react";
import { connect } from "react-redux";
import { postRow } from "../redux/actions/dataActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import PropTypes from "prop-types";

class MyForm extends Component {
  state = {
    index: "",
    visit: "",
    body: "",
    dataType: "",
    options: [],
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
        options: [],
      });
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const categoryId = "1RegisterInfo";
    const newRow = {
      index: "3",
      body: "this.state.body",
      dataType: "this.state.dataType",
      visit: "test",
    };
    this.props.postRow(categoryId, newRow);
  };

  render() {
    const { authenticated } = this.props;
    const errors = this.state.errors;

    const rowForm = authenticated ? (
      <div>
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
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
        <hr />
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
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { postRow })(MyForm);

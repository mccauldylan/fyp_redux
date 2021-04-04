import React, { Component } from "react";

// MUI
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

//Redux
import { connect } from "react-redux";
import { editUser } from "../../redux/actions/userActions";

//just a button, no dialog
//import the edit action (will check idf reducer works later)
//have a boolean in state thats set to isAdmin
//when 'change role' button is pressed, set state to opposite of current state
//use the edit row function to send this off
//done????

class RoleChange extends Component {
  state = {
    open: false,
    isAdmin: this.props.user.credentials.isAdmin,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let placeholder = !this.state.isAdmin;
    const userData = {
      isAdmin: placeholder,
    };
    console.log(this.props.user.credentials.isAdmin);
    this.props.editUser(userData);
  };

  render() {
    const { authenticated } = this.props;

    const rowForm = authenticated ? (
      <div>
        <center>
          <Button
            size="small"
            style={{ color: "black" }}
            onClick={this.handleSubmit}
          >
            change role
          </Button>
        </center>
      </div>
    ) : null;

    return <div>{rowForm}</div>;
  }
}

RoleChange.propTypes = {
  editUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,

  UI: state.UI,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { editUser })(RoleChange);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";

class Profile extends Component {
  render() {
    const {
      user: {
        credentials, // { firstName, lastName, username, email, profession },
        authenticated,
        loading,
      },
    } = this.props;

    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper>
          <div>
            <h2>{credentials.firstName}</h2>
            <h2>{credentials.profession}</h2>
          </div>
        </Paper>
      ) : (
        <p>placeholder</p>
      )
    ) : (
      <p>loading...</p>
    );

    return profileMarkup;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

Profile.propTypes = {
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles()(Profile));

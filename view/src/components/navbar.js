import React, { Component, Fragment } from "react";
import Link from "react-router-dom/Link";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//MUI
import Appbar from "@material-ui/core/Appbar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

export class navbar extends Component {
  render() {
    const { user: authenticated } = this.props;
    return (
      <Appbar>
        <Toolbar className="nav-container">
          {authenticated ? (
            <Fragment>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>

              <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </Appbar>
    );
  }
}

navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(navbar);

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { logoutUser } from "../redux/actions/userActions";
import Link from "react-router-dom/Link";
import RoleChange from "../components/buttons/RoleChange";

class Profile extends Component {
  handleLogout = () => {
    this.props.logoutUser();
  };
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
        <div style={{ color: "#f2f2f2" }}>
          <Card variant="outlined">
            <CardContent>
              <center>
                <Typography color="textSecondary" gutterBottom>
                  Welcome
                </Typography>
              </center>
              <center>
                <Typography variant="h5" component="h2">
                  {credentials.firstName}&nbsp;{credentials.lastName}
                </Typography>
              </center>
              <center>
                <Typography color="textSecondary">
                  {credentials.profession}
                </Typography>
              </center>
              <center>
                <Typography color="textSecondary">
                  Role:{" "}
                  {credentials.isSuperUser
                    ? "Super User"
                    : credentials.isAdmin
                    ? "Admin"
                    : "Validator"}
                </Typography>
              </center>
            </CardContent>
            <CardActions>
              {credentials.isSuperUser ? (
                <Fragment>
                  <center>
                    <Button
                      onClick={this.handleLogout}
                      size="small"
                      component={Link}
                      to="/login"
                    >
                      logout
                    </Button>
                  </center>
                </Fragment>
              ) : (
                <Fragment style={{ display: "flex" }}>
                  <RoleChange />
                  {/* <Typography color="textSecondary">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                  </Typography> */}
                  <Button
                    onClick={this.handleLogout}
                    size="small"
                    component={Link}
                    to="/login"
                    style={{ marginLeft: "auto" }}
                  >
                    Logout
                  </Button>
                </Fragment>
              )}
            </CardActions>
          </Card>
        </div>
      ) : (
        <div>
          <Card variant="outlined" elevation={0}>
            <CardContent>
              <center>
                <Typography color="textSecondary" gutterBottom>
                  Welcome
                </Typography>
              </center>
              <center>
                <Typography variant="h5" component="h2">
                  Please log in below
                </Typography>
              </center>

              <Typography color="textSecondary"></Typography>
            </CardContent>

            <CardActions
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button size="small" component={Link} to="/login">
                Login
              </Button>
            </CardActions>
          </Card>
        </div>
      )
    ) : (
      <p>Loading...</p>
    );

    return profileMarkup;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { logoutUser })(withStyles()(Profile));

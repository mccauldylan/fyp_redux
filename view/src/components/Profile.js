import React, { Component } from "react";
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
        <Paper>
          <div>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Welcome,
                </Typography>
                <Typography variant="h5" component="h2">
                  {credentials.firstName}&nbsp;{credentials.lastName}
                </Typography>
                <Typography color="textSecondary">
                  {credentials.profession}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={this.handleLogout}
                  size="small"
                  component={Link}
                  to="/login"
                >
                  Logout
                </Button>
              </CardActions>
            </Card>
          </div>
        </Paper>
      ) : (
        <Paper>
          <div>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Welcome,
                </Typography>
                <Typography variant="h5" component="h2">
                  Please log in below
                </Typography>
                <Typography color="textSecondary"></Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to="/login">
                  Login
                </Button>
              </CardActions>
            </Card>
          </div>
        </Paper>
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

import React, { Component } from "react";

//MUI
import Appbar from "@material-ui/core/Appbar";
import Toolbar from "@material-ui/core/Toolbar";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";

import { Typography } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  stickToBottom: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "#595959",
  },
};

export class footer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Appbar>
        <BottomNavigation className={classes.stickToBottom}>
          <BottomNavigationAction
            label="Recents"
            value="recents"
            icon={"© 2021 TCD"}
            style={{ color: "#b3b3b3", alignItems: "left" }}
            align="left"
          />
          <BottomNavigationAction />
          <BottomNavigationAction />
          <BottomNavigationAction />
          <BottomNavigationAction />
          <BottomNavigationAction />
          <BottomNavigationAction />
          <BottomNavigationAction />
          <BottomNavigationAction />
          <BottomNavigationAction />
          <BottomNavigationAction />
          <BottomNavigationAction />
        </BottomNavigation>
      </Appbar>
    );
  }
}

export default withStyles(styles)(footer);

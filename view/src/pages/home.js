import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Profile from "../components/Profile";

export class home extends Component {
  render() {
    return (
      <Grid container spacing={20}>
        <Grid item sm={4}>
          <Profile />
        </Grid>
        <Grid item sm={6}></Grid>
      </Grid>
    );
  }
}

export default home;

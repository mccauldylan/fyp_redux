import React, { Component, Fragment } from "react";
import Link from "react-router-dom/Link";
import Profile from "../components/Profile";
import RoleChange from "../components/buttons/RoleChange";

// MUI
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import TableRow from "@material-ui/core/TableRow";
import { FixedSizeList } from "react-window";
import Typography from "@material-ui/core/Typography";

import ListSubheader from "@material-ui/core/ListSubheader";
// Redux
import { connect } from "react-redux";
import { getCategories } from "../redux/actions/dataActions";
import { ListItemAvatar } from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//     height: 400,
//     maxWidth: 300,
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

export class home extends Component {
  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    const { categories, loading } = this.props.data;
    let placeholder = !loading ? (
      categories.map((category) => (
        <List disablePadding>
          <ListItem
            button
            component={Link}
            to={`/categories/${category.categoryId}`}
          >
            <ListItemText primary={category.name}></ListItemText>
          </ListItem>
          <Divider />
        </List>
      ))
    ) : (
      <p>Loading...</p>
    );

    let categoriesText = !loading ? (
      <Typography variant="h6" component="h5">
        Categories
      </Typography>
    ) : null;
    let text = !loading
      ? "**NOTE TO REVIEWER: This section deals with meta data relevant to the TCD MND Registry. There are 9 Sections in total."
      : null;

    return (
      <Grid container spacing={8}>
        <Grid item sm={4}>
          <Profile />
        </Grid>
        <Grid item sm={4}>
          {text}
        </Grid>
        <Grid item sm={4}>
          {/* <center>
            <h3>{categoriesText}</h3>
          </center> */}

          <Paper style={{ height: 520, overflow: "auto" }}>
            <List disablePadding>
              <ListSubheader style={{ textAlign: "center" }}>
                {categoriesText}
              </ListSubheader>
              <Divider />
            </List>
            {placeholder}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getCategories: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getCategories })(home);

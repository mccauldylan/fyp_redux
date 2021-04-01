import React, { Component } from "react";
import Link from "react-router-dom/Link";

// MUI
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Profile from "../components/Profile";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import TableRow from "@material-ui/core/TableRow";
import { FixedSizeList } from "react-window";
// Redux
import { connect } from "react-redux";
import { getCategories } from "../redux/actions/dataActions";

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
    return (
      <Grid container spacing={10}>
        <Grid item sm={4}>
          <Profile />
        </Grid>
        <Grid item sm={4}></Grid>
        <Grid item sm={4}>
          {placeholder}
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

import React, { Component } from "react";

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

// Redux
import { connect } from "react-redux";
import { getCategories } from "../redux/actions/dataActions";

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export class home extends Component {
  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    const { categories, loading } = this.props.data;
    let placeholder = !loading ? (
      categories.map((category) => (
        <Paper elevation={0}>
          <List disablePadding>
            <ListItemLink href={`/categories/${category.categoryId}`}>
              <ListItemText primary={category.name}></ListItemText>
            </ListItemLink>
            <Divider />
          </List>
        </Paper>
      ))
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={10}>
        <Grid item sm={4}>
          {placeholder}
        </Grid>
        <Grid item sm={4}></Grid>
        <Grid item sm={4}>
          <Profile />
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

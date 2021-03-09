import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Profile from "../components/Profile";
import { connect } from "react-redux";
import { getCategories } from "../redux/actions/dataActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import TableCell from "@material-ui/core/TableCell";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

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

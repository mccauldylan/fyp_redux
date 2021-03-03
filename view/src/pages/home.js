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

export class home extends Component {
  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    const { categories, loading } = this.props.data;
    let placeholder = !loading ? (
      categories.map((category) => (
        <ul>
          <li>
            <Typography
              variant="h5"
              component={Link}
              to={`/categories/${category.name}`}
              color="primary"
            >
              {category.name}
            </Typography>
          </li>
        </ul>
      ))
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={20}>
        <Grid item sm={4}>
          <Profile />
        </Grid>
        <Grid item sm={6}>
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

import React, { Component } from "react";
import Profile from "../components/Profile";
import { connect } from "react-redux";
import { getCategory } from "../redux/actions/dataActions";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

class document extends Component {
  componentDidMount() {
    const categoryId = this.props.match.params.categoryId;
    this.props.getCategory(categoryId);
  }

  render() {
    const { category, loading } = this.props.data;
    let placeholder = !loading ? (
      category.map((row) => (
        <ul>
          <li>
            <Typography variant="h5">{row.body}</Typography>
            <Typography variant="h5">hello</Typography>
          </li>
        </ul>
      ))
    ) : (
      <p>Loading...</p>
    );
    return <div>{placeholder}</div>;
  }
}

document.propTypes = {
  getCategory: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getCategory })(document);

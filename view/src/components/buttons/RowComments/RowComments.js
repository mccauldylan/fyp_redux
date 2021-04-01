import React, { Component, Fragment } from "react";
import dayjs from "dayjs";

// MUI
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

// Icons
import CloseIcon from "@material-ui/icons/Close";
import MessageOutlinedIcon from "@material-ui/icons/MessageOutlined";

// Redux stuff
import PropTypes from "prop-types";

import { connect } from "react-redux";
import {
  getRow,
  clearErrors,
  postComment,
} from "../../../redux/actions/dataActions";

// Components
import CommentDelete from "./CommentDelete";

class MyOptions extends Component {
  state = {
    open: false,
    oldPath: "",
    newPath: "",
    body: "",
  };

  handleOpen = () => {
    let oldPath = window.location.pathname;

    const { categoryId, rowId } = this.props;
    const newPath = `/categories/${categoryId}/row/${rowId}`;

    if (oldPath === newPath) oldPath = `/categories/${categoryId}`;

    window.history.pushState(null, null, newPath);

    this.setState({ open: true, oldPath, newPath });
    this.props.getRow(this.props.rowId);
  };
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const newComment = {
      body: this.state.body,
    };
    this.props.postComment(this.props.rowId, newComment);
    this.setState({
      body: "",
    });
  };

  render() {
    const {
      row: { comments, body },
      user: {
        credentials: { username },
      },
      UI: { loading },
    } = this.props;
    const commentsDialog = loading ? (
      <div>
        <center>
          <CircularProgress size={100} thickness={5} />
        </center>
      </div>
    ) : (
      <div>
        <center>
          <h2>{body}</h2>
          <h2>Comments</h2>
        </center>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div>
              <List fullwidth>
                {comments?.map((comment) => (
                  <div>
                    <Card elevation={0}>
                      <CardHeader
                        action={
                          comment.username === username ? (
                            <IconButton aria-label="settings">
                              <CommentDelete />
                            </IconButton>
                          ) : null
                        }
                        title={
                          <Typography color="textSecondary" gutterBottom>
                            {comment.firstName} {comment.lastName}
                          </Typography>
                        }
                        subheader={
                          <Typography
                            variant="body2"
                            component="p"
                            color="textSecondary"
                          >
                            {dayjs(comment.createdAt).format(
                              "h:mm a, MMMM DD YYYY"
                            )}
                          </Typography>
                        }
                      />
                      <CardContent>
                        <Typography variant="body2" component="p">
                          {comment.body}
                        </Typography>
                      </CardContent>
                    </Card>
                    <Divider />
                  </div>
                ))}
              </List>
            </div>
          </Grid>
          <Grid item xs={12}>
            <form>
              <div>
                <TextField
                  id="standard-basic"
                  label="New Comment"
                  name="body"
                  value={this.state.body}
                  onChange={(e) => this.handleChange(e)}
                  fullWidth
                  maxWidth="sm"
                />
                <center>
                  <br></br>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={this.handleSubmit}
                  >
                    Submit Comment
                  </Button>
                </center>
              </div>
            </form>
          </Grid>
        </Grid>
      </div>
    );
    return (
      <Fragment>
        <Button onClick={this.handleOpen}>
          <MessageOutlinedIcon color="primary" />
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="lg"
        >
          <Button onClick={this.handleClose}>
            <CloseIcon />
          </Button>
          <DialogContent>{commentsDialog}</DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

MyOptions.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getRow: PropTypes.func.isRequired,
  rowId: PropTypes.string.isRequired,
  row: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  row: state.data.row,
  UI: state.UI,
  user: state.user,
});

const mapActionsToProps = {
  getRow,
  clearErrors,
  postComment,
};

export default connect(mapStateToProps, mapActionsToProps)(MyOptions);

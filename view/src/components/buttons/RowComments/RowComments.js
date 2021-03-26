import React, { Component, Fragment } from "react";

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
        <h2>{body}</h2>
        <h3>Comments</h3>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div>
              <List fullwidth>
                {comments?.map((comment) => (
                  <div>
                    <Paper>
                      <Table fullwidth>
                        <TableRow fullWidth>
                          <TableCell
                            style={{ width: "90%" }}
                            align="right"
                            fullWidth
                          >
                            <ListItem fullwidth>
                              <ListItemText
                                fullwidth
                                primary={comment.firstName}
                                secondary={comment.body}
                              />
                            </ListItem>
                          </TableCell>
                          <TableCell align="right">
                            {username === comment.username ? (
                              <CommentDelete commentId={comment.commentId} />
                            ) : null}
                          </TableCell>
                        </TableRow>
                      </Table>
                      {/* <Divider /> */}
                    </Paper>
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

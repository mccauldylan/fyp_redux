// import React, { Component, Fragment } from "react";
// import PropTypes from "prop-types";
// import withStyles from "@material-ui/core/styles/withStyles";
// import Button from "@material-ui/core/Button";
// import { Link } from "react-router-dom";
// // MUI Stuff
// import Dialog from "@material-ui/core/Dialog";
// import DialogContent from "@material-ui/core/DialogContent";
// import CircularProgress from "@material-ui/core/CircularProgress";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";

// // Icons
// import CloseIcon from "@material-ui/icons/Close";
// import UnfoldMore from "@material-ui/icons/UnfoldMore";
// // Redux stuff
// import { connect } from "react-redux";
// import { getRow, clearErrors } from "../../redux/actions/dataActions";

// class MyOptions extends Component {
//   state = {
//     open: false,
//     oldPath: "",
//     newPath: "",
//   };

//   handleOpen = () => {
//     let oldPath = window.location.pathname;

//     const { categoryId, rowId } = this.props;
//     const newPath = `/categories/${categoryId}/row/${rowId}`;

//     if (oldPath === newPath) oldPath = `/categories/${categoryId}`;

//     window.history.pushState(null, null, newPath);

//     this.setState({ open: true, oldPath, newPath });
//     this.props.getRow(this.props.rowId);
//   };
//   handleClose = () => {
//     window.history.pushState(null, null, this.state.oldPath);
//     this.setState({ open: false });
//     this.props.clearErrors();
//   };
//   render() {
//     const {
//       row: { options },
//       UI: { loading },
//     } = this.props;
//     const optionsDialog = loading ? (
//       <div>
//         <CircularProgress size={200} thickness={2} />
//       </div>
//     ) : (
//       <div>
//         <List>
//           {options?.map((option) => (
//             <ListItem>{option.body}</ListItem>
//           ))}
//         </List>
//       </div>
//     );
//     return (
//       <Fragment>
//         <Button onClick={this.handleOpen}>
//           <UnfoldMore color="primary" />
//         </Button>
//         <Dialog
//           open={this.state.open}
//           onClose={this.handleClose}
//           fullWidth
//           maxWidth="sm"
//         >
//           <Button onClick={this.handleClose}>
//             <CloseIcon />
//           </Button>
//           <DialogContent>{optionsDialog}</DialogContent>
//         </Dialog>
//       </Fragment>
//     );
//   }
// }

// MyOptions.propTypes = {
//   clearErrors: PropTypes.func.isRequired,
//   getRow: PropTypes.func.isRequired,
//   rowId: PropTypes.string.isRequired,
//   row: PropTypes.object.isRequired,
//   UI: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => ({
//   row: state.data.row,
//   UI: state.UI,
// });

// const mapActionsToProps = {
//   getRow,
//   clearErrors,
// };

// export default connect(mapStateToProps, mapActionsToProps)(MyOptions);

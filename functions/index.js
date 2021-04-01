const functions = require("firebase-functions");
const app = require("express")();
const auth = require("./util/auth");

const cors = require("cors");
app.use(cors());
const {
  getCategories,
  getCategory,
  postRow,
  deleteRow,
  editRow,
  commentOnRow,
  deleteComment,
  likeRow,
  dislikeRow,
  unlikeRow,
  undoDislikeRow,
  notApplicable,
  undoNotApplicable,
  postOption,
  deleteOption,
  editOption,
  getOneRow,
} = require("./APIs/rows");

const {
  loginUser,
  signUpUser,
  getAuthenticatedUser,
  editUserDetails,
} = require("./APIs/users");

// rows
app.get("/category/", getCategories);
app.get("/category/:categoryId", getCategory);
app.get("/row/:rowId", getOneRow);
app.post("/category/:categoryId", postRow);
app.delete("/row/:rowId", deleteRow);
app.put("/row/:rowId", editRow);
app.post("/row/:rowId/comment", auth, commentOnRow);
app.delete("/comment/:commentId", deleteComment);
app.get("/row/:rowId/like", auth, likeRow);
app.get("/row/:rowId/dislike", auth, dislikeRow);
app.get("/row/:rowId/unlike", auth, unlikeRow);
app.get("/row/:rowId/undoDislike", auth, undoDislikeRow);
app.get("/row/:rowId/notApplicable", auth, notApplicable);
app.get("/row/:rowId/undoNotApplicable", auth, undoNotApplicable);

app.post("/row/:rowId/option", auth, postOption);
app.delete("/option/:optionId", deleteOption);
app.put("/option/:optionId", editOption);

// Users
app.post("/login", loginUser);
app.post("/signup", signUpUser);
app.get("/user", auth, getAuthenticatedUser);
app.put("/user/", auth, editUserDetails);

exports.api = functions.https.onRequest(app);

const functions = require('firebase-functions');
const app = require('express')();
const auth = require('./util/auth');

const {
    getCategory,
    postRow,
    deleteRow,
    editRow,
    commentOnRow,
    likeRow,
    dislikeRow,
    unlikeRow,
    undoDislikeRow,
    postOption,
    deleteOption,
    editOption
} = require('./APIs/rows')

const {
    loginUser,
    signUpUser
} = require('./APIs/users')

// rows
app.get('/category/:categoryId', getCategory);
app.post('/category/:categoryId', postRow);
app.delete('/row/:rowId', deleteRow)
app.put('/row/:rowId', editRow)
app.post('/row/:rowId/comment', commentOnRow)
app.get('/row/:rowId/like',auth, likeRow)
app.get('/row/:rowId/dislike',auth, dislikeRow)
app.get('/row/:rowId/unlike',auth, unlikeRow)
app.get('/row/:rowId/undoDislike',auth, undoDislikeRow)
app.post('/row/:rowId/option',auth, postOption)
app.delete('/option/:optionId', deleteOption)
app.put('/option/:optionId', editOption)





// Users
app.post('/login', loginUser);
app.post('/signup', signUpUser);


exports.api = functions.https.onRequest(app);

import axios from "axios";

// get all categories for home page
export const getCategories = () => (dispatch) => {
  dispatch({ type: "LOADING_DATA" });
  axios
    .get("/category")
    .then((res) => {
      dispatch({
        type: "SET_CATEGORIES",
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: "SET_CATEGORIES",
        payload: [],
      });
    });
};

export const getCategory = (categoryId) => (dispatch) => {
  dispatch({ type: "LOADING_UI" });
  axios
    .get(`/category/${categoryId}`)
    .then((res) => {
      dispatch({
        type: "SET_CATEGORY",
        payload: res.data,
      });
      dispatch({ type: "STOP_LOADING_UI" });
    })
    .catch(() => {
      dispatch({
        type: "SET_CATEGORY",
        payload: null,
      });
    });
};

export const getRow = (rowId) => (dispatch) => {
  dispatch({ type: "LOADING_UI" });
  axios
    .get(`/row/${rowId}`)
    .then((res) => {
      dispatch({
        type: "SET_ROW",
        payload: res.data,
      });
      console.log(res.data);
      dispatch({ type: "STOP_LOADING_UI" });
    })
    .catch((err) => console.log(err));
};

export const postRow = (categoryId, rowData) => (dispatch) => {
  dispatch({ type: "LOADING_UI" });
  axios
    .post(`/category/${categoryId}`, rowData)
    .then((res) => {
      dispatch({
        type: "POST_ROW",
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: "SET_ERRORS",
        payload: err.response.data,
      });
    });
};

export const editRow = (rowId, rowData) => (dispatch) => {
  dispatch({ type: "LOADING_UI" });
  axios
    .put(`/row/${rowId}`, rowData)
    .then((res) => {
      dispatch({
        type: "EDIT_ROW",
        payload: res.data,
      });
      dispatch({ type: "STOP_LOADING_UI" });
    })
    .catch((err) => console.log(err));
};

export const deleteRow = (rowId) => (dispatch) => {
  dispatch({ type: "LOADING_UI" });
  axios
    .delete(`/row/${rowId}`)
    .then(() => {
      dispatch({
        type: "DELETE_ROW",
        payload: rowId,
      });
      dispatch({ type: "STOP_LOADING_UI" });
    })
    .catch((err) => console.log(err));
};

export const approveRow = (rowId) => (dispatch) => {
  axios
    .get(`/row/${rowId}/like`)
    .then((res) => {
      dispatch({
        type: "APPROVE_ROW",
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const unapproveRow = (rowId) => (dispatch) => {
  axios
    .get(`/row/${rowId}/unlike`)
    .then((res) => {
      dispatch({
        type: "UNAPPROVE_ROW",
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const disapproveRow = (rowId) => (dispatch) => {
  axios
    .get(`/row/${rowId}/dislike`)
    .then((res) => {
      dispatch({
        type: "DISAPPROVE_ROW",
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const undoDisapproveRow = (rowId) => (dispatch) => {
  axios
    .get(`/row/${rowId}/undoDislike`)
    .then((res) => {
      dispatch({
        type: "UNDODISAPPROVE_ROW",
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
};

//options
export const postOption = (rowId, optionData) => (dispatch) => {
  axios
    .post(`/row/${rowId}/option`, optionData)
    .then((res) => {
      dispatch({
        type: "POST_OPTION",
        payload: res.data,
      });
      console.log(res.data);
      dispatch({ type: "STOP_LOADING_UI" });
    })
    .catch((err) => console.log(err));
};

export const deleteOption = (optionId) => (dispatch) => {
  axios
    .delete(`/option/${optionId}`)
    .then(() => {
      dispatch({
        type: "DELETE_OPTION",
        payload: optionId,
      });
    })
    .catch((err) => console.log(err));
};

export const postComment = (rowId, commentData) => (dispatch) => {
  axios
    .post(`/row/${rowId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: "POST_COMMENT",
        payload: res.data,
      });
      console.log(res.data);
      dispatch({ type: "STOP_LOADING_UI" });
    })
    .catch((err) => console.log(err));
};

export const deleteComment = (commentId) => (dispatch) => {
  axios
    .delete(`/comment/${commentId}`)
    .then(() => {
      dispatch({
        type: "DELETE_COMMENT",
        payload: commentId,
      });
    })
    .catch((err) => console.log(err));
};

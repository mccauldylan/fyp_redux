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

export const clearErrors = () => (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
};

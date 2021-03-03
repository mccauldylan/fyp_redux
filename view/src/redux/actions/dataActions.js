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
        type: SET_SCREAMS,
        payload: null,
      });
    });
};

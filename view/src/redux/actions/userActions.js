import axios from "axios";

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: "LOADING_UI" });
  axios
    .post("/login", userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: "CLEAR_ERRORS" });
      history.push("/");
    })
    .catch((error) => {
      dispatch({
        type: "SET_ERRORS",
        payload: error.response.data,
      });
    });
};
export const signupUser = (userData, history) => (dispatch) => {
  dispatch({ type: "LOADING_UI" });
  axios
    .post("/signup", userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: "CLEAR_ERRORS" });
      history.push("/");
    })
    .catch((error) => {
      dispatch({
        type: "SET_ERRORS",
        payload: error.response.data,
      });
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: "SET_UNAUTHENTICATED" });
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: "LOADING_USER" });
  axios.get("/user").then((res) => {
    dispatch({
      type: "SET_USER",
      payload: res.data,
    });
  });
};

export const editUser = (userData) => (dispatch) => {
  dispatch({ type: "LOADING_UI" });
  axios
    .put("/user", userData)
    .then((res) => {
      dispatch({
        type: "EDIT_USER",
        payload: res.data,
      });
      dispatch({ type: "STOP_LOADING_UI" });
    })
    .catch((err) => console.log(err));
};

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};

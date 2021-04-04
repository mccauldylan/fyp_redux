import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import jwtDecode from "jwt-decode";

// MUI
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { createMuiTheme } from "@material-ui/core/styles";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { logoutUser, getUserData } from "./redux/actions/userActions";

// components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import AuthRoute from "./util/AuthRoute";

// pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import document from "./pages/document";
import dashboard from "./pages/dashboard";

import axios from "axios";

axios.defaults.baseURL = "https://us-central1-mnd-redux.cloudfunctions.net/api";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#4da6ff",
      dark: "#008394",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrastText: "#fff",
    },
  },
});

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: "SET_AUTHENTICATED" });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <div>
            <Router>
              <div className="container">
                <Navbar />
                <Switch>
                  <AuthRoute exact path="/login" component={login} />
                  <AuthRoute exact path="/signup" component={signup} />
                  <Route
                    exact
                    path="/categories/:categoryId"
                    component={document}
                  />
                  <Route exact exact path="/dashboard" component={dashboard} />
                  <Route exact path="/" component={home} />
                </Switch>
              </div>
            </Router>
          </div>
          <Footer />
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;

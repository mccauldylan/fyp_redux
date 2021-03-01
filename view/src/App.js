import React, { Component } from 'react'
import{ BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
// MUI
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import {createMuiTheme} from '@material-ui/core/styles'

// components
import Navbar from './components/Navbar'
import Table from './components/Table'

// pages
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'

const theme = createMuiTheme({

  palette: {
    primary: {
      light: '#33c9dc',
      main: '#00bcd4',
      dark: '#008394',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff'
    }
  }
})


class App extends Component {
  render(){
    return (
      <MuiThemeProvider theme ={theme}>
        <div className="App">
          <Router>
          <Navbar/>
            <div className ="container">
            <Switch>
              <Route exact path  = "/" component ={home}/>
              <Route exact path  = "/login" component ={login}/>
              <Route exact path  = "/signup" component ={signup}/>
              <Route exact path  = "/Table" component ={Table}/>

            </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
    }
}

export default App;

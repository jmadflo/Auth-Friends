import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import PrivateRoute from './components/PrivateRoute'
import Friends from './components/FriendsList'
import './App.css'

const App = () => {
  return (
    <div className="App">
      <Switch>
        <PrivateRoute exact path='/friends' component={Friends}/>
        <Route path='/' component={LoginForm}/>
      </Switch>
    </div>
  )
}

export default App

import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import './App.css'

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={LoginForm}/>
      </Switch>
    </div>
  )
}

export default App

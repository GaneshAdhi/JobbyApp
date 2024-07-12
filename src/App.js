import './App.css'

import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/LoginPage'

import ProtectedRoutes from './components/ProtectedRoute'

import Home from './components/HomePage'

import Job from './components/JobPage'

import JobDetailRoute from './components/SpecificJobPage'

import NotFoundRoute from './components/NotFoundPage'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoutes exact path="/" component={Home} />
    <ProtectedRoutes exact path="/jobs" component={Job} />
    <ProtectedRoutes exact path="/jobs/:id" component={JobDetailRoute} />
    <Route path="/not-found" component={NotFoundRoute} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App

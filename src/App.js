import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Preloader from './components/Preloader'
import Users from './components/Users'
import Posts from './components/Posts'
import NewPost from './components/NewPost'
import Post from './components/Post'
import './styles/main.scss'

function App() {
  return (
    <Router>
      <div className="App container">
        <Preloader />
        <Switch>
          <Route path="/post">
            <Post />
          </Route>
          <Route path="/new-post">
            <NewPost />
          </Route>
          <Route path="/posts">
            <Posts />
          </Route>
          <Route path="/">
            <Users />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App

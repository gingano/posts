import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Users from './components/Users'
import Posts from './components/Posts'
import NewPost from './components/NewPost'
import Post from './components/Post'

function App() {
  return (
    <Router>
      <div className="App">
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

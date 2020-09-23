import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Preloader from './components/Preloader'
import Users from './components/Users'
import Posts from './components/Posts'
import NewPost from './components/NewPost'
import Post from './components/Post'
import ScrollToTop from './components/ScrollToTop'
import NotFound from './components/NotFound'
import './styles/main.scss'

function App() {
  return (
    <Router>
      <div className="App container">
        <Preloader />
        <ScrollToTop />
        <Switch>
          <Route path="/404">
            <NotFound />
          </Route>
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
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App

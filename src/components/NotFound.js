import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => (
  <div className="not-found">
    <h1 className="not-found__title">404 - Not Found!</h1>
    <Link className="not-found__link" to="/">
      Go Home
    </Link>
  </div>
)

export default NotFound

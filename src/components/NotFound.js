import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setIsVisible } from '../redux/actions/preloader'

const NotFound = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setIsVisible(false))
  }, [dispatch])

  return (
    <div className="not-found">
      <h1 className="not-found__title">404 - Not Found!</h1>
      <Link className="not-found__link" to="/">
        Go Home
      </Link>
    </div>
  )
}

export default NotFound

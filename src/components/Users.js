import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import UserThumbnail from './UserThumbnail'
import useUsersRequest from '../hooks/useUsersRequest'
import { postsRequest } from '../utils/requests'

const Users = () => {
  const usersState = useSelector(({ users }) => users)
  const dispatch = useDispatch()
  useUsersRequest(dispatch)

  return (
    <div className="users">
      <Link
        to="/posts"
        onClick={() => {
          dispatch(postsRequest(-1))
        }}
        className="users__all-posts-button"
      >
        all posts
      </Link>
      <ul className="users__list">
        {usersState.items.map((user) => (
          <li key={`user-${user.id}`} className="users__list-item">
            <UserThumbnail user={user} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import UserThumbnail from './UserThumbnail'
import useUsersRequest from '../hooks/useUsersRequest'
import { postsRequest } from '../utils/requests'
import { setIsVisible } from '../redux/actions/preloader'

const Users = () => {
  const usersState = useSelector(({ users }) => users)
  const dispatch = useDispatch()
  useUsersRequest(dispatch)

  const history = useHistory()

  const handleAllPosts = () => {
    dispatch(setIsVisible(true))
    dispatch(postsRequest(-1, history, '/posts'))
  }

  return (
    <div className="users">
      <button
        onClick={() => {
          handleAllPosts()
        }}
        type="button"
        className="users__all-posts-button"
      >
        all posts
      </button>
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

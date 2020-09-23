import React from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { postsRequest } from '../utils/requests'
import { setIsVisible } from '../redux/actions/preloader'

const UserThumbnail = ({ user }) => {
  const dispatch = useDispatch()

  const history = useHistory()

  const handlePosts = (userId) => {
    dispatch(setIsVisible(true))
    dispatch(postsRequest(userId, history, `/posts#userId=${userId}`))
  }

  return (
    <div className="user-thumbnail">
      <p className="user-thumbnail__name">{user.name}</p>
      <button
        onClick={() => {
          handlePosts(user.id)
        }}
        type="button"
        className="user-thumbnail__button"
      >
        posts
      </button>
    </div>
  )
}

UserThumbnail.propTypes = {
  user: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object])
  ).isRequired,
}

export default UserThumbnail

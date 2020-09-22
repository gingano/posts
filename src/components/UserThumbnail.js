import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { postsRequest } from '../utils/requests'

const UserThumbnail = ({ user }) => {
  const dispatch = useDispatch()
  return (
    <div className="user-thumbnail">
      <p className="user-thumbnail__name">{user.name}</p>
      <Link
        to={`/posts#userId=${user.id}`}
        onClick={() => {
          dispatch(postsRequest(user.id))
        }}
      >
        posts
      </Link>
    </div>
  )
}

UserThumbnail.propTypes = {
  user: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object])
  ).isRequired,
}

export default UserThumbnail

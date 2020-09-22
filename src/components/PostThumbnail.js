import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { postRequest } from '../utils/requests'

const PostThumbnail = ({ post }) => {
  const dispatch = useDispatch()

  return (
    <div className="user-thumbnail">
      <h2 className="user-thumbnail__title">{post.title}</h2>
      <p className="user-thumbnail__body">{post.body}</p>
      <Link
        to={`/post#postId=${post.id}`}
        onClick={() => {
          dispatch(postRequest(post.id))
        }}
      >
        details
      </Link>
    </div>
  )
}

PostThumbnail.propTypes = {
  post: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ).isRequired,
}

export default PostThumbnail

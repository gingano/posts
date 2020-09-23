import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { postRequest } from '../utils/requests'

const PostThumbnail = ({ post }) => {
  const usersState = useSelector(({ users }) => users)
  const dispatch = useDispatch()

  return (
    <div className="post-thumbnail">
      <h2 className="post-thumbnail__title">{post.title}</h2>
      <p className="post-thumbnail__body">{post.body}</p>
      <p className="post-thumbnail__author">
        Author:
        <br />
        {usersState.items.length > 0 &&
          usersState.items.find((user) => user.id === post.userId).name}
      </p>
      <Link
        to={`/post#postId=${post.id}`}
        onClick={() => {
          dispatch(postRequest(post.id))
        }}
        className="post-thumbnail__button"
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

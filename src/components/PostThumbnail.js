import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { postRequest } from '../utils/requests'
import { setIsVisible } from '../redux/actions/preloader'

const PostThumbnail = ({ post }) => {
  const usersState = useSelector(({ users }) => users)
  const dispatch = useDispatch()

  const history = useHistory()

  const handlePost = (postId) => {
    dispatch(setIsVisible(true))
    dispatch(postRequest(postId, history, `/post#postId=${postId}`))
  }

  return (
    <div className="post-thumbnail">
      <h2 className="post-thumbnail__title">{post.title}</h2>
      <p className="post-thumbnail__body">{post.body}</p>
      <p className="post-thumbnail__author">
        Author:
        <br />
        {usersState.items.length > 0
          ? usersState.items.find((user) => user.id === post.userId).name
          : null}
      </p>
      <button
        type="button"
        onClick={() => {
          handlePost(post.id)
        }}
        className="post-thumbnail__button"
      >
        details
      </button>
    </div>
  )
}

PostThumbnail.propTypes = {
  post: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ).isRequired,
}

export default PostThumbnail

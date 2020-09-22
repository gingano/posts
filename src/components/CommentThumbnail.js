import React from 'react'
import PropTypes from 'prop-types'

const CommentThumbnail = ({ comment }) => {
  return (
    <div className="comment-thumbnail">
      <h3 className="comment-thumbnail__name">{comment.name}</h3>
      <p className="comment-thumbnail__body">{comment.body}</p>

      <a href={`mailto:${comment.email}`} className="comment-thumbnail__email">
        Author:
        <br />
        {comment.email}
      </a>
    </div>
  )
}

CommentThumbnail.propTypes = {
  comment: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ).isRequired,
}

export default CommentThumbnail

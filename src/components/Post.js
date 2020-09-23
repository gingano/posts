import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import usePostRequest from '../hooks/usePostRequest'
import useUsersRequest from '../hooks/useUsersRequest'
import usePostsRequest from '../hooks/usePostsRequest'
import { editPostRequest, deletePostRequest } from '../utils/requests'
import CommentThumbnail from './CommentThumbnail'

const Post = () => {
  const postsState = useSelector(({ posts }) => posts)
  const usersState = useSelector(({ users }) => users)
  const dispatch = useDispatch()
  usePostRequest(dispatch, postsState)
  usePostsRequest(dispatch, postsState)
  useUsersRequest(dispatch)
  const { info, comments } = postsState.currentPost

  const [isEditing, setIsEditing] = useState(false)
  const [titleValue, setTitleValue] = useState('')
  const [bodyValue, setBodyValue] = useState('')
  const [userValue, setUserValue] = useState(1)

  const history = useHistory()

  useEffect(() => {
    setTitleValue(info ? info.title : '')
    setBodyValue(info ? info.body : '')
    setUserValue(info ? info.userId : 1)
  }, [info])

  const handleEdit = (event) => {
    event.preventDefault()

    if (!isEditing) {
      setIsEditing(true)
    } else {
      dispatch(
        editPostRequest(
          info.id,
          {
            userId: Number(userValue),
            title: titleValue,
            body: bodyValue,
          },
          setIsEditing
        )
      )
    }
  }

  const handleDelete = () => {
    dispatch(deletePostRequest(info.id, setIsEditing, history))
  }

  return info && comments ? (
    <div className="post">
      <div className="post__info">
        {isEditing ? (
          <form id="edit-form" className="post__form" onSubmit={handleEdit}>
            <label htmlFor="title" className="post__label">
              Title
            </label>
            <input
              id="title"
              value={titleValue}
              onChange={(event) => {
                setTitleValue(event.currentTarget.value)
              }}
              type="text"
              className="post__input"
              name="title"
              required
            />
            <label htmlFor="body" className="post__label">
              Body
            </label>
            <textarea
              id="body"
              value={bodyValue}
              onChange={(event) => {
                setBodyValue(event.currentTarget.value)
              }}
              type="text"
              className="post__input post__input--textarea"
              name="body"
              required
            />
            <label htmlFor="user" className="post__label">
              Author
            </label>
            <select
              name="user"
              id="user"
              className="post__user-selector"
              onChange={(event) => {
                setUserValue(event.currentTarget.value)
              }}
              value={userValue}
            >
              {usersState.items.map((user) => (
                <option key={`option-${user.id}`} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </form>
        ) : (
          <div className="post_info-text">
            <h2 className="post__title">{info.title}</h2>
            <p className="post__body">{info.body}</p>
            <p className="post__author">
              Author:
              <br />
              {usersState.items.length > 0 &&
                usersState.items.find((user) => user.id === info.userId).name}
            </p>
          </div>
        )}
        <div className="post__info-buttons">
          <button
            onClick={!isEditing ? handleEdit : null}
            type="submit"
            form="edit-form"
            className="post__info-button"
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
          <button
            onClick={handleDelete}
            type="button"
            className="post__info-button post__info-button--delete"
          >
            Delete
          </button>
        </div>
      </div>

      <ul className="post__comments-list">
        <p className="post__comments-title">Comments</p>
        {comments.map((comment) => (
          <li
            key={`comment-${comment.id}`}
            className="post__comments-list-item"
          >
            <CommentThumbnail comment={comment} />
          </li>
        ))}
      </ul>
    </div>
  ) : null
}

export default Post

import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import usePostRequest from '../hooks/usePostRequest'
import useUsersRequest from '../hooks/useUsersRequest'
import usePostsRequest from '../hooks/usePostsRequest'
import { editPostRequest, deletePostRequest } from '../utils/requests'

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

  const handleEdit = () => {
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
          <form className="post__form">
            <input
              value={titleValue}
              onChange={(event) => {
                setTitleValue(event.currentTarget.value)
              }}
              type="text"
              className="post__title-input"
              name="title"
              required
            />
            <input
              value={bodyValue}
              onChange={(event) => {
                setBodyValue(event.currentTarget.value)
              }}
              type="text"
              className="post__title-input"
              name="body"
              required
            />
            <select
              name="user"
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
              {usersState.items.length > 0
                ? usersState.items.find((user) => user.id === info.userId).name
                : null}
            </p>
          </div>
        )}
        <button
          onClick={handleEdit}
          type="button"
          className="post__info-button"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button
          onClick={handleDelete}
          type="button"
          className="post__info-button"
        >
          Delete
        </button>
      </div>

      <ul className="post__comments-list">
        {comments.map((comment) => (
          <li key={`comment-${comment.id}`} className="post__comment">
            <h3 className="post__comment-name">{comment.name}</h3>
            <p className="post__comment-body">{comment.body}</p>
            <a href={`mailto:${comment.email}`} className="post__comment-email">
              {comment.email}
            </a>
          </li>
        ))}
      </ul>
    </div>
  ) : null
}

export default Post

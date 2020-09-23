import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import useUsersRequest from '../hooks/useUsersRequest'
import usePostsRequest from '../hooks/usePostsRequest'
import { addPostRequest } from '../utils/requests'

const NewPost = () => {
  const [titleValue, setTitleValue] = useState('')
  const [bodyValue, setBodyValue] = useState('')
  const [userValue, setUserValue] = useState(1)

  const history = useHistory()

  const usersState = useSelector(({ users }) => users)
  const postsState = useSelector(({ posts }) => posts)
  const dispatch = useDispatch()

  const formSubmit = (event) => {
    event.preventDefault()

    dispatch(
      addPostRequest(
        {
          title: titleValue,
          body: bodyValue,
          userId: userValue,
        },
        history
      )
    )
  }

  useUsersRequest(dispatch)
  usePostsRequest(dispatch, postsState)

  return (
    <div className="new-post">
      <form onSubmit={formSubmit} className="new-post__form">
        <label htmlFor="title" className="new-post__label">
          Title
        </label>
        <input
          id="title"
          type="text"
          className="new-post__input"
          value={titleValue}
          onChange={(event) => {
            setTitleValue(event.currentTarget.value)
          }}
          placeholder="Post title"
          required
        />
        <label htmlFor="body" className="new-post__label">
          Body
        </label>
        <textarea
          id="body"
          type="text"
          className="new-post__input new-post__input--textarea"
          value={bodyValue}
          onChange={(event) => {
            setBodyValue(event.currentTarget.value)
          }}
          placeholder="Post body"
          required
        />
        <label htmlFor="user" className="new-post__label">
          Author
        </label>
        <select
          name="user"
          id="user"
          className="new-post__user-selector"
          onChange={(event) => {
            setUserValue(Number(event.currentTarget.value))
          }}
          value={userValue}
        >
          {usersState.items.map((user) => (
            <option key={`option-${user.id}`} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <button type="submit" className="new-post__button">
          submit
        </button>
      </form>
    </div>
  )
}

export default NewPost

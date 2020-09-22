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
        <input
          id="title"
          type="text"
          className="new-post__form-input"
          value={titleValue}
          onChange={(event) => {
            setTitleValue(event.currentTarget.value)
          }}
          required
        />
        <input
          id="body"
          type="text"
          className="new-post__form-input"
          value={bodyValue}
          onChange={(event) => {
            setBodyValue(event.currentTarget.value)
          }}
          required
        />
        <select
          name="user"
          id="user"
          className="new-post__form-selector"
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
        <button type="submit" className="new-post__form-button">
          submit
        </button>
      </form>
    </div>
  )
}

export default NewPost

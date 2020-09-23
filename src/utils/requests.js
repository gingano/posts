import { setUsers } from '../redux/actions/users'
import {
  setPosts,
  setAllPosts,
  addPost,
  setCurrentPost,
  editPost,
  deletePost,
} from '../redux/actions/posts'

export const usersRequest = () => (dispatch) => {
  fetch(`https://jsonplaceholder.typicode.com/users`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  })
    .then((response) => {
      if (!response.ok) {
        throw response
      }
      return response.json()
    })
    .then((json) => {
      dispatch(setUsers(json))
    })
    .catch(() => {
      window.location.replace('/404')
    })
}

export const postsRequest = (userId) => (dispatch) => {
  fetch(
    `https://jsonplaceholder.typicode.com/posts${
      userId !== -1 ? `?userId=${userId}` : ``
    }`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw response
      }
      return response.json()
    })
    .then((json) => {
      if (json.length === 0) {
        window.location.replace('/404')
      }
      if (userId === -1) {
        dispatch(setAllPosts(json))
      } else {
        dispatch(setPosts(userId, json))
      }
    })
    .catch(() => {
      window.location.replace('/404')
    })
}

export const addPostRequest = (object, history) => (dispatch) => {
  fetch(`https://jsonplaceholder.typicode.com/posts`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(object),
  })
    .then((response) => {
      if (!response.ok) {
        throw response
      }
      return response.json()
    })
    .then((json) => {
      dispatch(addPost(json))
      history.push('/posts')
    })
    .catch(() => {
      window.location.replace('/404')
    })
}

export const postRequest = (postId) => (dispatch) => {
  const post = {}
  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  })
    .then((response) => {
      if (!response.ok) {
        throw response
      }
      return response.json()
    })
    .then((json) => {
      post.info = json

      if (Object.keys(post).length === 2) {
        dispatch(setCurrentPost(post))
      }
    })
    .catch(() => {
      window.location.replace('/404')
    })

  fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  })
    .then((response) => {
      if (!response.ok) {
        throw response
      }
      return response.json()
    })
    .then((json) => {
      post.comments = json

      if (Object.keys(post).length === 2) {
        dispatch(setCurrentPost(post))
      }
    })
    .catch(() => {
      window.location.replace('/404')
    })
}

export const editPostRequest = (postId, object, setIsEditing) => (dispatch) => {
  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(object),
  })
    .then((response) => {
      if (!response.ok) {
        throw response
      }
      return response.json()
    })
    .then((json) => {
      dispatch(editPost(json))
      setIsEditing(false)
    })
    .catch(() => {
      window.location.replace('/404')
    })
}

export const deletePostRequest = (postId, setIsEditing, history) => (
  dispatch
) => {
  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  })
    .then((response) => {
      if (!response.ok) {
        throw response
      }
      return response.json()
    })
    .then(() => {
      dispatch(deletePost(postId))
      setIsEditing(false)
      history.push('/posts')
    })
    .catch(() => {
      window.location.replace('/404')
    })
}

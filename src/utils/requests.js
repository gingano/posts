import { setUsers } from '../redux/actions/users'
import {
  setPosts,
  setAllPosts,
  addPost,
  setCurrentPost,
  editPost,
  deletePost,
} from '../redux/actions/posts'
import { setIsVisible } from '../redux/actions/preloader'

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
      dispatch(setIsVisible(false))
    })
    .catch(() => {
      window.location.replace('/404')
    })
}

export const postsRequest = (userId, history, linkTo = '/') => (dispatch) => {
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
        dispatch(setIsVisible(false))
      } else {
        dispatch(setPosts(userId, json))
        dispatch(setIsVisible(false))
      }

      if (history) {
        history.push(linkTo)
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
      dispatch(setIsVisible(false))
    })
    .catch(() => {
      window.location.replace('/404')
    })
}

export const postRequest = (postId, history, linkTo = '/') => (dispatch) => {
  const post = {}

  const setPost = (currentPost) => {
    dispatch(setCurrentPost(currentPost))
    dispatch(setIsVisible(false))

    if (history) {
      history.push(linkTo)
    }
  }

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
        setPost(post)
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
        setPost(post)
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
      dispatch(setIsVisible(false))
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
      dispatch(setIsVisible(false))
    })
    .catch(() => {
      window.location.replace('/404')
    })
}

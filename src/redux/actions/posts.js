export const setPosts = (userId, posts) => ({
  type: 'SET_POSTS',
  userId,
  value: posts,
})

export const setAllPosts = (posts) => ({
  type: 'SET_ALL_POSTS',
  value: posts,
})

export const setAllPostsToItems = () => ({
  type: 'SET_ALL_POSTS_TO_ITEMS',
})

export const addPost = (post) => ({
  type: 'ADD_POST',
  value: post,
})

export const setCurrentPost = (post) => ({
  type: 'SET_CURRENT_POST',
  value: post,
})

export const editPost = (post) => ({
  type: 'EDIT_POST',
  value: post,
})

export const deletePost = (postId) => ({
  type: 'DELETE_POST',
  postId,
})

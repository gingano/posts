const initialState = {
  allPosts: [],
  items: [],
  currentUserId: -1,
  currentPost: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return {
        ...state,
        currentUserId: action.userId,
        items: action.value,
      }

    case 'SET_ALL_POSTS':
      return {
        ...state,
        allPosts: action.value,
      }

    case 'SET_ALL_POSTS_TO_ITEMS':
      return {
        ...state,
        items: state.allPosts,
      }

    case 'ADD_POST':
      return {
        ...state,
        allPosts: [...state.allPosts, action.value],
      }

    case 'SET_CURRENT_POST':
      return {
        ...state,
        currentPost: action.value,
      }

    case 'EDIT_POST':
      return {
        ...state,
        currentPost: { ...state.currentPost, info: action.value },
      }

    case 'DELETE_POST': {
      const newAllPosts = [...state.allPosts]
      const postIndex = newAllPosts.findIndex(
        (item) => item.id === action.postId
      )
      newAllPosts.splice(postIndex, 1)
      return {
        ...state,
        currentPost: {},
        allPosts: newAllPosts,
      }
    }

    default:
      return state
  }
}

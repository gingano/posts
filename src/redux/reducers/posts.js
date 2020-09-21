const initialState = {
  posts: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FILL_POSTS':
      return {
        ...state,
        posts: action.value
      }

    default:
      return state
  }
}

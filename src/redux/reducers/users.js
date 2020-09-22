const initialState = {
  items: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return {
        ...state,
        items: action.value,
      }

    default:
      return state
  }
}

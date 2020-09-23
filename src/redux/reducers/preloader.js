const initialState = {
  isVisible: true,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_IS_VISIBLE':
      return {
        ...state,
        isVisible: action.value,
      }

    default:
      return state
  }
}

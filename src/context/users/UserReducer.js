const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        loading: false,
      }
    case 'REGISTER_USER':
      return {
        ...state,
        user: action.payload,
        loading: false,
      }
    case 'GET_USER_DATA':
      return {
        ...state,
        user: action.payload,
        loading: false,
      }
    case 'LOGOUT':
      return {
        ...state,
        user: {},
      }
    default:
      return state
  }
}

export default userReducer

const initialState = {
   token: null,
   user: null,
}

const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case 'SIGN_IN':
         if (action.payload.token)
            localStorage.setItem('token', action.payload.token)
         return {
            ...state,
            token: action.payload.token,
            user: action.payload.user,
         }

      case 'SIGN_OUT':
         localStorage.removeItem('token')
         return initialState

      default:
         return state
   }
}

export default authReducer

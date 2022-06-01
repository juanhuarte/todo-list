import axios from 'axios'

export const SIGN_IN = (user) => {
   return async (dispatch) => {
      const { data } = await axios.post(
         'http://localhost:4000/api/user/sign-in',
         user
      )
      if (!data.success) return data.error
      dispatch({
         type: 'SIGN_IN',
         payload: { token: data.token, user: data.data },
      })
   }
}

export const DEL_USER = () => {
   return async (dispatch) => {
      const { data } = await axios.delete('http://localhost:4000/api/user/')
      if (data.success) return dispatch({ type: 'SIGN_OUT' })
      return data.response
   }
}

export const VERIFY_TOKEN = (token) => {
   return async (dispatch) => {
      const { data } = await axios.get(
         'http://localhost:4000/api/verify-token',
         {
            headers: {
               Authorization: token,
            },
         }
      )
      if (!data.success) return data.error
      dispatch({
         type: 'SIGN_IN',
         payload: {
            token,
            user: data.data,
         },
      })
   }
}

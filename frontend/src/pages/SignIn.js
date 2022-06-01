import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { SIGN_IN } from '../redux/actions'

let touched = false
const SignIn = () => {
   const dispatch = useDispatch()
   const [user, setUser] = useState({
      username: {
         value: '',
         error: '',
      },
      password: {
         value: '',
         error: '',
      },
   })
   const inputHandler = (e) => {
      setUser({
         ...user,
         [e.target.name]: {
            value: e.target.value,
            error: '',
         },
      })
   }

   const submitHandler = async (e) => {
      e.preventDefault()
      // no mandar la request al back si algun campo tiene error con valor

      if (
         !touched ||
         Object.keys(user).some((property) => user[property].error.length)
      ) {
         alert('Todos los campos son obligatorios!')
         return
      }
      try {
         const respuesta = await dispatch(
            SIGN_IN({
               username: user.username.value,
               password: user.password.value,
            })
         )
         if (respuesta) throw new Error(respuesta)
      } catch (e) {
         alert(e.message)
      }
   }

   const validateInput = (e) => {
      if (!touched) touched = true
      if (!e.target.value)
         setUser({
            ...user,
            [e.target.name]: {
               value: e.target.value,
               error: 'No puede estar vacío',
            },
         })
   }

   return (
      <div className='sign_container'>
         <h2>Ingresá a tu Cuenta!</h2>
         <form onSubmit={submitHandler}>
            <input
               type='text'
               name='username'
               placeholder='Ingresá tu usuario'
               value={user.username.value}
               onChange={inputHandler}
               onBlur={validateInput}
            />
            <p className='error'></p>
            <input
               type='password'
               name='password'
               placeholder='Ingresá tu contraseña'
               value={user.password.value}
               onChange={inputHandler}
               onBlur={validateInput}
            />
            <p className='error'></p>
            <button>Enviar</button>
         </form>
         <p className='redireccion'>
            No tenés cuenta ? Hacé click <Link to='/sign-up'>acá</Link>
         </p>
      </div>
   )
}

export default SignIn

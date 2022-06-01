import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

let touched = false
const SignUp = () => {
   const navigate = useNavigate()
   const [user, setUser] = useState({
      firstName: {
         value: '',
         error: '',
      },
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
         const { data } = await axios.post(
            'http://localhost:4000/api/user/sign-up',
            {
               firstName: user.firstName.value,
               username: user.username.value,
               password: user.password.value,
            }
         )
         if (!data.success) {
            alert('Algo falló')
            return
         }
         alert('Usuario creado')
         navigate('/sign-in')
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
         <h2>Creá tu cuenta!</h2>
         <form onSubmit={submitHandler}>
            <input
               type='text'
               name='firstName'
               placeholder='Ingresá tu nombre'
               value={user.firstName.value}
               onChange={inputHandler}
               onBlur={validateInput}
            />
            <p className='error'>{user.firstName.error}</p>
            <input
               type='text'
               name='username'
               placeholder='Ingresá tu usuario'
               value={user.username.value}
               onChange={inputHandler}
               onBlur={validateInput}
            />
            <p className='error'>{user.username.error}</p>
            <input
               type='password'
               name='password'
               placeholder='Ingresá tu contraseña'
               value={user.password.value}
               onChange={inputHandler}
               onBlur={validateInput}
            />
            <p className='error'>{user.password.error}</p>
            <button>Enviar</button>
         </form>
         <p className='redireccion'>
            Ya tenés cuenta ? Hacé click <Link to='/sign-in'>acá</Link>
         </p>
      </div>
   )
}

export default SignUp

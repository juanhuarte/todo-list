import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DEL_USER } from '../redux/actions'

const Header = () => {
   const { token, user } = useSelector((state) => state.auth)
   const dispatch = useDispatch()
   const logout = () => {
      dispatch({ type: 'SIGN_OUT' })
   }
   const borrarUsuario = async () => {
      const respuesta = await dispatch(DEL_USER())
      if (respuesta) alert(respuesta)
   }
   return (
      <header>
         <h1>Todo App</h1>
         <nav>
            <p>A</p>
            <p>B</p>
            <p>C</p>
            {token && (
               <div className='fotoSaludo'>
                  <p>Bienvenido {user.firstName}</p>
                  <div
                     className='foto'
                     style={{
                        backgroundImage: `url("${user.image}")`,
                     }}></div>
                  <p onClick={borrarUsuario}>Borrar Usuario</p>
                  <p onClick={logout}>Logout</p>
               </div>
            )}
         </nav>
      </header>
   )
}

export default Header

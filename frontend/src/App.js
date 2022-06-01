import React from 'react'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Todos from './pages/Todos'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import { useDispatch, useSelector } from 'react-redux'
import { VERIFY_TOKEN } from './redux/actions'

const App = () => {
   const { token, user } = useSelector((state) => state.auth)

   const dispatch = useDispatch()
   if (!token) {
      const tokenLS = localStorage.getItem('token')
      if (tokenLS) {
         // verificar que sea un token valido
         dispatch(VERIFY_TOKEN(tokenLS)).then((respuesta) => {
            if (respuesta) {
               localStorage.removeItem('token')
               alert(respuesta)
            }
         })
      }
   }

   const routes = token ? (
      <Routes>
         <Route path='/' element={<Todos />} />
         <Route path='*' element={<Navigate to='/' />} />
      </Routes>
   ) : (
      <Routes>
         <Route path='/sign-up' element={<SignUp />} />
         <Route path='/sign-in' element={<SignIn />} />
         <Route path='*' element={<Navigate to='/sign-in' />} />
      </Routes>
   )

   return (
      <BrowserRouter>
         <Header />
         <div className='mainContainer'>{routes}</div>
         <Footer />
      </BrowserRouter>
   )
}

export default App

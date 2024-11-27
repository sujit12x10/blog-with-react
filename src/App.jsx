import { useState } from 'react'
import './App.css'
import conf from "./conf/conf"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Footer, Header, Loader } from './components/index.js'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Container } from "../src/components/index"
import appwriteService from './appwrite/config'
import { setAllPosts } from "./store/postSlice.js"

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const authStatus = useSelector(state => state.auth.status)
  const location = useLocation()
 
  // Checking User Login Status
  useEffect(() => {
    // Getting Logged in User
    authService.getCurrentUser()
    .then((userData) => {
      if (userData){
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(setLoading(false))
  }, [])

  
  // Getting Posts from Server and Setting into Store
  useEffect(() => {
    appwriteService.getPosts().then((data) => {
      dispatch(setAllPosts(data.documents))
    })
  }, [authStatus, location.pathname])  

  return !loading ?  (
    <div className='min-h-full w-screen flex flex-wrap content-between'>
      <div className='w-screen block'>
        <Header />
        <main className='min-h-[86vh] bg-white'>
          <Container>
            <Outlet />
          </Container>
        </main>
        <Footer />
      </div>
    </div>
  ) : <Loader />
}

export default App

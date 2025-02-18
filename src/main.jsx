import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom'
import { ProtectedRoute, Home, Login, Signup, AllPosts, AddPost, EditPost, Post, About } from "./components/index.js"


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} /> 
              {/* Protected for loggedIn users */}
              <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />}/>
              <Route path="/about" element={<About />} />
              <Route path="/allposts" element={<AllPosts />} />
              <Route path="/post/:slug" element={<Post />} />
                <Route path="/add-post" element={<AddPost />} />
                <Route path="/edit-post/:documentId" element={<EditPost />} />
              </Route>
            </Route>
          </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)

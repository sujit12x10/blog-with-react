import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Protected, Home, Login, Signup, AllPosts, AddPost, EditPost, Post, About } from "./components/index.js"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Protected authentication={false}>
            <Home />
          </Protected>
        )
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/login",
        element: (
          <Protected>
            <Login />
          </Protected>
        ),
      },
      {
        path: "/signup",
        element: (
          <Protected>
            <Signup/>
          </Protected>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <Protected authentication={false}>
            {" "}
            <AllPosts />
          </Protected>
        ),
      },
      {
        path: "/add-post",
        element: (
          <Protected authentication={false}>
            {" "}
            <AddPost />
          </Protected>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <Protected authentication={false}>
            {" "}
            <EditPost />
          </Protected>
        ),
      },
      {
        path: "/post/:slug",
        element: (
          <Protected authentication={false}>
            <Post />
          </Protected>
        )
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)

import React from 'react'
import { RouterProvider } from 'react-router'
import { router } from './app.routes'
import './features/shared/global.scss'
import { AuthProvider } from './features/auth/auth.context'
import { PostContectProvider } from './features/posts/post.context'

const App = () => {
  return (
    <AuthProvider>
      <PostContectProvider>
          <RouterProvider router={router}/>
      </PostContectProvider>
      
    </AuthProvider>
    
  )
}

export default App

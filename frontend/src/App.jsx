import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import CreatePost from './pages/CreatePost.jsx'
import DeletePost from './pages/DeletePost.jsx'
import EditPost from './pages/EditPost.jsx'
import Navbar from './components/Navbar.jsx'
import SignIn from './pages/SignIn.jsx'
import Profile from './pages/Profile.jsx'
import Footer from './components/Footer.jsx'
import ViewPost from './pages/ViewPost.jsx'
import { useAuthContext } from './hooks/useAuthContext.js'


function App() {
  const {user} = useAuthContext()

  return(
    <>
      <Navbar />
      <Routes>
        <Route 
          path='/' 
          element={<Home/>} 
        />
        <Route 
          path='/profile' 
          element={user ? <Profile/> : <Navigate to='/signin'/>} 
          />
        <Route 
          path='/signin' 
          element={!user ? <SignIn/> : <Navigate to='/profile' />} 
        />
        <Route 
          path='/posts/create' 
          element={user ? <CreatePost /> : <Navigate to='/signin'/>} 
        />
        <Route 
          path='/posts/:id' 
          element={<ViewPost/>} 
        />
        <Route 
          path='/posts/edit/:id' 
          element={user ? <EditPost/> : <Navigate to='/signin'/>} 
        />
        <Route 
          path='/posts/delete/:id' 
          element={user ? <DeletePost/> : <Navigate to='/signin'/>} 
        />
      </Routes>
      <Footer />
    </>
    
  )
}

export default App

import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import CreatePost from './pages/CreatePost.jsx'
import DeletePost from './pages/DeletePost.jsx'
import EditPost from './pages/EditPost.jsx'
import Navbar from './components/Navbar.jsx'

function App() {
  return(
    <>
    <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/posts/create' element={<CreatePost/>} />
        <Route path='/posts/edit/:id' element={<EditPost/>} />
        <Route path='/posts/delete/:id' element={<DeletePost/>} />
      </Routes>
    </>
    
  )
}

export default App

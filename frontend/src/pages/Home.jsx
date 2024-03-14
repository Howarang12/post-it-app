import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import PostList from '../components/PostList'
import { FaSearch } from "react-icons/fa"
import { useAuthContext } from '../hooks/useAuthContext'



const Home = () => {
	const [posts, setPosts] = useState([])
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const {user} = useAuthContext()

	// useEffect to load all posts, setPosts
	useEffect(() => {
    setLoading(true)
    axios
      .get('http://localhost:3000/api/posts')
      .then((response) => {
        setPosts(response.data.reverse())
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }, [])

	return (
		<>
			<div className='container py-10 px-10 mx-0 min-w-full flex flex-col items-center'>
				{user &&
				<button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-8 border-b-4 border-blue-700 hover:border-blue-500 rounded w-1/2 m-9'
				onClick={() => navigate('posts/create')}>
					Create Post
				</button>
				}
				
			</div>
			<div className="pt-2 relative mx-auto text-gray-600">
        <input className="m-9 border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="search" name="search" placeholder="Search" />
				
        <button type="submit" className="absolute right-0 top-0 mt-5 mr-4 w-full">
					<FaSearch />	
        </button>
      </div>
			<PostList posts={posts}/> 
		</>
	)
}

export default Home

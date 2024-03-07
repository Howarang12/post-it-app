import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import PostList from '../components/PostList'
import { FaSearch } from "react-icons/fa"



const Home = () => {
	const [posts, setPosts] = useState([])
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	// useEffect to load all posts, setPosts
	useEffect(() => {
    setLoading(true)
    axios
      .get('http://localhost:3000/api/posts')
      .then((response) => {
        setPosts(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }, [])

	// const dummy = [{
	// 	postID: 1,
	// 	user: 'John Doe',
	// 	title: 'Dummy Post',
	// 	text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed earum doloribus corporis consectetur non reprehenderit natus numquam, amet exercitationem architecto, atque quis. Animi sed, placeat nisi rem quibusdam ducimus voluptas numquam deserunt.',
	// 	likes: 0,
	// 	replies: 0
	// 	},
	// 	{
	// 	postID: 2,
	// 	user: 'Jane Doe',
	// 	title: 'Dummy Post 2',
	// 	text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ut magni et odit? Dignissimos quod incidunt omnis architecto quibusdam eveniet!',
	// 	likes: 0,
	// 	replies: 0
	// 	},
	// ]

	return (
		<>
			<div className='container py-10 px-10 mx-0 min-w-full flex flex-col items-center'>
				<button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-8 border-b-4 border-blue-700 hover:border-blue-500 rounded w-1/2 m-9'
				onClick={() => navigate('posts/create')}>
					Create Post
				</button>
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

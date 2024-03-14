import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import PostList from '../components/PostList'
import { useAuthContext } from '../hooks/useAuthContext'

const Profile = () => {
	const navigate = useNavigate()
	const {user} = useAuthContext()
	const [userPosts, setUserPosts] = useState([])


	useEffect(() => {
		axios.get(`http://localhost:3000/api/posts/user/${user.userID}`, {
			headers: {
				'Authorization': `Bearer ${user.token}`
			}
			})
			.then((response) => {
				setUserPosts(response.data.reverse())
				console.log(response.data)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])

	return (
		<div className="p-4">
			<BackButton />
      <h1 className='text-3xl my-4'>Profile</h1>
			<div className='container py-10 px-10 mx-0 min-w-full flex flex-col items-center'>
					<button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-8 border-b-4 border-blue-700 hover:border-blue-500 rounded w-1/2 m-9'
					onClick={() => navigate('/posts/create')}>
						Create Post
					</button>
			</div>
			<PostList posts={userPosts}/>
		</div>
	)
}

export default Profile
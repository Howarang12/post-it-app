import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'



const CreatePost = () => {
	const { user } = useAuthContext()
	const [title, setTitle] = useState('')
	const [text, setText] = useState('')
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	const handleCreatePost = () => {
		if (!user) return

		const data = {
			userID: user.userID,
			title,
			text
		}
		navigate('/')
		location.reload()
		setLoading(true)

		// axios request to microservice
    axios
      .post(`http://localhost:3000/api/posts`, data, {
				headers: {
					'Authorization': `Bearer ${user.token}`
				}
			}) 
      .then(() => {
        setLoading(false)
        navigate('/')
      })
      .catch((error) => {
        setLoading(false)
        // alert('An error happened. Please Check console')
        console.log(error);
      });
	}

	return (
		<div className="p-4">
			<BackButton />
			<h1 className="text-3xl my-4">Create Post</h1>
			{loading ? <Spinner /> : ''}
			<div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
				<div className="my-4">
					<lable className="text-xl mr-4 text-black">Title</lable>
					<input 
						type="text" 
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="border-2 border-gray-950 px-4 py-2 mt-1 w-full rounded-md"
					/>
				</div>

				<div className="my-4">
					<lable className="text-xl mr-4 text-black">Text</lable>
					<textarea
						type="text" 
						value={text}
						onChange={(e) => setText(e.target.value)}
						rows="10"
						className="border-2 border-gray-950 px-4 py-2 mt-1 w-full rounded-md"
					/>
				</div>

				<button className='bg-green-500 hover:bg-green-400 text-white font-bold py-4 px-8 border-b-4 border-green-700 hover:border-green-500 rounded  m-9' onClick={handleCreatePost}>
					Create Post
				</button>
			</div>

		</div>
	)
}

export default CreatePost
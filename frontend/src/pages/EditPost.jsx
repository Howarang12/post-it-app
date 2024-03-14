import React, {useState, useEffect} from 'react'
import BackButton from '../components/BackButton'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'



const EditPost = () => {
	const [title, setTitle] = useState('')
	const [text, setText] = useState('')
	const navigate = useNavigate()
	const {id} = useParams()
	const {user} = useAuthContext()

	useEffect(() => {
		axios
			.get(`http://localhost:3000/api/posts/${id}`) // <-- replace url here
			.then((response) => {
				setTitle(response.data.title)
				setText(response.data.text)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])

	const handleEditPost = () => {
		if (!user) return
		axios.put(`http://localhost:3000/api/posts/${id}`, {title, text}, {
			headers: {
				'Authorization': `Bearer ${user.token}`
			}
			})
			.then((response) => {
				console.log(response.data.message)
				navigate(`/posts/${id}`)
			})
			.catch((error) => {
				console.log(error)
			})

	}
	
	return (
		<div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Post</h1>
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

				<button className='bg-green-500 hover:bg-green-400 text-white font-bold py-4 px-8 border-b-4 border-green-700 hover:border-green-500 rounded  m-9' onClick={handleEditPost}>
					Update Post
				</button>
			</div>
    </div>
	)
}

export default EditPost
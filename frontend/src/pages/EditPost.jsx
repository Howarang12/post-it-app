import React, {useState, useEffect} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'



const EditPost = () => {
	const [user, setUser] = useState('')
	const [title, setTitle] = useState('')
	const [text, setText] = useState('')
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const {id} = useParams()

	// useEffect(() => {
	// 	setLoading(true)
	// 	axios
	// 		.get(`http://localhost:5555/posts/${id}`) // <-- replace url here
	// 		.then((response) => {
	// 			setUser(response.data.author)
	// 			setTitle(response.data.title)
	// 			setText(response.data.text)
	// 		})
	// 		.catch((error) => {
	// 			setLoading(false)
	// 			console.log(error)
	// 		})
	// })

	const handleEditPost = () => {
		console.log('edit')
	}
	
	const dummy = [{
		id: 1,
		user: 'John Doe',
		title: 'Dummy Post',
		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed earum doloribus corporis consectetur non reprehenderit natus numquam, amet exercitationem architecto, atque quis. Animi sed, placeat nisi rem quibusdam ducimus voluptas numquam deserunt.',
		likes: 0,
		replies: 0
		},
		{
		id: 2,
		user: 'Jane Doe',
		title: 'Dummy Post 2',
		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ut magni et odit? Dignissimos quod incidunt omnis architecto quibusdam eveniet!',
		likes: 0,
		replies: 0
		},
	]
	useEffect(() => {
    setUser(dummy[id-1].user)
		setTitle(dummy[id-1].title)
		setText(dummy[id-1].text)
  }, [])

	return (
		<div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
				<div className="my-4">
					<lable className="text-xl mr-4 text-black">User</lable>
					<input 
						type="text" 
						value={user}
						onChange={(e) => setUser(e.target.value)}
						className="border-2 border-gray-950 px-4 py-2 mt-1 w-full rounded-md"
					/>
				</div>

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
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineDelete } from 'react-icons/md'
import { AiOutlineEdit } from 'react-icons/ai'
import { GoComment } from "react-icons/go"
import axios from 'axios'
import { useAuthContext } from '../hooks/useAuthContext'

const SingleComment = ({comment}) => {
	const {user} = useAuthContext()
	const [editing, setEditing] = useState(false)
	const [body, setBody] = useState(comment.body)

	const handleUpdateComment = () => {
		if (!user) return
		axios.put(`http://localhost:3000/api/comments/${comment.commentID}`, {body}, {
			headers: {
				'Authorization': `Bearer ${user.token}`
			}
			})
			.then((response) => {
				console.log(response.data.message)
			})
			.catch((error) => {
				console.log(error)
			})
	}

	const handleToggleEdit = () => {
		setEditing(!editing)
		setBody(comment.body)
	}

	return (
		<article className="px-12 py-6 text-base border-2 m-3">
			<div className="flex justify-between items-center mb-2">
					<div className="flex items-center">
							<p className="inline-flex items-center mr-3 text-sm font-semibold">{comment.username}</p>
							<p className="text-sm ">{new Date(comment.createdAt).toLocaleDateString()}</p>
					</div> 
			</div>
			{editing ?
					<form onSubmit={handleUpdateComment} className=' flex'>
							<input 
								type="text" 
								value={body}
								onChange={(e) => setBody(e.target.value)}
								className="border-2 border-gray-950 px-4 py-2 mt-1 w-full rounded-md"
								placeholder='Add a comment'
							/>
							<button type="submit" className='bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-8 border-b-4 border-green-700 hover:border-green-500 rounded ml-5'>Update</button>
							<button type="submit" className='bg-red-500 hover:bg-red-400 text-white font-bold py-3 px-8 border-b-4 border-red-700 hover:border-red-500 rounded ml-5' onClick={handleToggleEdit}>Cancel</button>
					</form> 
					:
					<p className="">{comment.body}</p>
			}
			
			
			{user && user.userID == comment.userID &&
				<div className='flex mt-2'>
					<span onClick={handleToggleEdit}><AiOutlineEdit className='mt-1'/></span>
					<Link to={`/comments/delete/${comment.commentID}`} className='pl-4'>
						<span><MdOutlineDelete className='mt-1'/></span>
					</Link>
				</div>
			}
		</article>

	)
}

export default SingleComment
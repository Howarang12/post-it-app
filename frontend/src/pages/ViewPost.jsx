import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MdOutlineDelete } from 'react-icons/md'
import { AiOutlineEdit, AiOutlineLike } from 'react-icons/ai'
import { GoComment } from "react-icons/go"
import axios from 'axios'
import { useAuthContext } from '../hooks/useAuthContext'

const ViewPost = () => {
	const [post, setPost] = useState({})
	const [username, setUsername] = useState('')
	const [likeCount, setLikeCount] = useState(0)
	const [comments, setComments] = useState([])
	const {id} = useParams()
	const {user} = useAuthContext()
	
	useEffect(() => {
    axios
      .get(`http://localhost:3000/api/posts/${id}`)
      .then((response) => {
				setPost(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

  }, [])

	useEffect(() => {
		axios
		.get(`http://localhost:3000/api/users/${post.userID}`)
		.then((response) => {
			setUsername(response.data.username)
		})
		.catch((error) => {
			console.log(error)
		})
  }, [post])

	const handleLike = () => {

	}

	return (
		<>
			<h2 className='px-12 py-2 mt-20 text-xl font-bold'>{post.title}</h2>
			<p className='px-12 py-1'>{username}</p>
			<p className='px-12 py-1 mb-2'>{post.text}</p>

			<div className="flex justify-between item-center-gap-x-2 mt-4">
				<div className='flex px-12 mb-10'>
						<button  className='flex pr-4 align-middle' onClick={handleLike}>
							<span>{likeCount}</span>
							<AiOutlineLike className='ml-1 mt-1'/> 
						</button>
						<Link to={`/posts/${post.postID}`} className='flex px-4'>
							<span>{comments.length}</span>
							<GoComment className='ml-1 mt-1'/>
						</Link>
				</div>
				
				{user && user.userID == post.userID &&
					<div className='flex px-12 mb-10'>
						<Link to={`/posts/edit/${post.postID}`} className='px-4'>
							<span><AiOutlineEdit className='mt-1'/></span>
						</Link>
						<Link to={`/posts/delete/${post.postID}`} className='pl-4'>
							<span><MdOutlineDelete className='mt-1'/></span>
						</Link>
					</div>
				}
			</div>
			
			
			<div className="relative flex py-5 items-center px-6">
					<div className="flex-grow border-t border-gray-400"></div>
			</div>
		</>
	)
}

export default ViewPost
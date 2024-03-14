import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineDelete } from 'react-icons/md'
import { AiOutlineEdit, AiOutlineLike } from 'react-icons/ai'
import { GoComment } from "react-icons/go"
import axios from 'axios'
import { useAuthContext } from '../hooks/useAuthContext'

const SinglePost = ({post}) => {

	const [likeCount, setLikeCount] = useState(0)
	const [commentCount, setCommentCount] = useState(0)
	const [username, setUsername] = useState('')
	const { user } = useAuthContext()

	const handleLike = () => {
		const data = {
			userID: user.userID,
			postID: post.postID
		}

		axios.post(`http://localhost:3000/api/posts/${post.postID}/like`, data)
			.then((response) =>{
				axios.get(`http://localhost:3000/api/posts/${post.postID}/likes`)
					.then((response) =>{
						setLikeCount(response.data.totalLikes)
					})
					.catch((error) =>{
						console.log(error)
					})
			})
			.catch((error) =>{
				console.log(error)
			})
	}


	useEffect(() => {
    axios
      .get(`http://localhost:3000/api/users/${post.userID}`)
      .then((response) => {
				setUsername(response.data.username)
      })
      .catch((error) => {
        console.log(error)
      })

		axios.get(`http://localhost:3000/api/posts/${post.postID}/likes`)
		.then((response) =>{
			setLikeCount(response.data.totalLikes)
		})
		.catch((error) =>{
			console.log(error)
		})
  }, [])

	

	return (
		<div className='border-2 border-blue-500 rounded-lg px-6 py-3 m-6 relative hover:shadow-xl'>
			<h2 className='absolute top-1 left-2 px-4 py-1 text-xl font-bold'>{post.title}</h2>
			<h4 className='mt-6 mb-3'>{username}</h4>
			<p>{post.text}</p>
			<div className="flex justify-between item-center-gap-x-2 mt-4">
				<div className='flex'>
					<button  className='flex pr-4 align-middle' onClick={handleLike}>
						<span>{likeCount}</span>
						<AiOutlineLike className='ml-1 mt-1'/> 
					</button>
					<Link to={`/posts/${post.postID}`} className='flex px-4'>
						<span>{commentCount}</span>
						<GoComment className='ml-1 mt-1'/>
					</Link>
				</div>

				{user && user.userID == post.userID &&
					<div className='flex'>
						<Link to={`/posts/edit/${post.postID}`} className='px-4'>
							<span><AiOutlineEdit className='mt-1'/></span>
						</Link>
						<Link to={`/posts/delete/${post.postID}`} className='pl-4'>
							<span><MdOutlineDelete className='mt-1'/></span>
						</Link>
					</div>
				}
				
			</div>
		</div>
	)
}

export default SinglePost
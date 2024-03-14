import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MdOutlineDelete } from 'react-icons/md'
import { AiOutlineEdit, AiOutlineLike } from 'react-icons/ai'
import { GoComment } from "react-icons/go"
import axios from 'axios'
import { useAuthContext } from '../hooks/useAuthContext'
import CommentList from '../components/CommentList'

const ViewPost = () => {
	const [post, setPost] = useState({})
	const [username, setUsername] = useState('')
	const [likeCount, setLikeCount] = useState(0)
	const [comments, setComments] = useState([])
	const [commentBody, setCommentBody] = useState()
	const {id} = useParams()
	const {user} = useAuthContext()

	const handleCreateComment = (e) => {
		e.preventDefault()

		if (!user) return

		console.log(`Create comment by ${user.username}`)
		const data = {
			body: commentBody,
			userID: user.userID,
			postID: id
		}
		console.log(data)
		axios
			.post('http://localhost:3000/api/comments', data, {
			headers: {
				'Authorization': `Bearer ${user.token}`
			}
			})
			.then((response) => {
				setCommentBody('')
				// reload comments
				axios
					.get(`http://localhost:3000/api/comments/${id}`)
					.then((response) => {
						setComments(response.data)
					})
					.catch((error) => {
						console.log(error)
					})
			})
			.catch((error) => {
				console.log(error)
			})
	}

	const handleLike = () => {
		const data = {
			userID: user.userID,
			postID: post.postID
		}

		axios
			.post(`http://localhost:3000/api/posts/${post.postID}/like`, data)
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
	
	// load post data and likes
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
		// get username
		axios
			.get(`http://localhost:3000/api/users/${post.userID}`)
			.then((response) => {
				setUsername(response.data.username)
			})
			.catch((error) => {
				console.log(error)
			})

		// get like count
		axios
			.get(`http://localhost:3000/api/posts/${post.postID}/likes`)
			.then((response) =>{
				setLikeCount(response.data.totalLikes)
			})
			.catch((error) =>{
				console.log(error)
			})

		// load comments
		axios
			.get(`http://localhost:3000/api/comments/${id}`)
			.then((response) => {
				setComments(response.data)
			})
			.catch((error) => {
				console.log(error)
			})
  }, [post])


	return (
		< >
			<h2 className='px-12 py-2 mt-20 text-xl font-bold'>{post.title}</h2>

			<div className='px-12 py-1 flex justify-between items-center'>
				<h4 className='font-semibold'>{username}</h4> <p className="text-sm mb-3">{new Date(post.createdAt).toLocaleDateString()}</p>
			</div>
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

			{user &&
			<form onSubmit={handleCreateComment} className='px-12 flex'>
					<input 
						type="text" 
						value={commentBody}
						onChange={(e) => setCommentBody(e.target.value)}
						className="border-2 border-gray-950 px-4 py-2 mt-1 w-full rounded-md"
						placeholder='Add a comment'
					/>
					<button type="submit" className='bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-8 border-b-4 border-green-700 hover:border-green-500 rounded ml-5'>Comment</button>
			</form>
			}
			
			
			
			<div className="relative flex py-5 items-center px-6 my-4">
					<div className="flex-grow border-t border-gray-400"></div>
			</div>

			<CommentList comments={comments} />
		</>
	)
}

export default ViewPost
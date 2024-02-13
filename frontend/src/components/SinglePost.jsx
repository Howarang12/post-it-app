import React from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineDelete } from 'react-icons/md'
import { AiOutlineEdit, AiOutlineLike } from 'react-icons/ai'
import { GoComment } from "react-icons/go"

const SinglePost = ({post}) => {
	return (
		<div className='border-2 border-blue-500 rounded-lg px-6 py-3 m-6 relative hover:shadow-xl'>
			<h2 className='absolute top-1 left-2 px-4 py-1 text-xl font-bold'>{post.title}</h2>
			<h4 className='mt-6 mb-3'>{post.user}</h4>
			<p>{post.text}</p>
			<div className="flex justify-between item-center-gap-x-2 mt-4">
				<div className='flex'>
					<Link to={`/posts/like/${post.id}`} className='flex pr-4 align-middle'>
						<span>{post.likes}</span>
						<AiOutlineLike className='ml-1 mt-1'/> 
					</Link>
					<Link to={`/posts/${post.id}`} className='flex px-4'>
						<span>{post.replies}</span>
						<GoComment className='ml-1 mt-1'/>
					</Link>
				</div>
				<div className='flex'>
					<Link to={`/posts/edit/${post.id}`} className='px-4'>
						<span><AiOutlineEdit className='mt-1'/></span>
					</Link>
					<Link to={`/posts/delete/${post.id}`} className='pl-4'>
						<span><MdOutlineDelete className='mt-1'/></span>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default SinglePost
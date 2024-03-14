import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineDelete } from 'react-icons/md'
import { AiOutlineEdit } from 'react-icons/ai'
import { GoComment } from "react-icons/go"
import axios from 'axios'
import { useAuthContext } from '../hooks/useAuthContext'

const SingleComment = ({comment}) => {
	const {user} = useAuthContext()

	return (
		<article className="px-12 py-6 text-base border-2 m-3">
			<div className="flex justify-between items-center mb-2">
					<div className="flex items-center">
							<p className="inline-flex items-center mr-3 text-sm font-semibold">{comment.username}</p>
							<p className="text-sm ">{new Date(comment.createdAt).toLocaleDateString()}</p>
					</div> 
			</div>
			<p className="">{comment.body}</p>
			
			{user && user.userID == comment.userID &&
				<div className='flex mt-2'>
					<span><AiOutlineEdit className='mt-1'/></span>
					<Link to={`/comments/delete/${comment.commentID}`} className='pl-4'>
						<span><MdOutlineDelete className='mt-1'/></span>
					</Link>
				</div>
			}
		</article>

	)
}

export default SingleComment
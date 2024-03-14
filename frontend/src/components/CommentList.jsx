import React from 'react'
import SingleComment from './SingleComment'

const CommentList = ({ comments }) => {
	return (
		<div className=''>
			{comments.map((comment) => (
				<SingleComment key={comment.commentID} comment={comment} />
			))}
		</div>
	)
}

export default CommentList
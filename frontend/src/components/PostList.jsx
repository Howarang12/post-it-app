import React from 'react'
import SinglePost from './SinglePost'

const PostList = ({ posts }) => {
	return (
		<div className=''>
			{posts.map((post) => (
				<SinglePost key={post.id} post={post} />
			))}
		</div>
	)
}

export default PostList
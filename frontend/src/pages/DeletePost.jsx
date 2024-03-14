import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const DeletePost = () => {
	const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams()
  const { user } = useAuthContext()

	const handleDeletePost = () => {
    console.log('delete')
    setLoading(true)

    if (!user) return
    
    axios
      .delete(`http://localhost:3000/api/posts/${id}`, {
				headers: {
					'Authorization': `Bearer ${user.token}`
				}
			}) 
      .then(() => {
        setLoading(false)
        navigate('/')
        location.reload()
      })
      .catch((error) => {
        setLoading(false)
        console.log(error)
      })
  }

	return (
		<div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Post</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are You Sure You want to delete this post?</h3>

        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeletePost}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
	)
}

export default DeletePost
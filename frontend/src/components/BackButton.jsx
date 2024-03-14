import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'


const BackButton = () => {
	const navigate = useNavigate()
	return (
		<div 
			className='flex bg-blue-500 text-white px-4 py-1 rounded-lg w-fit'
			onClick={() => navigate(-1)}
		>
				<BsArrowLeft className='text-3xl'/>
		</div>
	)
}

export default BackButton
import React, {useState, useEffect} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const SignIn = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)

	return (
		<div className="p-4">
			<BackButton />
			<h1 className="text-3xl my-4">Sign In</h1>
			{loading ? <Spinner /> : ''}
			<div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
				<div className="my-4">
					<lable className="text-xl mr-4 text-black">Email</lable>
					<input 
						type="text" 
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="border-2 border-gray-950 px-4 py-2 mt-1 w-full rounded-md"
					/>
				</div>

				<div className="my-4">
					<lable className="text-xl mr-4 text-black">Password</lable>
					<input 
						type="text" 
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="border-2 border-gray-950 px-4 py-2 mt-1 w-full rounded-md"
					/>
				</div>

				<button className='bg-green-500 hover:bg-green-400 text-white font-bold py-4 px-8 border-b-4 border-green-700 hover:border-green-500 rounded  m-9' onClick={() => console.log('sign in')}>
					Sign In
				</button>

				<div class="relative flex py-5 items-center">
					<div class="flex-grow border-t border-gray-400"></div>
					<span class="flex-shrink mx-4 text-gray-400">Or</span>
					<div class="flex-grow border-t border-gray-400"></div>
				</div>

				<button className='bg-green-500 hover:bg-green-400 text-white font-bold py-4 px-8 border-b-4 border-green-700 hover:border-green-500 rounded  m-9' onClick={() => console.log('sign in')}>
					Register
				</button>
			</div>

		</div>
	)
}

export default SignIn
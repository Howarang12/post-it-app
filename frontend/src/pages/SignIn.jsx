import React, {useState, useEffect} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

const SignIn = () => {
	const [usernameReg, setUsernameReg] = useState('')
	const [emailReg, setEmailReg] = useState('')
	const [passwordReg, setPasswordReg] = useState('')
	const [passwordRegConfirm, setPasswordRegConfirm] = useState('')
	const [emailLog, setEmailLog] = useState('')
	const [passwordLog, setPasswordLog] = useState('')
	const [loading, setLoading] = useState(false)
	const [errorReg, setErrorReg] = useState(null)
	const [errorLog, setErrorLog] = useState(null)
	const navigate = useNavigate()
	const {dispatch} = useAuthContext()

	axios.defaults.withCredentials = true

	const handleRegistration = () => {
		if (passwordReg != passwordRegConfirm) {
			setErrorReg('Passwords do not match')
			return
		}
		const data = {
				username: usernameReg,
				email: emailReg,
				password: passwordReg
			}

		axios.post('http://localhost:3000/api/users/register', data)
			.then((response) => {
				setErrorReg(null)
				setLoading(true)
				console.log(response.data)
				// save user to local storage
				localStorage.setItem('user', JSON.stringify(response.data))

				// update authcontext
				dispatch({type: 'LOGIN', payload: response.data})
				setLoading(false)

				navigate('/')
			})
			.catch(error => {
				setErrorReg(error.response.data.message)
			})
	}

	const handleSignIn = () => {
		const data = {
				email: emailLog,
				password: passwordLog
			}
			
		axios.post('http://localhost:3000/api/users/login', data)
			.then((response) => {
				setErrorReg(null)
				setLoading(true)
				console.log(response.data)
				// save user to local storage
				localStorage.setItem('user', JSON.stringify(response.data))

				// update authcontext
				dispatch({type: 'LOGIN', payload: response.data})
				setLoading(false)

				navigate('/')
			})
			.catch(error => {
				setErrorLog(error.response.data.message)
			})
	}

	return (
		<div className="p-4">
			<BackButton />
			<h1 className="text-3xl my-4 text-center">Sign in to join the community and partake in open discussion!</h1>
			{loading ? <Spinner /> : ''}
			
			<div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto mt-3">

				{errorLog && 
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
					<strong className="font-bold">{errorLog}</strong>
				</div>
				}

				<div className="my-4">
					<lable className="text-xl mr-4 text-black">Email</lable>
					<input 
						type="text" 
						value={emailLog}
						onChange={(e) => setEmailLog(e.target.value)}
						className="border-2 border-gray-950 px-4 py-2 mt-1 w-full rounded-md"
					/>
				</div>

				<div className="my-4">
					<lable className="text-xl mr-4 text-black">Password</lable>
					<input 
						type="password" 
						value={passwordLog}
						onChange={(e) => setPasswordLog(e.target.value)}
						className="border-2 border-gray-950 px-4 py-2 mt-1 w-full rounded-md"
					/>
				</div>

				<button className='bg-green-500 hover:bg-green-400 text-white font-bold py-4 px-8 border-b-4 border-green-700 hover:border-green-500 rounded  m-9' onClick={handleSignIn}>
					Sign In
				</button>

				<div className="relative flex py-5 items-center">
					<div className="flex-grow border-t border-gray-400"></div>
					<span className="flex-shrink mx-4 text-gray-400">Or</span>
					<div className="flex-grow border-t border-gray-400"></div>
				</div>

				{errorReg && 
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
					<strong className="font-bold">{errorReg}</strong>
				</div>
				}

				<div className="my-4">
					<lable className="text-xl mr-4 text-black">Username</lable>
					<input 
						type="text" 
						value={usernameReg}
						onChange={(e) => setUsernameReg(e.target.value)}
						className="border-2 border-gray-950 px-4 py-2 mt-1 w-full rounded-md"
					/>
				</div>

				<div className="my-4">
					<lable className="text-xl mr-4 text-black">Email</lable>
					<input 
						type="text" 
						value={emailReg}
						onChange={(e) => setEmailReg(e.target.value)}
						className="border-2 border-gray-950 px-4 py-2 mt-1 w-full rounded-md"
					/>
				</div>

				<div className="my-4">
					<lable className="text-xl mr-4 text-black">Password</lable>
					<input 
						type="password" 
						value={passwordReg}
						onChange={(e) => setPasswordReg(e.target.value)}
						className="border-2 border-gray-950 px-4 py-2 mt-1 w-full rounded-md"
					/>
				</div>

				<div className="my-4">
					<lable className="text-xl mr-4 text-black">Confirm Password</lable>
					<input 
						type="password" 
						value={passwordRegConfirm}
						onChange={(e) => setPasswordRegConfirm(e.target.value)}
						className="border-2 border-gray-950 px-4 py-2 mt-1 w-full rounded-md"
					/>
				</div>

				<button className='bg-green-500 hover:bg-green-400 text-white font-bold py-4 px-8 border-b-4 border-green-700 hover:border-green-500 rounded  m-9' onClick={handleRegistration}>
					Register
				</button>
			</div>

		</div>
	)
}

export default SignIn
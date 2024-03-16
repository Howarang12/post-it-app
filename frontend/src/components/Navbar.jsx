import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
	const { dispatch, user } = useAuthContext()
	const navigate = useNavigate()
	
	const handleLogout = () => {
		// remove user from local storage
		localStorage.removeItem('user')
		// dispatch logout action
		dispatch({type: 'LOGOUT'})
		navigate('/signin')
	}

	return (
		<nav className='p-5 bg-white shadow md:flex md:items-center md:justify-between'>
			<Link to='/' className='text-xl hover:text-blue-500 duration-500'>
				<span className='text-2xl font-bold'>PostIt</span>
			</Link>
			<div>
				<ul className='md:flex md:items-center z-[-1] md:z-auto md:static absolute w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500'>
					<li className='mx-4 my-6 md:my-0'>
						<Link to='/' className='text-xl hover:text-blue-500 duration-500'>
							Home
						</Link>
					</li>

					<li className='mx-4 my-6 md:my-0'>
						<Link to='/about' className='text-xl hover:text-blue-500 duration-500'>
							About
						</Link>
					</li>

					{ user && 
					<li className='mx-4 my-6 md:my-0'>
						<Link to='/profile' className='text-xl hover:text-blue-500 duration-500'>
							{user.username}
						</Link>
					</li>
					}
					
					{ !user ? 
						<Link to='/signin' className='bg-blue-500 hover:bg-blue-400 text-white py-2 px-3 border-b-4 border-blue-700 hover:border-blue-500 rounded w-1/2 mx-4 my-6 md:my-0'>
							<li className='text-xl'>
									Sign In
							</li>
						</Link> : 

						<button className='bg-blue-500 hover:bg-blue-400 text-white py-2 px-3 border-b-4 border-blue-700 hover:border-blue-500 rounded w-1/2 mx-4 my-6 md:my-0 text-xl' onClick={handleLogout}>Logout</button>
					}
				</ul>
			</div>

		</nav>
	)
}

export default Navbar
import React from 'react'

const Header = ({ setAddTodo, addTodo }) => {
	const onclick = () => setAddTodo(!addTodo)
	return (
		<div className='header w-full'>
			<div className='logo'>Algobulls Todo</div>
			<button className='btn' onClick={onclick}>
				Add Todo
			</button>
		</div>
	)
}

export default Header

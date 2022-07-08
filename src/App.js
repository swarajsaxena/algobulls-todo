import './App.scss'
import 'antd/dist/antd.css'
import Header from './Header'
import AddTodo from './AddTodo'
import { useEffect, useState } from 'react'
import Main from './Main'
import { uid } from 'uid'

function App() {
	const [addTodo, setAddTodo] = useState(false)
	const [todoList, setTodoList] = useState([
		{
			title: 'Make Tiffin',
			description: 'It should contain parantha and mango shake.',
			due_date: '2022-07-30',
			tag: ['Kitchen', 'Home'],
			status: 'Open',
			key: uid(),
			timestamp: new Date().toUTCString(),
		},
		{
			title: 'Get Vegies',
			description: 'From the market.',
			due_date: '2022-07-16',
			tag: ['Market', 'Out'],
			status: 'Done',
			key: uid(),
			timestamp: new Date().toUTCString(),
		},
		{
			title: 'Repair the bike',
			description: 'Tools are in the garage.',
			due_date: '2022-07-22',
			tag: ['Home'],
			status: 'Open',
			key: uid(),
			timestamp: new Date().toUTCString(),
		},
		{
			title: 'Do this project',
			description: 'Colab with rahul and priya',
			due_date: '2022-07-20',
			tag: ['Office', 'Work'],
			status: 'Open',
			key: uid(),
			timestamp: new Date().toUTCString(),
		},
	])

	useEffect(() => {
		console.log(todoList)
	}, [todoList])

	return (
		<div className='App'>
			{addTodo ? (
				<AddTodo
					setTodoList={setTodoList}
					todoList={todoList}
					setAddTodo={setAddTodo}
					addTodo={addTodo}
				/>
			) : (
				<></>
			)}
			<Header setAddTodo={setAddTodo} addTodo={addTodo} />
			<Main setTodoList={setTodoList} todoList={todoList} />
		</div>
	)
}

export default App

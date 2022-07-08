import { Button, Input, Space, Table } from 'antd'
import React, { useEffect, useRef } from 'react'
import { uid } from 'uid'
import { MdDelete, MdEdit } from 'react-icons/md'
import { FiSearch } from 'react-icons/fi'
import { useState } from 'react'
import UpdateTodoForm from './UpdateTodoForm'

const Main = ({ todoList, setTodoList }) => {
	const [dataSource, setDataSource] = useState(todoList)
	const [searchText1, setSearchText1] = useState('')
	const [updateTodoDetails, setUpdateTodoDetails] = useState(null)

	// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	const [searchText, setSearchText] = useState('')
	const [searchedColumn, setSearchedColumn] = useState('')
	const searchInput = useRef(null)

	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm()
		setSearchText1(selectedKeys[0])
		setSearchedColumn(dataIndex)
	}

	const handleReset = (clearFilters) => {
		clearFilters()
		setSearchText1('')
	}

	const getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
		}) => (
			<div
				style={{
					padding: 8,
				}}>
				<Input
					ref={searchInput}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
					style={{
						marginBottom: 8,
						display: 'block',
					}}
				/>
				<Space>
					<Button
						type='primary'
						onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
						// icon={<FiSearch />}
						size='small'
						style={{
							width: 90,
						}}>
						Search
					</Button>
					<Button
						onClick={() => clearFilters && handleReset(clearFilters)}
						size='small'
						style={{
							width: 90,
						}}>
						Reset
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered) => (
			<FiSearch
				style={{
					color: filtered ? '#1890ff' : undefined,
				}}
			/>
		),
		onFilter: (value, record) =>
			record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
		onFilterDropdownVisibleChange: (visible) => {
			if (visible) {
				setTimeout(() => searchInput.current?.select(), 100)
			}
		},
		render: (text) => (searchedColumn === dataIndex ? <></> : text),
	})

	// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	useEffect(() => {
		setDataSource(todoList)
	}, [todoList])

	const deleteTodo = (key) => {
		const newDatasource = todoList.filter((el) => el.key !== key)
		console.log(newDatasource)

		setTodoList(newDatasource)
	}

	const updateFunction = (key) => {
		const todoToBeUpdated = dataSource.find((element) => element.key === key)
		setUpdateTodoDetails(todoToBeUpdated)
	}

	const columns = [
		{
			title: 'Timestamp',
			dataIndex: 'timestamp',
			sorter: (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
		},
		{
			title: 'Title',
			dataIndex: 'title',
			render: (_) => <div className='font-semibold'>{_}</div>,
			sorter: (a, b) => a.title.localeCompare(b.title),
		},

		{
			title: 'Description',
			dataIndex: 'description',
			sorter: (a, b) => a.description.localeCompare(b.description),
		},
		{
			title: 'Due Date',
			dataIndex: 'due_date',
			sorter: (a, b) => new Date(b.due_date) - new Date(a.due_date),
			render: (due_date) =>
				due_date ? (
					<div className='tag flex items-center bg-black rounded-md text-white p-2 py-1 cursor-default w-max'>
						{due_date}
					</div>
				) : (
					<div className='tag flex items-center bg-black/10 rounded-md text-black p-2 py-1 cursor-default w-max'>
						--
					</div>
				),
		},
		{
			title: 'Tags',
			dataIndex: 'tag',
			render: (data) => {
				return (
					<ul className='flex items-center gap-2 flex-wrap'>
						{data ? (
							data.map((tag, index) => (
								<li
									key={index}
									className='tag flex items-center bg-black rounded-md text-white p-2 py-1 cursor-default'>
									<span className='tag-title capitalize'>{tag}</span>
								</li>
							))
						) : (
							<li className='tag flex items-center bg-black/10 rounded-md text-black p-2 py-1 cursor-default'>
								<span className='tag-title capitalize'>No Tags</span>
							</li>
						)}
					</ul>
				)
			},
			// ...getColumnSearchProps('tag'),
		},
		{
			title: 'Status',
			dataIndex: 'status',
			filters: [
				{ text: 'Open', value: 'Open' },
				{ text: 'Done', value: 'Done' },
				{ text: 'Working', value: 'Working' },
				{ text: 'Overdue', value: 'Overdue' },
			],
			onFilter: (value, record) => {
				return record.status === value
			},
		},

		{
			title: 'Options',
			dataIndex: 'key',
			render: (key) => {
				return (
					<div className='flex gap-2'>
						<div
							title='Delete'
							onClick={() => deleteTodo(key)}
							className='cursor-pointer border w-max p-2 bg-black/10 hover:bg-black/30 rounded-full'>
							<MdDelete size={15} />
						</div>
						<div
							title='Edit'
							onClick={() => {
								updateFunction(key)
							}}
							className='cursor-pointer border w-max p-2 bg-black/10 hover:bg-black/30 rounded-full'>
							<MdEdit size={15} />
						</div>
					</div>
				)
			},
		},
	]
	return (
		<main className='w-full flex flex-col items-center'>
			{updateTodoDetails ? (
				<UpdateTodoForm
					setTodoList={setTodoList}
					todoList={todoList}
					setUpdateTodoDetails={setUpdateTodoDetails}
					updateTodoDetails={updateTodoDetails}
				/>
			) : (
				<></>
			)}
			<div className='max-w-[1440px] w-full p-4 flex flex-col gap-8'>
				<Input
					onChange={(e) => {
						setSearchText1(e.target.value)
					}}
					color='#f9503d'
					placeholder='Search'
					addonBefore='Search'
					style={{ borderRadius: '0.25rem', padding: '0 1rem' }}
				/>
				<div className='overflow-scroll overflow-y-hidden'>
					<Table
						pagination={{ position: ['bottomCenter'] }}
						dataSource={dataSource.filter((todo) => {
							if (searchText1 === '') {
								return todo
							} else if (todo.title.includes(searchText1)) {
								return todo
							}
						})}
						columns={columns}
					/>
				</div>
			</div>
		</main>
	)
}

export default Main

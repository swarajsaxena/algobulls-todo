import { Input, Select, DatePicker, Space } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { Option } from 'antd/lib/mentions'
import React from 'react'
import TagsInput from './TagsInput'
import { GoPlusSmall } from 'react-icons/go'
import { useState } from 'react'
import { uid } from 'uid'
import { useEffect } from 'react'
import moment from 'moment'

// const { RangePicker } = DatePicker

const UpdateTodoForm = ({
	setUpdateTodoDetails,
	updateTodoDetails,
	todoList,
	setTodoList,
}) => {
	const [formValidity, setFormValidity] = useState(true)

	const [title, setTitle] = useState(updateTodoDetails.title)
	const [desc, setdesc] = useState(updateTodoDetails.description)
	const [date, setdate] = useState(updateTodoDetails.due_date)
	const [tags, settags] = useState(updateTodoDetails.tag)
	const [status, setstatus] = useState(updateTodoDetails.status)

	const [titleError, settitleError] = useState('')
	const [descError, setdescError] = useState('')
	const [dateError, setdateError] = useState('')

	// const newDate = () => {
	// 	return (
	// 		new Date().getFullYear() +
	// 		'-' +
	// 		(new Date().getMonth() < 10
	// 			? '0' + (new Date().getMonth() + 1)
	// 			: new Date().getMonth()) +
	// 		'-' +
	// 		(new Date().getDate() < 10
	// 			? '0' + new Date().getDate()
	// 			: new Date().getDate())
	// 	)
	// }

	const onclick = () => {
		setUpdateTodoDetails(null)
	}

	const onSubmit = () => {
		// const uuid = uid()
		if (formValidity) {
			const index = todoList.findIndex(
				(element) => element.key === updateTodoDetails.key
			)

			todoList[index].title = title
			todoList[index].due_date = date
			todoList[index].tag = tags
			todoList[index].status = status
			todoList[index].description = desc

			setTodoList(
				todoList.map((todo) => {
					if (todo.key === updateTodoDetails.key) {
						return {
							...todo,
							title: title,
							due_date: date,
							tag: tags,
							status: status,
							description: desc,
						}
					}

					return todo
				})
			)

			onclick()
		}
	}

	const dateFormat = 'YYYY-MM-DD'

	return (
		<div className='updateForm absolute top-0 left-0 min-h-screen grid z-50 min-w-full bg-black/50 place-items-center'>
			<div className='m-2 modal shadow-2xl bg-white p-4 rounded flex items-start flex-col gap-4'>
				<div className='font-bold text-2xl flex justify-between w-full items-center'>
					<div>Update Todo</div>
					<GoPlusSmall
						className='rotate-45 cursor-pointer'
						size={30}
						onClick={onclick}
					/>
				</div>
				<div className='flex items-start flex-col gap-2'>
					<div className='font-semibold'>Title</div>
					<Input
						value={title}
						onChange={(e) => {
							if (e.target.value.length > 100 || e.target.value.length === 0) {
								setFormValidity(false)
								settitleError(
									'Title should not be over 100 chars or less than 1 char'
								)
							} else {
								settitleError('')
								setFormValidity(true)
							}

							setTitle(e.target.value)
						}}
						max={100}
						placeholder='Title'
						style={{ width: '400px', borderRadius: '0.25rem' }}
					/>
					<div className='text-[#f9503d]'>{titleError}</div>
				</div>
				<div className='flex items-start flex-col gap-2'>
					<div className='font-semibold'>Discription</div>
					<TextArea
						value={desc}
						onChange={(e) => {
							if (e.target.value.length > 100 || e.target.value.length === 0) {
								setFormValidity(false)
								setdescError(
									'Description should not be over 100 chars or less than 1 char'
								)
							} else {
								setdescError('')
								setFormValidity(true)
							}
							setdesc(e.target.value)
						}}
						rows={4}
						placeholder='Discription'
						style={{ width: '400px', borderRadius: '0.25rem' }}
					/>
					<div className='text-[#f9503d] max-w-[400px] text-left'>
						{descError}
					</div>
				</div>
				<div className='flex items-start flex-col gap-2'>
					<div className='font-semibold'>Due Date</div>
					<DatePicker
						defaultValue={moment(date, dateFormat)}
						format={dateFormat}
						onChange={(date, dateString) => {
							if (new Date(dateString) < new Date()) {
								setdateError('Due date cannot be behind the current date.')
								setFormValidity(false)
							} else {
								setdateError('')
								setFormValidity(true)
							}
							setdate(dateString)
						}}
						style={{ width: '400px', borderRadius: '0.25rem' }}
						renderExtraFooter={() => 'extra footer'}
					/>
					<div className='text-[#f9503d]'>{dateError}</div>
				</div>
				<div className='flex items-start flex-col gap-2'>
					<div className='font-semibold'>Tags</div>
					<TagsInput
						selectedTags={(tags) => {
							settags(tags)
						}}
						tags={tags}
						// value={updateTodoDetails.title}
					/>
				</div>
				<div className='flex items-start flex-col gap-2'>
					<div className='font-semibold'>Status</div>
					<Select
						onChange={(value) => setstatus(value)}
						value={status}
						defaultValue='Open'
						style={{
							width: '400px',
							borderRadius: '0.25rem',
							textAlign: 'left',
						}}
						className='w-full'>
						<Select.Option value='Open'>Open</Select.Option>
						<Select.Option value='Working'>Working</Select.Option>
						<Select.Option value='Done'>Done</Select.Option>
						<Select.Option value='Overdue'>Overdue</Select.Option>
					</Select>
				</div>
				<div
					className={`${
						!formValidity
							? 'bg-black/50 cursor-not-allowed pointer-events-none'
							: 'bg-black/90 cursor-pointer'
					}  w-full py-2 hover:bg-black text-white rounded `}
					onClick={onSubmit}>
					{!formValidity ? 'Disabled' : 'Submit'}
				</div>
			</div>
		</div>
	)
}

export default UpdateTodoForm

import React from 'react'
import { GoPlusSmall } from 'react-icons/go'

const TagsInput = (props) => {
	const [tags, setTags] = React.useState(props.tags)
	const removeTags = (indexToRemove) => {
		setTags([...tags.filter((_, index) => index !== indexToRemove)])
	}
	const addTags = (event) => {
		if (event.target.value !== '') {
			if (!tags.includes(event.target.value)) {
				setTags([...tags, event.target.value])
				props.selectedTags([...tags, event.target.value])
			}
			event.target.value = ''
		}
	}
	return (
		<div className='tags-input border-[#d9d9d9] border rounded w-[300px] flex items-start flex-col p-2'>
			<ul id='tags' className='flex items-center gap-2 flex-wrap m-0'>
				{tags.map((tag, index) => (
					<li
						key={index}
						className='tag flex items-center bg-black rounded-md text-white pl-2 pr-1 py-1'>
						<span className='tag-title capitalize'>{tag}</span>

						<GoPlusSmall
							size={'20px'}
							className='tag-close-icon cursor-pointer  rotate-45'
							onClick={() => removeTags(index)}
						/>
					</li>
				))}
				<input
					className='border-none outline-none'
					type='text'
					onKeyUp={(event) =>
						event.key === 'Enter' || event.key === 'Space'
							? addTags(event)
							: null
					}
					placeholder='Press enter to add tags'
				/>
			</ul>
		</div>
	)
}

export default TagsInput

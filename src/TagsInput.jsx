import React from 'react'
import { GoPlusSmall } from 'react-icons/go'
import { BiChevronRight } from 'react-icons/bi'
import { useState } from 'react'

const TagsInput = (props) => {
	const [tags, setTags] = React.useState(props.tags)
	const [tagText, setTagText] = useState('')
	const removeTags = (indexToRemove) => {
		setTags([...tags.filter((_, index) => index !== indexToRemove)])
	}
	const addTags = (value) => {
		if (value !== '') {
			if (!tags.includes(value)) {
				setTags([...tags, value])
				props.selectedTags([...tags, value])
			}
			setTagText('')
		}
	}
	return (
		<div className='tags-input rounded w-[300px] flex items-start flex-col  gap-2'>
			<ul
				id='tags'
				className='flex items-start gap-2 flex-wrap m-0 p-2 rounded border border-[#d9d9d9] w-full min-h-[48px]'>
				{tags &&
					tags.map((tag, index) => (
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
			</ul>
			<div className='flex w-full items-center rounded border border-[#d9d9d9] p-2'>
				<input
					className='border-none outline-none w-full'
					type='text'
					value={tagText}
					onChange={(event) => setTagText(event.target.value)}
					placeholder='Press enter to add tags'
				/>
				<div
					className='p2 bg-black rounded-full'
					onClick={() => addTags(tagText)}>
					<BiChevronRight color='white' size={18} />
				</div>
			</div>
		</div>
	)
}

export default TagsInput

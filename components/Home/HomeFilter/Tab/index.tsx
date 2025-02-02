import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

import { Section } from '@/models/section';

interface TabProps {
	name: Section
	section: Section
	isOpen: boolean
	handleClick: (value: Section) => void
	label: string
}

const Tab: FC<TabProps> = ({ name, section, handleClick, label }) => {
	const buttonClassNames = twMerge(
		'text-sm md:text-base xl:text-xl uppercase font-bold md:mr-1.5 xl:mr-2.5 px-4 py-2 w-full md:w-52 relative border-b-4 text-white',
		section === name && 'md:pointer-events-none text-teal-300 border-teal-300'
	);

	return (
		<div className='w-full md:w-auto mt-2.5 md:mt-0'>
			<button onClick={ () => handleClick(name) } className={ buttonClassNames }>
				{ label }
			</button>
		</div>
	);
};

export default Tab;

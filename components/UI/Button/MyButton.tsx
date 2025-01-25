'use client';
import { FC } from 'react';
import { Button, ButtonProps } from '@heroui/react';
import { twMerge } from 'tailwind-merge';

const MyButton: FC<ButtonProps> = ({ children, color='primary', className='', ...arg }) => {
	return (
		<Button
			{ ...arg }
			color={ color }
			radius='none' size='lg'
			className={ twMerge('text-black font-bold hover:bg-teal-400', className) }
		>
			{ children }
		</Button>
	)
};

export default MyButton;

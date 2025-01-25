'use client';
import { FC } from 'react';
import { Button, ButtonProps } from '@heroui/react';
import { twMerge } from 'tailwind-merge';

const MyButton: FC<ButtonProps> = ({ children, color='primary', className='', onPress }) => {
	return (
		<Button
			onPress={ onPress }
			color={ color }
			radius='none' size='lg'
			className={ twMerge('text-black font-bold hover:bg-teal-400', className) }
		>
			{ children }
		</Button>
	)
};

export default MyButton;

import { FC } from 'react';

interface BadgeProps {
	value: number
	className?: string
}

const Badge: FC<BadgeProps> = ({ value, className='left-3.5' }) => {
	const styles = `-top-2.5 absolute ${className}`;

	return (
		<div className={styles}>
			<p className='flex h-5 w-5 p-2 items-center justify-center rounded-full text-[11px] border-2 border-black font-bold text-black bg-teal-300'>
				{ value }
			</p>
		</div>
	)
};

export default Badge;

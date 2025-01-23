import { twMerge } from 'tailwind-merge';

const images = ['1', '2'];

const ImagesBlock = () => {
	return (
		<div className={ twMerge('gallery relative mb-7 pt-10 pb-5 w-64', images.length <= 1 && 'w-72') }>
			<div className='-mt-10 mb-2 w-full flex justify-between items-start'>

			</div>
		</div>
	)
}

export default ImagesBlock;

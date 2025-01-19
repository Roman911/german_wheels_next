import { FC } from 'react';

interface TitleProps {
	isMain?: boolean
	title: string
	className?: string
}

const Title: FC<TitleProps> = ({ isMain, title, className='my-5 text-3xl md:text-4xl font-bold px-3 md:px-0' }) => {
	if(isMain) return <h1 className={ className }>{ title }</h1>

	return <h2 className={ className }>{ title }</h2>
};

export default Title;

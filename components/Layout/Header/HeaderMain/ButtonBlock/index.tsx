import { Link } from '@/i18n/routing';
import { Badge } from '@heroui/react';
import { useAppSelector } from '@/hooks/redux';
import * as Icons from '@/components/Lib/Icons';

const ButtonBlock = () => {
	const { comparisonItems } = useAppSelector(state => state.comparisonReducer);
	const { bookmarksItems } = useAppSelector(state => state.bookmarksReducer);
	const { cartItems } = useAppSelector(state => state.cartReducer);

	return (
		<>
			<Link href='/comparison' className='relative'>
				<Badge
					color='primary'
					content={ comparisonItems.length }
					isInvisible={ comparisonItems.length === 0 }
					className='text-black  border-zinc-800'
				>
					<Icons.LibraIcon className='fill-white'/>
				</Badge>
			</Link>
			<Link href='/bookmarks' className='relative'>
				<Badge
					color='primary'
					content={ bookmarksItems.length }
					isInvisible={ bookmarksItems.length === 0 }
					className='text-black  border-zinc-800'
				>
					<Icons.HeartIcon className='stroke-white'/>
				</Badge>
			</Link>
			<Link href='/cart' className='relative'>
				<Badge
					color='primary'
					content={ cartItems.length }
					isInvisible={ cartItems.length === 0 }
					className='text-black  border-zinc-800'
				>
					<Icons.CartIcon className='stroke-white'/>
				</Badge>
			</Link>
		</>
	)
};

export default ButtonBlock;

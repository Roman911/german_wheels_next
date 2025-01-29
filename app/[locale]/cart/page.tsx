'use client'
import { addToStorage, getFromStorage, removeFromStorage } from '@/lib/localeStorage';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useAppGetProducts } from '@/hooks/getProducts';
import { removeCart, setQuantity } from '@/store/slices/cartSlice';
import Layout from '@/components/Layout';
import Breadcrumbs from '@/components/UI/Breadcrumbs';
import NoResult from '@/components/Lib/NoResult';
import Spinner from '@/components/Lib/Spinner';
import Title from '@/components/Lib/Title';
import CartComponent from '@/components/Cart';

export default function Cart() {
	const dispatch = useAppDispatch();
	const { cartItems } = useAppSelector(state => state.cartReducer);
	const path = [{ title: 'cart', href: '/', translations: true }];
	const { tires, cargo, disks, battery, isLoading} = useAppGetProducts(cartItems, 'reducerCart', true);
	const data = {
		result: true,
		data: {
			total_count: 5,
			products: [...tires,...cargo,...disks,...battery]
		}
	};

	const removeProduct = (id: number) => {
		removeFromStorage('reducerCart', id);
		dispatch(removeCart(id));
	};

	const onSetQuantity = (id: number, quantity: number) => {
		const storage = getFromStorage('reducerCart');
		const item = storage.find((i: { id: number, section: string, quantity: number }) => i.id === id);
		addToStorage('reducerCart', [...storage.filter((i: { id: number }) => i.id !== id), { ...item, quantity }]);
		dispatch(setQuantity({ ...item, quantity }));
	}

	return <Layout>
		<Breadcrumbs path={ path } />
		<Title title='cart' />
		<Spinner height='h-40' show={ isLoading }>
			{ cartItems.length > 0 && data?.result ? <CartComponent
					data={ data }
					cartItems={ cartItems }
					removeProduct={ removeProduct }
					setQuantity={ onSetQuantity }
				/> :
				<NoResult noResultText='no product to cart' /> }
		</Spinner>
	</Layout>
};

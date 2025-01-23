import ImagesBlock from './ImagesBlock';


const ProductComponent = () => {
  return (
		<section className='product-page flex flex-col lg:flex-row justify-between gap-1 xl:gap-x-6 mt-4 md:mt-6'>
			<div className='max-w-[900px] flex-1 pr-3 xl:pr-5'>
				<div className='flex flex-col md:flex-row items-center md:items-start md:border-b border-gray-200'>
					<ImagesBlock />
				</div>
			</div>
		</section>
	)
};

export default ProductComponent;

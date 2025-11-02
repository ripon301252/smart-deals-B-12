import React, { use } from 'react';
import ProductsCard from './ProductsCard';

const Products = ({ allProductsPromise }) => {
    const products = use(allProductsPromise)
    return (
        <div>
            <h1 className='text-center text-3xl font-bold'>All Products</h1>
            <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2'>
            {
                products.map(product => <ProductsCard key={product._id} product={product}></ProductsCard>)
            }
            </div>
        </div>
    );
};

export default Products;
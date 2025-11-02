import React from 'react';
import Products from './Products';


const allProductsPromise = fetch('http://localhost:3000/allProducts').then(res => res.json());

const AllProducts = () => {
    return (
        <div>
            <Products allProductsPromise={allProductsPromise}></Products>
        </div>
    );
};

export default AllProducts;
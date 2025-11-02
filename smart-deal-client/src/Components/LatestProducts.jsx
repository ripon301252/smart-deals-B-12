import React, { use } from "react";
import ProductCard from "./ProductCard";

const LatestProducts = ({ latestProductsPromise }) => {
  const products = use(latestProductsPromise);
  console.log(products);
  return (
    <div>
        <h2 className="text-3xl text-center font-bold">Recent <span className="text-[#8755ea]">Product</span> </h2> 
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
        {products.map((product) => (
          <ProductCard key={product._id} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;

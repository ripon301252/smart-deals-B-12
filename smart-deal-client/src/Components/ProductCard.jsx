import React from "react";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  const { title, image, price_min, price_max, _id } = product;
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure className="px-10 pt-10">
          <img
            src={image}
            alt="Shoes"
            className="w-68 h-68 rounded-xl"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{title}</h2>
          <p>
           $ {price_max}
          </p>
          <p>
           $ {price_min}
          </p>
          <div className="card-actions">
            <Link to={`/productDetails/${_id}`} className="btn btn-primary">View Details</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

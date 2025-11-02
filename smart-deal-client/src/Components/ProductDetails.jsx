import React, { useContext, useRef } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const ProductDetails = () => {
  const {_id} = useLoaderData();
  const bidModalRef = useRef(null);
  const { user } = useContext(AuthContext);
  console.log(user)
//   const { category, description, price_max, price_min, seller_contact, title } =
//     product;

  const handleBidModalOpen = () => {
    bidModalRef.current.showModal();
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const bid = e.target.bid.value;
    console.log(_id, name, email, bid)
  };

  return (
    <div>
      {/* product info */}
      <div></div>
      <div>
        <button onClick={handleBidModalOpen} className="btn btn-primary">
          {" "}
          I want to Buy this Product
        </button>

        {/* Modal */}
        <dialog
          ref={bidModalRef}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">Give the best offer!</h3>
            <p className="py-4">Offer something seller can not resist</p>
            <form onSubmit={handleBidSubmit}>
              <div className="card-body">
                <fieldset className="fieldset">
                  <label className="label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="input"
                    readOnly
                    defaultValue={user.displayName}
                  />

                  {/* email */}
                  <label className="label">Email</label>
                  <input
                    type="email"
                    name="email"
                    readOnly
                    className="input"
                    defaultValue={user.email}
                  />
                  
                  {/* bid amount */}
                  <label className="label">Bid</label>
                  <input
                    type="text"
                    name="bid"
                    className="input"
                    placeholder="Your bid"
                  />

                  <button className="btn btn-neutral mt-4">Please your bid</button>
                </fieldset>
              </div>
            </form>

            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      {/* bids for this product */}
    </div>
  );
};

export default ProductDetails;

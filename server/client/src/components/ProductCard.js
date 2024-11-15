import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa"; // Import FaHeart
import displayINRCurrency from "../helpers/displayCurrency";
import { IoMdHeartEmpty } from "react-icons/io";
import Context from "../context";
import SummaryApi from "../common";

const ProductCard = ({ product, handleAddToCart, wishlistHandler }) => {
  const { wishlist, fetchWishListData } = useContext(Context);
  console.log("wishlist******", wishlist);
  const discountPercentage = (
    ((product.price - product.sellingPrice) / product.price) *
    100
  ).toFixed(0);
  const amountSaved = product.price - product.sellingPrice;

  const toggleWishlist = (e) => {
    e.stopPropagation(); // Prevent triggering the link's onClick
  };
 

  const deleteWishlistProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteWishlist.url, {
      method: SummaryApi.deleteWishlist.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchWishListData();
    }
  };
  const wishlistItem = wishlist?.find(item => item.productId?._id === product?._id);
  
  return (
    <div className="w-full min-w-[230px] md:min-w-[220px] max-w-[230px] md:max-w-[220px] h-[310px] bg-white rounded-md shadow-lg overflow-hidden relative hover:scale-105 transition-transform rounded hover:border hover:border-[#AA0000] border border-[#EDEDED]">
      <Link to={"/product/" + product?._id}>
        {/* Discount Label */}
        <div className="absolute right-0 top-0 bg-green-600 text-white text-[8px] font-bold p-1 rounded-md h-[35px] w-[40px]">
          {discountPercentage}%<br />
          <span>OFF</span>
        </div>

        {/* Product Image */}
        <div className="bg-slate-200 h-[180px] ">
          <img
            src={product?.productImage[0]}
            className="object-cover h-full w-full"
            alt={product?.productName}
          />
        </div>

        {/* Product Details */}
        <div className="p-4">
          <h2 className="font-semibold text-base md:text-lg text-ellipsis line-clamp-1 text-black">
            {product?.productName}
          </h2>

          <div className="flex justify-between items-center mt-2">
            <div className="flex gap-2">
              <p className="text-red-600 font-semibold">
                {displayINRCurrency(product?.sellingPrice)}
              </p>
              <p className="text-slate-500 line-through">
                {displayINRCurrency(product?.price)}
              </p>
            </div>

            {/* Add to Cart */}
            <FaShoppingCart
              onClick={(e) => handleAddToCart(e, product?._id)}
              className="cursor-pointer" // Add cursor pointer for better UX
            />
          </div>

          <div>
            <hr />
          </div>

          {/* Discount Savings */}
          <p className="text-sm font-bold text-green-600 mt-2">
            Save - {displayINRCurrency(amountSaved)}
          </p>
        </div>
      </Link>

      {/* Heart Icon for Wishlist */}
      <div
        className="absolute right-2 top-10 rounded-full bg-white p-1 cursor-pointer"
        onClick={toggleWishlist}>
        {wishlistItem ? (
          <FaHeart
            style={{ color: "red" }}
            onClick={() => deleteWishlistProduct(wishlistItem?._id)}
          /> // Filled heart icon
        ) : (
          <IoMdHeartEmpty
            style={{ color: "gray" }}
            onClick={(e) => wishlistHandler(e, product?._id)}
          /> // Empty heart icon
        )}
      </div>
    </div>
  );
};

export default ProductCard;

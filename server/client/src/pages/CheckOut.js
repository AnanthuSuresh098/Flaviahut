
import React, { useState, useEffect, useContext } from "react";
import SummaryApi from "../common"; // Assuming your API setup is here
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AddressList from "../components/AddressList";
import CartItem from "../components/CartItem";
import Context from "../context";

const Checkout = () => {
  const userId = "6714a8625d3db3911b547edf";
  const [data, setData] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const navigate = useNavigate();
  console.log("selectedAddress",selectedAddress)
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility
  const { fetchCartData,} = useContext(Context);

  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();

    if (responseData.success) {
      setData(responseData.data);
      // Assuming data contains an array of cart items
      setCartItems(responseData.data); // Modify as per your actual data structure

    }
  };

  
console.log("cartItems",cartItems)
const deleteAllProducts = async () => {
  await fetch(SummaryApi.deleteCartProduct.url, {
    method: SummaryApi.deleteCartProduct.method,
    headers: { "content-type": "application/json" },
    credentials: "include",
  });
};

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (selectedAddress) {

      const orderData = {
        userId,
        cartItems: cartItems?.map(item => ({
          productId: item.productId._id,
          quantity: item.quantity,
          price: item.productId.price,
          sellingPrice:item.productId.sellingPrice,
          category:item.productId.category,
          productName:item.productId.productName

        })),
        addressInfo: {
          address: selectedAddress.address,
          city: selectedAddress.city,
          pincode: selectedAddress.pincode,
          phone: selectedAddress.phone,
          notes: selectedAddress.notes,
          email: selectedAddress.email,
        },
        orderStatus: "Pending",
        totalAmount: cartItems.reduce((total, item) => total + item.quantity * item.productId.price, 0), // Calculate total amount
        orderDate: new Date().toISOString(),
        orderUpdateDate: new Date().toISOString(),
      };
      const dataResponse = await fetch(SummaryApi.createOrder.url, {
        method: SummaryApi.createOrder.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        setIsModalOpen(true);
      }

      if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } else {
      toast.error("Please select an address before proceeding to checkout.");
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
    deleteAllProducts()
    navigate("/");
    fetchCartData()
  }
  return (
    <div className="container mx-auto p-4">
    <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
      {/* Billing Information Section */}
      <div className="w-full lg:w-2/3">
        <h2 className="text-xl lg:text-2xl font-bold text-red-700 mb-4 lg:mb-6">Billing Information</h2>
        <AddressList userId={userId} selectedAddress={selectedAddress} onSelectAddress={setSelectedAddress} />
      </div>

      {/* Order Summary Section */}
      <div className="w-full lg:w-1/3 bg-gray-50 p-4 lg:p-6 rounded-lg shadow-lg">
        <h2 className="text-lg lg:text-xl font-bold text-red-700 mb-4">Order Summary</h2>
        <CartItem data={cartItems} setData={setData} fetchData={fetchData} />
        <div className="flex justify-center items-center">
          <button
            onClick={handleCheckout}
            className="bg-[#AA0000] hover:bg-red-700 text-white w-full lg:w-[70%] py-2 mt-4 rounded-full"
          >
            Place order
          </button>
        </div>
      </div>
    </div>

    {isModalOpen && (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center items-center">
          <h2 className="text-xl font-bold text-green-700 mb-4">Order Placed Successfully!</h2>
          <p>Your order has been placed successfully. Thank you for shopping with us!</p>
          <button
            onClick={handleModalClose}
            className="bg-green-700 text-white px-4 py-2 rounded mt-4"
          >
            Close
          </button>
        </div>
      </div>
    )}
  </div>
  );
};

export default Checkout;
// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import SummaryApi from "../common";
// import AddressForm from "./AddressForm";

// const AddressList = ({ userId }) => {
//   const [addresses, setAddresses] = useState([]);
//   const [editAddress, setEditAddress] = useState(null);

//   useEffect(() => {
//     fetchAddresses();
//   }, []);

//   const fetchAddresses = async () => {
//     try {
//       const response = await fetch(SummaryApi.fetchAddress.url.replace(":userId", userId), {
//         method: SummaryApi.fetchAddress.method,
//         credentials: "include",
//       });

//       const result = await response.json();

//       if (result.success) {
//         setAddresses(result.data);
//       } else {
//         toast.error(result.message || "Failed to load addresses");
//       }
//     } catch (error) {
//       toast.error("Failed to load addresses.");
//     }
//   };

//   const handleDelete = async (addressId) => {
//     try {
//       const url = SummaryApi.deleteAddress.url
//         .replace(":userId", userId)
//         .replace(":addressId", addressId);

//       const response = await fetch(url, {
//         method: SummaryApi.deleteAddress.method,
//         credentials: "include",
//       });

//       const result = await response.json();

//       if (result.success) {
//         toast.success("Address deleted successfully");
//         fetchAddresses();
//       } else {
//         toast.error(result.message || "Failed to delete address");
//       }
//     } catch (error) {
//       toast.error("Failed to delete address.");
//     }
//   };

//   return (
//     <div>

//       {editAddress ? (
//         <AddressForm userId={userId} currentAddress={editAddress} onSave={() => {
//           setEditAddress(null);
//           fetchAddresses();
//         }} />
//       ) : (
//         <AddressForm userId={userId} onSave={fetchAddresses} />
//       )}

//       <div className="mt-6">
//         {addresses.map((address) => (
//           <div key={address._id} className="border p-4 mb-4 rounded-lg shadow-md">
//             <div>
//               <p>{address.address}, {address.city} - {address.pincode}</p>
//               <p>Phone: {address.phone}</p>
//               <p>Email: {address.email}</p>
//               {address.notes && <p>Notes: {address.notes}</p>}
//             </div>
//             <div className="mt-2">
//               <button
//                 onClick={() => setEditAddress(address)}
//                 className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(address._id)}
//                 className="bg-red-600 text-white px-4 py-2 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AddressList;

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import AddressForm from "./AddressForm";

const AddressList = ({ userId, selectedAddress, onSelectAddress }) => {
  const [addresses, setAddresses] = useState([]);
  const [editAddress, setEditAddress] = useState(null);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await fetch(
        SummaryApi.fetchAddress.url.replace(":userId", userId),
        {
          method: SummaryApi.fetchAddress.method,
          credentials: "include",
        }
      );

      const result = await response.json();

      if (result.success) {
        setAddresses(result.data);
      } else {
        toast.error(result.message || "Failed to load addresses");
      }
    } catch (error) {
      toast.error("Failed to load addresses.");
    }
  };

  const handleDelete = async (addressId) => {
    try {
      const url = SummaryApi.deleteAddress.url
        .replace(":userId", userId)
        .replace(":addressId", addressId);

      const response = await fetch(url, {
        method: SummaryApi.deleteAddress.method,
        credentials: "include",
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Address deleted successfully");
        fetchAddresses();
      } else {
        toast.error(result.message || "Failed to delete address");
      }
    } catch (error) {
      toast.error("Failed to delete address.");
    }
  };

  return (
    <div>
      <div className="mt-6">
        <div className="flex  gap-6">
          {addresses?.map((address) => (
            <div
              key={address._id}
              className="border p-4 mb-4 rounded-lg shadow-md  border w-[350px]">
              <input
                type="radio"
                name="selectedAddress"
                value={address._id} // Set the value of the radio input to the address ID
                checked={selectedAddress === address} // Check if this address is selected
                onChange={() => onSelectAddress(address)} // Call onSelectAddress with the ID and the entire address object
              />

              <label className="ml-2">
                Address: {address.address}
                <br />
                City: {address.city}
                <br />
                Phone: {address.phone} <br />
                Email: {address.email} <br />
                Pin:{address.pincode} <br />
                {address.notes && <span>Notes: {address.notes}</span>}
              </label>
              <div className="mt-2">
                <button
                  onClick={() => setEditAddress(address)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(address._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {editAddress ? (
        <AddressForm
          userId={userId}
          currentAddress={editAddress}
          onSave={() => {
            setEditAddress(null);
            fetchAddresses();
          }}
        />
      ) : (
        <AddressForm userId={userId} onSave={fetchAddresses} />
      )}
    </div>
  );
};

export default AddressList;

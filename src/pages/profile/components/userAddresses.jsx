import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AddressCard, AddressForm } from "components";
import { useAuth } from "contexts";

const defaultAddress = {
  id: "",
  label: "",
  addresseeName: "",
  phoneNumber: "",
  pincode: "",
  fullAddress: "",
  city: "",
  state: "",
};

export const UserAddresses = () => {
  const {
    userState: {
      user: { addresses: userAddresses },
    },
    deleteAddress,
  } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    ...defaultAddress,
  });

  useEffect(() => {
    setAddresses([...userAddresses]);
  }, [userAddresses]);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="pd-x-sm flex-col align-i-start">
      <h2>Addresses</h2>
      <button
        onClick={() => setShowForm((curr) => !curr)}
        className="tr-btn tr-btn-primary"
      >
        Add New Address
      </button>
      <AddressForm
        setAddresses={setAddresses}
        newAddress={newAddress}
        setNewAddress={setNewAddress}
        showForm={showForm}
        setShowForm={setShowForm}
      />
      {addresses[0] &&
        addresses.map((address) => (
          <AddressCard
            key={uuidv4()}
            address={address}
            addresses={addresses}
            deleteAddress={deleteAddress}
            setNewAddress={setNewAddress}
            setShowForm={setShowForm}
            showControls
          />
        ))}
    </div>
  );
};

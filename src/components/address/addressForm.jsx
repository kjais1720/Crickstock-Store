import React, { useEffect, useState } from "react";
import { validateInput } from "./formValidation";
import { v4 as uuidv4 } from "uuid";
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
export function AddressForm({
  newAddress,
  setNewAddress,
  showForm,
  setShowForm,
}) {
  const { createNewAddress, updateAddress } = useAuth();
  const [isInputValid, setIsInputValid] = useState({
    phoneNumber: {
      isValid: true,
      msg: "",
    },
    pincode: {
      isValid: true,
      msg: "",
    },
  });

  const isFormValid = (function () {
    let flag = true;
    Object.entries(isInputValid).forEach((i) => {
      if (!i[1].isValid) flag = false;
    });
    return flag;
  })();

  useEffect(() => {
    const inputValidations = {};
    inputValidations.phoneNumber = validateInput(
      "phoneNumber",
      newAddress.phoneNumber
    );
    inputValidations.pincode = validateInput("pincode", newAddress.pincode);
    setIsInputValid(inputValidations);
  }, [newAddress]);

  const changeHandler = (e) => {
    const inputText = e.target.value;
    const inputName = e.target.name;
    setNewAddress((curr) => ({ ...curr, [inputName]: inputText }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (newAddress._id) {
      updateAddress(newAddress);
    } else {
      createNewAddress(newAddress);
    }
    setNewAddress(defaultAddress);
    setShowForm(false);
  };

  const hideFormStyles = {
    maxHeight: "0",
    overflow: "hidden",
    transition: "all ease 0.3s",
  };

  const showFormStyles = {
    maxHeight: "800px",
    transition: "all ease 0.3s",
  };

  return (
    <div
      className="form-wrapper w-100"
      style={showForm ? showFormStyles : hideFormStyles}
    >
      <form
        onSubmit={(e) => submitHandler(e)}
        className="flex-col pd-md bs-lighter"
        style={{ display: showForm ? "flex" : "none" }}
      >
        <h2> {newAddress.id ? "Edit Address" : "Add a New Address"} </h2>
        <div className="tr-input-group">
          <input
            required
            value={newAddress.addresseeName}
            onChange={(e) => changeHandler(e)}
            className="tr-input-item"
            type="text"
            name="addresseeName"
            placeholder="Name"
          />
        </div>
        <div
          className={`tr-input-group ${
            isInputValid.phoneNumber.isValid ? "" : "input-error"
          }`}
        >
          <input
            required
            value={newAddress.phoneNumber}
            onChange={changeHandler}
            className="tr-input-item"
            type="tel"
            name="phoneNumber"
            placeholder="Phone number"
          />
          {isInputValid.phoneNumber.isValid || (
            <div className="input-validation">
              <i className="far fa-check-circle"></i>
              <small>{isInputValid.phoneNumber.msg}</small>
            </div>
          )}
        </div>
        <div
          className={`tr-input-group ${
            isInputValid.pincode.isValid ? "" : "input-error"
          }`}
        >
          <input
            required
            value={newAddress.pincode}
            onChange={changeHandler}
            className="tr-input-item"
            type="text"
            name="pincode"
            placeholder="Pincode"
          />
          {isInputValid.pincode.isValid || (
            <div className="input-validation">
              <i className="far fa-check-circle"></i>
              <small>{isInputValid.pincode.msg}</small>
            </div>
          )}
        </div>
        <div className="tr-input-group">
          <textarea
            onChange={changeHandler}
            className="tr-input-item"
            type="text"
            name="fullAddress"
            placeholder="Full Address"
            rows="3"
            value={newAddress.fullAddress}
            required
          />
        </div>
        <div className="tr-input-group">
          <input
            required
            value={newAddress.city}
            onChange={changeHandler}
            className="tr-input-item"
            type="text"
            name="city"
            placeholder="City"
          />
        </div>
        <div className="tr-input-group">
          <input
            required
            value={newAddress.state}
            onChange={changeHandler}
            className="tr-input-item"
            type="text"
            name="state"
            placeholder="State"
          />
        </div>

        <div className="d-flex gap-sm">
          <div className="d-flex align-i-center">
            <label htmlFor="labelHome">Home</label>
            <input
              required
              onChange={changeHandler}
              id="labelHome"
              className="tr-input-radio"
              type="radio"
              name="label"
              value="home"
            />
          </div>
          <div className="d-flex align-i-center">
            <label htmlFor="labelWork">Work</label>
            <input
              required
              onChange={changeHandler}
              id="labelWork"
              className="tr-input-radio"
              type="radio"
              name="label"
              value="work"
            />
          </div>
        </div>
        <div className="d-flex gap-sm">
          <button
            className={`tr-btn ${isFormValid && "tr-btn-primary"}`}
            type="submit"
            disabled={isFormValid ? false : true}
            style={{ cursor: isFormValid ? "pointer" : "not-allowed" }}
          >
            Add
          </button>
          <button type="reset" className="tr-btn tr-btn-secondary">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

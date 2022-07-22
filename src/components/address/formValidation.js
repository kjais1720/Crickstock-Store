export const validateInput = (inputType, inputText) => {
  switch (inputType) {
    case "phoneNumber":
      if (/\D/.test(inputText))
        return {
          isValid: false,
          msg: "Invalid Phone number (must contain numbers only)"
        };
      if (inputText.length !== 10 && inputText !== "")
        return {
          isValid: false,
          msg: "Invalid Phone number (must be of 10 numbers)"
        };
      return { isValid: true, msg: "" };

    case "pincode":
      if (/\D/.test(inputText))
        return {
          isValid: false,
          msg: "Invalid pincode (must contain only numbers)"
        };
      if (inputText.length !== 6 && inputText !== "")
        return {
          isValid: false,
          msg: "Invalid Pincode (must be of 6 characters) "
        };
      return { isValid: true, msg: "" };
    default:
      return { isValid: true, msg: "" };
  }
};
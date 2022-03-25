export const formFields = {
    login: [
      {
        inputName: "email",
        inputLabel: "Email",
        inputType: "email",
      },
      {
        inputName: "password",
        inputLabel: "Password",
        inputType: "password",
      },
    ],
    signup: [
      {
        inputName: "firstName",
        inputLabel: "First Name",
        inputType: "text",
      },
      {
        inputName: "lastName",
        inputLabel: "Last Name",
        inputType: "text",
      },
      {
        inputName: "email",
        inputLabel: "Email",
        inputType: "email",
      },
      {
        inputName: "password",
        inputLabel: "Password",
        inputType: "password",
      },
      {
        inputName: "confirmPassword",
        inputLabel: "Confirm Password",
        inputType: "password",
      },
    ],
  };
  
  /**
   *
   * @param {string} inputName : Specifies the type of input
   * @param {string} inputValue : Specifies the value of the input
   * @param {object} formData : The value of the "formData" state
   * @returns {string} errorMessage : Either empty or description of error
   */
export const validateInput = (inputName, inputValue, formData, inputRequired) => {
    const emailFormat = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const passwordFormat =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;
    if (inputValue === "" && inputRequired) {
    return "This field cannot be empty";
    }
    switch (inputName) {
      case "email":
        if (!emailFormat.test(inputValue)) {
          return "Invalid email";
        }
        return "";
      case "password":
        if (inputValue === "") {
          return "Password field cannot be empty";
        } else if (inputValue.length < 6) {
          return "Password must be of atleast 6 characters";
        } else if (!passwordFormat.test(inputValue)) {
          return "Password must contain 1 lowercase, 1 uppercase, 1 special and 1 numeric character";
        }
        return "";
      case "confirmPassword":
        if (inputValue !== formData.password) {
          return "Password mismatch";
        }
        return "";
      default:
        return "";
    }
  };
  
  /**
   * @param object: errorObject : An object with input fields as key and their errors as the values
   * @returns boolean: true if all the errors in the object is empty & none of the inputs are empty else false
   */
export const isFormValid = (errorObject, formData) => {
    for (const inputName in formData ){
        if((inputName === "email" || inputName === "password") && formData[inputName] === "") {
            return false;
        }
    }
    for (const error of Object.values(errorObject)) {
      if (error) {
        return false;
      }
    }
    return true;
  };
  
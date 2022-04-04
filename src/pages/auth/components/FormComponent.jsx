import { InputField } from "./inputField";
import { useState, useEffect } from "react";
import { useAuth } from "contexts";
import { ButtonLoader } from "components";
import { formFields, validateInput, isFormValid } from "../utilities";

/**
 *
 * @param formType : values- 'login' | 'signup : Specifies which form is required
 * @returns A Form component
 */
export function FormComponent({ formType }) {
  const defaultFormState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const defaultError = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const guestCredentials = {
    email: "adarshbalika@gmail.com",
    password: "adarshBalika@123",
  };


  const [formData, setFormData] = useState(defaultFormState);
  const [formError, setFormError] = useState(defaultError);
  const [ actionType, setActionType ] = useState("login")

  const { loginSignupHandler, serverResponse, serverError, isLoading } = useAuth();
 
  useEffect(() => { // To handle response from the server
    if (serverResponse.status === 201 || serverResponse.status === 200) {
      setFormData({ ...defaultFormState });
      setFormError({ ...defaultError });
    } else if (serverError.response?.status === 422) {
      setFormError((prev) => ({ ...prev, email: "This email already exists" }));
    } else if (serverError.response?.status === 401) {
      setFormError((prev) => ({ ...prev, password: "invalid password" }));
    } else if (serverError.response?.status === 404) {
      setFormError((prev) => ({ ...prev, email: "Email doesn't exists" }));
    }
  }, [serverResponse, serverError]);

  useEffect(() => {
    setFormData({ ...defaultError });
    setFormError({ ...defaultError });
  }, [formType]);

  const inputHandler = (e) => {
    e.preventDefault();
    const { name, value, required } = e.target;
    const error = validateInput(name, value, formData, required);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormError((prevError) => ({ ...prevError, [name]: error }));
  };

  const formSubmitHandler = (e, route, data, action) => {
    e.preventDefault();
    setActionType(action)
    loginSignupHandler(route, data)
  };

  const disableSubmit = isFormValid(formError, formData);

  return formType === "login" ? (
    <form
      id="login-form"
      className="d-flex flex-col gap-sm align-i-center"
      onSubmit={(e) => e.preventDefault()}
    >
      <p>Login with</p>
      {formFields.login.map((inputDetails, idx) => (
        <InputField
          key={idx}
          inputDetails={inputDetails}
          inputValues={formData}
          inputHandler={inputHandler}
          formError={formError}
        />
      ))}
      <div className="d-flex justify-c-space-between w-100">
        <label className="txt-md">
          <input
            type="checkbox"
            name="rememberMe"
            className="tr-input-checkbox"
          />
          remember me
        </label>
        <a href="#" className="txt-md txt-accent">
          Forgot password?
        </a>
      </div>
      <button
        className={`${disableSubmit || "no-cursor"} tr-btn tr-btn-cta w-100`}
        type="submit"
        disabled={!disableSubmit}
        onClick={(e) => formSubmitHandler(e, "/api/auth/login", formData, "login")}
      >
        {isLoading && actionType==="login" ? <ButtonLoader /> : "Login"}
      </button>
      <button
        className="tr-btn tr-btn-outline-primary w-100"
        onClick={(e) =>
          formSubmitHandler(e, "/api/auth/login", guestCredentials, "guestLogin")
        }
      >
        {isLoading && actionType==="guestLogin" ? <ButtonLoader /> : "Guest Login"}
      </button>
    </form>
  ) : (
    <form
      id="signup-form"
      className="d-flex flex-col gap-sm align-i-center"
      onSubmit={(e) => e.preventDefault()}
    >
      <p>Sign-Up with</p>
      {formFields.signup.map((inputDetails, idx) => (
        <InputField
          key={idx}
          inputDetails={inputDetails}
          inputValues={formData}
          inputHandler={inputHandler}
          formError={formError}
        />
      ))}
      <label className="txt-md">
        <input
          type="checkbox"
          name="termsAccepted"
          className="tr-input-checkbox"
        />
        I accept all{" "}
        <a href="#" className="txt-accent">
          Terms & conditions
        </a>
      </label>
      <button
        className={`${disableSubmit || "no-cursor"} tr-btn tr-btn-cta w-100`}
        type="submit"
        disabled={!disableSubmit}
        onClick={(e) => formSubmitHandler(e, "/api/auth/signup", formData, "signup")}
      >
        {isLoading && actionType==="signup" ? <ButtonLoader /> : "Signup"}
      </button>
    </form>
  );
}

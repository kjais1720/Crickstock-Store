import { InputField } from "./inputField";
import { useState, useEffect } from "react";
import { useAxios } from "utilities";
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
    email: "",
    password: "",
  };
  const guestCredentials = {
    email: "adarshbalika@gmail.com",
    password: "adarshBalika@123",
  };

  const [formData, setFormData] = useState(defaultFormState);
  const [formError, setFormError] = useState(defaultError);

  const [apiUrl, setApiUrl] = useState("");
  const [dataToPost, setDataToPost] = useState({});
  const { userDispatch } = useAuth();

  const { serverResponse, isLoading, serverError } = useAxios(
    apiUrl,
    "post",
    dataToPost
  );
  useEffect(() => {
    if (serverResponse.status === 201 || serverResponse.status === 200) {
      userDispatch({
        type: "login",
        payload: {
          user:
            serverResponse.data.createdUser || serverResponse.data.foundUser,
          encodedToken: serverResponse.data.encodedToken,
        },
      });
      setFormData({ ...defaultFormState });
      setFormError({ ...defaultError });
    } else if (serverError.response?.status === 422) {
      setFormError((prev) => ({ ...prev, email: "This email already exists" }));
    }
  }, [serverResponse, serverError]);

  const inputHandler = (e) => {
    e.preventDefault();
    const {name, value, required} = e.target;
    const error = validateInput(name, value, formData, required);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormError((prevError) => ({ ...prevError, [name]: error }));
  };

  const formSubmitHandler = async (e, route) => {
    e.preventDefault();
    let requiredPostData = {
      email: formData.email,
      password: formData.password,
    };
    if (route === "/api/auth/signup") {
      requiredPostData = {...requiredPostData, ...formData}
    }
    setApiUrl(route);
    setDataToPost(requiredPostData);
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
      <div className="d-flex justify-c-space-between stretch-x">
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
        className={`${
          disableSubmit || "disabledButton"
        } tr-btn tr-btn-cta stretch-x`}
        type="submit"
        disabled={!disableSubmit}
        onClick={(e) => formSubmitHandler(e, "/api/auth/login")}
      >
        {isLoading ? <ButtonLoader /> : "Login"}
      </button>
      <button className="tr-btn tr-btn-outline-primary stretch-x">Guest Login</button>
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
        className={`${
          disableSubmit || "disabledButton"
        } tr-btn tr-btn-cta stretch-x`}
        type="submit"
        disabled={!disableSubmit}
        onClick={(e) => formSubmitHandler(e, "/api/auth/signup")}
      >
        {isLoading ? <ButtonLoader /> : "Signup"}
      </button>
    </form>
  );
}

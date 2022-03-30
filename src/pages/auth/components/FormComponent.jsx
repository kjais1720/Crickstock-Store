import { InputField } from "./inputField";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAxios } from "utilities";
import { useAuth } from "contexts";
import { ButtonLoader } from "components";
import { formFields, validateInput, isFormValid } from "../utilities";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

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
      const user = serverResponse.data.createdUser || serverResponse.data.foundUser ;
      userDispatch({
        type: "login",
        payload: {
          user,
          encodedToken: serverResponse.data.encodedToken,
        },
      });
      setFormData({ ...defaultFormState });
      setFormError({ ...defaultError });
      // Fire toast
      serverResponse.status === 200
      ? toast.success(`Logged in. Welcome back ${user.firstName}`)
      : toast.success(
        `Signed up. Welcome aboard ${user.firstName}`
        );
        navigate(-1);
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

  const formSubmitHandler = async (e, route, data) => {
    e.preventDefault();
    const requiredPostData = {
      email: data.email,
      password: data.password,
    };
    if (route === "/api/auth/signup") {
      requiredPostData.firstName = data.firstName;
      requiredPostData.lastName = data.lastName;
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
          disableSubmit || "no-cursor"
        } tr-btn tr-btn-cta stretch-x`}
        type="submit"
        disabled={!disableSubmit}
        onClick={(e) => formSubmitHandler(e, "/api/auth/login", formData)}
      >
        {isLoading ? <ButtonLoader /> : "Login"}
      </button>
      <button
        className="tr-btn tr-btn-outline-primary stretch-x"
        onClick={(e) =>
          formSubmitHandler(e, "/api/auth/login", guestCredentials)
        }
      >
        Guest Login
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
        className={`${
          disableSubmit || "no-cursor"
        } tr-btn tr-btn-cta stretch-x`}
        type="submit"
        disabled={!disableSubmit}
        onClick={(e) => formSubmitHandler(e, "/api/auth/signup", formData)}
      >
        {isLoading ? <ButtonLoader /> : "Signup"}
      </button>
    </form>
  );
}

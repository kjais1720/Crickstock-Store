import { useState } from "react";
const InputErrorComponent = ({ error }) => (
  <div className="input-validation">
    <i className="far fa-times-circle"></i>
    <small>{error}</small>
  </div>
);

export function InputField({
  inputDetails,
  inputHandler,
  inputValues,
  formError,
}) {
  const { inputName, inputLabel, inputType } = inputDetails;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className={`input-form-wrapper ${
        formError[inputName] && "input-error"
      } p-rel`}
    >
      <label htmlFor={inputName}>{inputLabel}</label>
      <input
        className="tr-input-item"
        id={inputName}
        name={inputName}
        type={inputType === "password" && showPassword ? "text" : inputType}
        onChange={inputHandler}
        value={inputValues[inputName]}
        required
        autoComplete="off"
      />
      {inputType === "password" ? (
        <button
          className="show-password-btn p-abs tr-btn tr-btn-icon"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          <i
            className={`txt-md fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
          ></i>
        </button>
      ) : (
        ""
      )}
      {formError[inputName] ? (
        <InputErrorComponent error={formError[inputName]} />
      ) : (
        " "
      )}
    </div>
  );
}

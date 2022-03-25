import { useState } from "react";
import { FormComponent } from "./components/FormComponent";

export function Auth() {
  const [formToShow, setFormToShow] = useState("login");
  return (
    <div className="auth-form-container tr-card tr-card-hor d-flex mr-y-xxlg">
      <div className="tr-card-banner">
        <img
          className="img-responsive"
          src="/assets/undraw_secure_login_pdn4.svg"
          alt="A woman opening a door"
        />
      </div>

      <div className="form-body flex-col align-i-center">
        <div className="d-flex form-toggle-buttons justify-c-center stretch-x">
          <button
            onClick={() => setFormToShow("login")}
            className={`tr-btn ${
              formToShow === "login" ? "tr-btn-primary" : "tr-btn-outline"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setFormToShow("signup")}
            className={`tr-btn ${
              formToShow === "signup" ? "tr-btn-primary" : "tr-btn-outline"
            }`}
          >
            Sign-Up
          </button>
        </div>
        {<FormComponent formType={formToShow} />}
      </div>
    </div>
  );
}

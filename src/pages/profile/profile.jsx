import { useAuth } from "contexts";
import { Outlet, NavLink } from "react-router-dom";
import styles from "./profile.module.css";
export function Profile() {
  const { userState : {user}, logout } = useAuth();
  const firstName = user?.firstName;
  const lastName = user?.lastName;
  return (
    <div className={`${styles.profilePage} d-flex flex-wrap w-100 pd-md`}>
      <aside className={`${styles.profileSidebar} bs-lighter flex-col bd-sm`}>
        <div className={styles.profileHeader}>
          <h2 className="txt-white">
            {firstName} {lastName}
          </h2>
        </div>
        <ul className={`${styles.profileLinks} h-100 flex-col pd-xs`}>
          <li className="w-100">
            <NavLink
              className={({ isActive }) =>
                `w-100 tr-btn d-block ${
                  isActive ? "tr-btn-primary" : "tr-btn-outline-primary"
                }`
              }
              to="/user/profile/orders"
            >
              Orders
            </NavLink>
          </li>
          <li className="w-100">
            <NavLink
              className={({ isActive }) =>
                `w-100 tr-btn d-block ${
                  isActive ? "tr-btn-primary" : "tr-btn-outline-primary"
                }`
              }
              to="/user/profile/addresses"
            >
              Addresses
            </NavLink>
          </li>
          <li className="w-100">
            <button
              onClick={logout}
              className="tr-btn w-100 tr-btn-outline-error mt-auto"
            >
              Logout
            </button>
          </li>
        </ul>
      </aside>
      <Outlet />
    </div>
  );
}

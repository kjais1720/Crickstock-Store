import styles from "./miscellaneous.module.css"
import { useState } from "react";
import { Link } from "react-router-dom";

export function Badge({ badgeCount }) {
  return <div className={`${styles.badge} badge badge-red`}>{badgeCount}</div>;
}

export function ProductBadge({ badgeText }) {
  return <div className="tr-card-badge">{badgeText}</div>;
}

export function DropdownMenu({ links, menuTitle }){
  const [showPageMenu, setShowPageMenu] = useState(false);
  return (
    <div
      onMouseEnter={() => setShowPageMenu(true)}
      onMouseLeave={() => setShowPageMenu(false)}
      className={styles.pageMenuWrapper}
    >
      <button className="tr-btn tr-btn-link d-flex align-i-center gap-sm">
        {menuTitle}
        <i className="fas fa-caret-down"></i>
      </button>
      <ul
        className={`flex-col ${styles.pageMenu} ${
          showPageMenu && styles.activeMenu
        }`}
      >
        {links.map((link, idx) =>
          link.name === "Logout" ? (
            <button key={idx} className = "tr-btn tr-btn-error txt-primary bg-transparent" onClick={() => link.clickHandler({ type: "logout" })}>
              Logout
            </button>
          ) : (
            <Link key={idx} to={link.path}>
              {link.name}
            </Link>
          )
        )}
      </ul>
    </div>
  );
};
import styles from "./miscellaneous.module.css"
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTimer } from "utilities";

export function Badge({ badgeCount }) {
  return <div className={`${styles.badge} badge badge-red`}>{badgeCount}</div>;
}

export function ProductBadge({ badgeText }) {
  return <div className="tr-card-badge">{badgeText}</div>;
}

export function DropdownMenu({ links, menuTitle }){
  return (
    <div className={styles.pageMenuWrapper} >
      <button className="tr-btn tr-btn-link d-flex align-i-center gap-sm">
        {menuTitle}
        <i className="fas fa-caret-down"></i>
      </button>
      <ul
        className={`flex-col ${styles.pageMenu}`}
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


export function Snackbar({ snackbarText, actionBtn, setShowSnackbar, duration }) {
  const { timeLeft } = useTimer(duration);
  if(timeLeft === 0) setShowSnackbar(false);
  const bottomBorderWidth = Math.floor((100/duration))*timeLeft;
  const getActionButton = ({ linkPath, btnType, clickHandler, btnText }) => {
    if ( btnType === 'link'){
      return(
        <Link to={linkPath} className="txt-accent">
          {btnText}
        </Link>
      )
    }
    else if(btnType === "button"){
      return(
        <button onClick={clickHandler} className="tr-snackbar-link">
          {btnText}
        </button>
      )
    }
    return ""
  }

  return (
    <div className={`${styles.snackbar} tr-snackbar bg-primary d-flex f-wrap p-abs hor-centered`}>
      <p className="tr-snackbar-text">{snackbarText}</p>
      {getActionButton(actionBtn)}
      <div className={`${styles.bottomBorder} bg-accent`} style={{width: bottomBorderWidth+"%" }}></div>
    </div>
  );
}

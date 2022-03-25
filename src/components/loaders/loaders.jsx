import styles from "./loader.module.css";
export function LoaderForComponent() {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loader}>
        <span
          className={styles.loaderCircle1 + " " + styles.loaderCircle}
        ></span>
        <span
          className={styles.loaderCircle2 + " " + styles.loaderCircle}
        ></span>
        <span
          className={styles.loaderCircle3 + " " + styles.loaderCircle}
        ></span>
      </div>
    </div>
  );
}

export function ButtonLoader() {
  return (
    <div className={styles.buttonLoaderWrapper}>
      <div className={styles.buttonLoader}></div>
    </div>
  );
}


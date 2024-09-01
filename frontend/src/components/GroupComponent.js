import PropTypes from "prop-types";
import styles from "./GroupComponent.module.css";

const GroupComponent = ({ className = "" }) => {
  return (
    <header className={[styles.rectangleParent, className].join(" ")}>
      <div className={styles.frameChild} />
      <div className={styles.mindMedixContainerWrapper}>
        <div className={styles.mindMedixContainer}>
          <img
            className={styles.mindmedixLogo1}
            loading="lazy"
            alt=""
            src="/mindmedix-logo-12@2x.png"
          />
          <a className={styles.mindmedix}>MindMedix</a>
        </div>
      </div>
      <div className={styles.userContainer}>
        <div className={styles.profileCircleParent}>
          <div className={styles.profileCircle} />
          <img
            className={styles.userProfileIconFreeVector}
            loading="lazy"
            alt=""
            src="/userprofileiconfreevectorremovebgpreview-11@2x.png"
          />
        </div>
        <div className={styles.userName}>
          <a className={styles.akshat}>Akshat ;)</a>
        </div>
      </div>
    </header>
  );
};

GroupComponent.propTypes = {
  className: PropTypes.string,
};

export default GroupComponent;

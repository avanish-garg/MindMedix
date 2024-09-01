import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./EventItem.module.css";

const EventItem = ({
  className = "",
  upcomingEvents,
  onPrimaryClick,
  asset21,
}) => {
  const navigate = useNavigate();

  const onPrimaryClick1 = useCallback(() => {
    navigate("/login-page");
  }, [navigate]);

  const onPrimaryContainerClick = useCallback(() => {
    navigate("/sign-up");
  }, [navigate]);

  return (
    <header className={[styles.eventItem, className].join(" ")}>
      <div className={styles.eventItemChild} />
      <div className={styles.mindmedixLogo1Parent}>
        <img
          className={styles.mindmedixLogo1}
          loading="lazy"
          alt=""
          src="/mindmedix-logo-1@2x.png"
        />
        <a className={styles.mindmedix}>MindMedix</a>
      </div>
      <div className={styles.titleContainerWrapper}>
        <div className={styles.titleContainer}>
          <button className={styles.primary} onClick={onPrimaryClick1}>
            <a className={styles.title}>Login</a>
          </button>
          <div className={styles.primary1} onClick={onPrimaryContainerClick}>
            <a className={styles.title1}>SignUp</a>
          </div>
        </div>
      </div>
    </header>
  );
};

EventItem.propTypes = {
  className: PropTypes.string,
  upcomingEvents: PropTypes.string,
  asset21: PropTypes.string,

  /** Action props */
  onPrimaryClick: PropTypes.func,
};

export default EventItem;

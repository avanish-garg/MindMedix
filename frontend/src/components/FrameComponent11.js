import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./FrameComponent11.module.css";

const FrameComponent11 = ({ className = "", onPrimaryClick, community1 }) => {
  const navigate = useNavigate();

  const onPrimaryClick1 = useCallback(() => {
    navigate("/login-page");
  }, [navigate]);

  return (
    <div className={[styles.communityContent, className].join(" ")}>
      <div className={styles.communityContentChild} />
      <div className={styles.counselingServicesButtonCon}>
        <div className={styles.welcomeParagraph}>
          <div className={styles.welcomeHeading}>
            <h1 className={styles.welcomeToOur}>
              Welcome to our Mental Health Community!
            </h1>
          </div>
          <div className={styles.findSupportGuidance}>
            Find support, guidance, and expert consultancy from our team.
          </div>
          <div className={styles.learnButton}>
            <button className={styles.primary} onClick={onPrimaryClick}>
              <div className={styles.title}>Get Started</div>
            </button>
          </div>
        </div>
      </div>
      <img
        className={styles.community1Icon}
        loading="lazy"
        alt=""
        src={community1}
      />
    </div>
  );
};

FrameComponent11.propTypes = {
  className: PropTypes.string,
  community1: PropTypes.string,

  /** Action props */
  onPrimaryClick: PropTypes.func,
};

export default FrameComponent11;

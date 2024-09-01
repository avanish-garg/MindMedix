import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./FrameComponent10.module.css";

const FrameComponent10 = ({ className = "", onPrimaryClick, image1 }) => {
  const navigate = useNavigate();

  const onPrimaryClick1 = useCallback(() => {
    navigate("/login-page");
  }, [navigate]);

  return (
    <section className={[styles.serviceDescription, className].join(" ")}>
      <div className={styles.cardsContainer}>
        <div className={styles.card}>
          <div className={styles.image}>
            <div className={styles.title}>Therapist consultation</div>
            <img
              className={styles.image1Icon}
              loading="lazy"
              alt=""
              src={image1}
            />
          </div>
          <div className={styles.cardContent}>
            <div className={styles.titleParent}>
              <div className={styles.title1}>Virtual Therapy Sessions</div>
              <div className={styles.subtitle}>From $$$/hr</div>
            </div>
          </div>
        </div>
        <div className={styles.services}>
          <div className={styles.counselingContent}>
            <div className={styles.counselingDescription}>
              <h1 className={styles.discoverOurCounseling}>
                Discover Our Counseling Services
              </h1>
              <div className={styles.exploreOurRangeOfMentalHeWrapper}>
                <div className={styles.exploreOurRange}>
                  Explore our range of mental health service tailored for you.
                </div>
              </div>
            </div>
            <div className={styles.primaryWrapper}>
              <button className={styles.primary} onClick={onPrimaryClick}>
                <div className={styles.title2}>Book Appointment</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

FrameComponent10.propTypes = {
  className: PropTypes.string,
  image1: PropTypes.string,

  /** Action props */
  onPrimaryClick: PropTypes.func,
};

export default FrameComponent10;

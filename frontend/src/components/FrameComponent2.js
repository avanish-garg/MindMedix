import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./FrameComponent2.module.css";

const FrameComponent2 = ({ className = "" }) => {
  const navigate = useNavigate();

  const onPrimaryClick = useCallback(() => {
    navigate("/login-page");
  }, [navigate]);

  return (
    <div className={[styles.detectionContent, className].join(" ")}>
      <div className={styles.detectionContentChild} />
      <div className={styles.detectionBlock}>
        <div className={styles.diseasePredictionParent}>
          <h1 className={styles.diseasePrediction}>Disease Prediction</h1>
          <div className={styles.earlyDetectionOfDiseaseWrapper}>
            <b className={styles.earlyDetectionOf}>
              Early Detection of Disease
            </b>
          </div>
          <button className={styles.primary} onClick={onPrimaryClick}>
            <div className={styles.title}>Get Started</div>
          </button>
        </div>
      </div>
      <img
        className={styles.asset21}
        loading="lazy"
        alt=""
        src="/asset-2-1@2x.png"
      />
    </div>
  );
};

FrameComponent2.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent2;

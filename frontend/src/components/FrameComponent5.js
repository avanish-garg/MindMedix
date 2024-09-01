import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./FrameComponent5.module.css";

const FrameComponent5 = ({
  className = "",
  bookYourAppointmentToday,
  frameDivPosition,
  appointmentButtonGap,
}) => {
  const frameDivStyle = useMemo(() => {
    return {
      position: frameDivPosition,
    };
  }, [frameDivPosition]);

  const navigate = useNavigate();

  const onPrimaryClick = useCallback(() => {
    navigate("/homepage-after-sign-up-or-login");
  }, [navigate]);

  return (
    <div
      className={[styles.primaryWrapper, className].join(" ")}
      style={frameDivStyle}
    >
      <button className={styles.primary} onClick={onPrimaryClick}>
        <div className={styles.title}>SignUp</div>
      </button>
    </div>
  );
};

FrameComponent5.propTypes = {
  className: PropTypes.string,
  bookYourAppointmentToday: PropTypes.string,

  /** Style props */
  frameDivPosition: PropTypes.any,
  appointmentButtonGap: PropTypes.any,
};

export default FrameComponent5;

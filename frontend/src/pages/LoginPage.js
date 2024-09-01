import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import LoginFormFields from "../components/LoginFormFields";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const onArrowLeftCircleIconClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className={styles.loginPage}>
      <section className={styles.frameParent}>
        <div className={styles.arrowLeftCircleParent}>
          <img
            className={styles.arrowLeftCircleIcon}
            loading="lazy"
            alt=""
            src="/arrow-leftcircle.svg"
            onClick={onArrowLeftCircleIconClick}
          />
          <div className={styles.welcomeBackWrapper}>
            <h1 className={styles.welcomeBack}>Welcome Back 😊</h1>
          </div>
        </div>
        <div className={styles.callDoctorConceptDoctorsAnParent}>
          <img
            className={styles.callDoctorConceptDoctorsAnIcon}
            loading="lazy"
            alt=""
            src="/calldoctorconceptdoctorsanswerpatientquestionsphone-2@2x.png"
          />
          <LoginFormFields />
        </div>
      </section>
      <div className={styles.loginPageInner}>
        <div className={styles.mindmedixLogo2Parent}>
          <img
            className={styles.mindmedixLogo2}
            alt=""
            src="/mindmedix-logo-2@2x.png"
          />
          <h2 className={styles.mindmedix}>MindMedix</h2>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

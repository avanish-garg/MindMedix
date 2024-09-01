import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import FrameComponent5 from "../components/FrameComponent5";
import styles from "./SignUp.module.css";

const SignUp = () => {
  const navigate = useNavigate();

  const onArrowLeftCircleIconClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onPrimaryClick = useCallback(() => {
    navigate("/login-page");
  }, [navigate]);

  return (
    <div className={styles.signUp}>
      <img
        className={styles.callDoctorConceptDoctorsAnIcon}
        loading="lazy"
        alt=""
        src="/calldoctorconceptdoctorsanswerpatientquestionsphone-2@2x.png"
      />
      <div className={styles.primaryTitle}>
        <div className={styles.arrowLeftCircleParent}>
          <img
            className={styles.arrowLeftCircleIcon}
            loading="lazy"
            alt=""
            src="/arrow-leftcircle.svg"
            onClick={onArrowLeftCircleIconClick}
          />
          <div className={styles.bookYourAppointmentTodayWrapper}>
            <div className={styles.bookYourAppointment}>
              Book your appointment today!
            </div>
          </div>
        </div>
      </div>
      <section className={styles.signupForm}>
        <div className={styles.formContainer}>
          <div className={styles.formContainerChild} />
          <div className={styles.inputFields}>
            <form className={styles.medicalBg3Parent}>
              <img
                className={styles.medicalBg3}
                loading="lazy"
                alt=""
                src="/medical-bg-3@2x.png"
              />
              <div className={styles.nameEmailInputs}>
                <img
                  className={styles.medicalBg4}
                  alt=""
                  src="/medical-bg-4@2x.png"
                />
                <div className={styles.createAccount}>Create Account</div>
                <div className={styles.nameEmailInputs1}>
                  <div className={styles.nameEmailInputsChild} />
                  <div className={styles.name}>Name</div>
                </div>
                <div className={styles.phoneNumberField}>
                  <div className={styles.nameEmailInputsChild} />
                  <div className={styles.email}>Email</div>
                </div>
                <div className={styles.detailFields}>
                  <div className={styles.detailFieldsChild} />
                  <div className={styles.gender}>Gender</div>
                </div>
                <div className={styles.demographicLabels}>
                  <div className={styles.demographicLabelsChild} />
                  <div className={styles.age}>Age</div>
                </div>
              </div>
              <div className={styles.nameEmailFields}>
                <div className={styles.nameEmailFieldsChild} />
                <input
                  className={styles.phoneNo}
                  placeholder="Phone No."
                  type="text"
                />
              </div>
              <div className={styles.demographicLabels1}>
                <div className={styles.demographicLabelsItem} />
                <div className={styles.password}>Password</div>
              </div>
              <FrameComponent5 />
              <div className={styles.haveAnAccount}>have an account?</div>
              <div className={styles.bookAppointment}>
                <button className={styles.primary} onClick={onPrimaryClick}>
                  <div className={styles.title}>Login</div>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className={styles.logoContainerWrapper}>
          <div className={styles.logoContainer}>
            <img
              className={styles.mindmedixLogo2}
              loading="lazy"
              alt=""
              src="/mindmedix-logo-1@2x.png"
            />
            <b className={styles.mindmedix}>MindMedix</b>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;

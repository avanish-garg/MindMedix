import { useCallback, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import FrameComponent5 from "../components/FrameComponent5";
import styles from "./SignUp.module.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    age: "",
    phoneNo: "",
    password: "",
  });

  const placeholders = {
    name: "Name",
    email: "Email",
    gender: "Gender",
    age: "Age",
    phoneNo: "Phone No.",
    password: "Password",
  };

  const handleChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.innerText.trim(),
    });
  };

  const handleFocus = (e, field) => {
    if (formData[field] === "") {
      e.target.innerText = "";
    }
  };

  const handleBlur = (e, field) => {
    if (e.target.innerText.trim() === "") {
      e.target.innerText = placeholders[field];
    }
  };

  const onArrowLeftCircleIconClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onPrimaryClick = useCallback(() => {
    console.log("User Data:", formData);
    navigate("/login-page");
  }, [navigate, formData]);

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
                  <div
                    className={styles.name}
                    contentEditable="true"
                    onInput={(e) => handleChange(e, "name")}
                    onFocus={(e) => handleFocus(e, "name")}
                    onBlur={(e) => handleBlur(e, "name")}
                  >
                    {placeholders.name}
                  </div>
                </div>

                <div className={styles.phoneNumberField}>
                  <div
                    className={styles.email}
                    contentEditable="true"
                    onInput={(e) => handleChange(e, "email")}
                    onFocus={(e) => handleFocus(e, "email")}
                    onBlur={(e) => handleBlur(e, "email")}
                  >
                    {placeholders.email}
                  </div>
                </div>

                <div className={styles.detailFields}>
                  <div
                    className={styles.gender}
                    contentEditable="true"
                    onInput={(e) => handleChange(e, "gender")}
                    onFocus={(e) => handleFocus(e, "gender")}
                    onBlur={(e) => handleBlur(e, "gender")}
                  >
                    {placeholders.gender}
                  </div>
                </div>

                <div className={styles.demographicLabels}>
                  <div
                    className={styles.age}
                    contentEditable="true"
                    onInput={(e) => handleChange(e, "age")}
                    onFocus={(e) => handleFocus(e, "age")}
                    onBlur={(e) => handleBlur(e, "age")}
                  >
                    {placeholders.age}
                  </div>
                </div>
              </div>

              <div className={styles.nameEmailFields}>
                <div
                  className={styles.phoneNo}
                  contentEditable="true"
                  onInput={(e) => handleChange(e, "phoneNo")}
                  onFocus={(e) => handleFocus(e, "phoneNo")}
                  onBlur={(e) => handleBlur(e, "phoneNo")}
                >
                  {placeholders.phoneNo}
                </div>
              </div>

              <div className={styles.demographicLabels1}>
                <div
                  className={styles.password}
                  contentEditable="true"
                  onInput={(e) => handleChange(e, "password")}
                  onFocus={(e) => handleFocus(e, "password")}
                  onBlur={(e) => handleBlur(e, "password")}
                >
                  {placeholders.password}
                </div>
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

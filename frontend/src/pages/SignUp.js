import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import FrameComponent5 from "../components/FrameComponent5";
import styles from "./SignUp.module.css";

const apiBaseUrl = 'http://localhost:50009'; // Ensure this matches your backend URL

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

  // Define placeholders object
  const placeholders = {
    name: "Name",
    email: "Email",
    gender: "Gender",
    age: "Age",
    phoneNo: "Phone No.",
    password: "Password",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onArrowLeftCircleIconClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onPrimaryClick = useCallback(async () => {
    console.log("User Data:", formData);

    try {
      const response = await fetch(`${apiBaseUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const result = await response.json();
      console.log('Registration successful:', result);

      // Navigate to login page after successful registration
      navigate("/login-page");
    } catch (error) {
      console.error('Error during registration:', error.message);
      // Handle the error (e.g., show an error message to the user)
    }
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
                  <input
                    className={styles.name}
                    name="name"
                    placeholder={placeholders.name}
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.phoneNumberField}>
                  <input
                    className={styles.email}
                    name="email"
                    placeholder={placeholders.email}
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.detailFields}>
                  <input
                    className={styles.gender}
                    name="gender"
                    placeholder={placeholders.gender}
                    value={formData.gender}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.demographicLabels}>
                  <input
                    className={styles.age}
                    name="age"
                    placeholder={placeholders.age}
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.nameEmailFields}>
                <input
                  className={styles.phoneNo}
                  name="phoneNo"
                  placeholder={placeholders.phoneNo}
                  value={formData.phoneNo}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.demographicLabels1}>
                <input
                  className={styles.password}
                  name="password"
                  type="password"
                  placeholder={placeholders.password}
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <FrameComponent5 />
              <div className={styles.haveAnAccount}>Have an account?</div>
              <div className={styles.bookAppointment}>
                <button className={styles.primary} type="button" onClick={onPrimaryClick}>
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

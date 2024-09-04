import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginFormFields from "../components/LoginFormFields";
import styles from "./LoginPage.module.css";
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:50009/api/auth/login', {
        email,
        password
      });

      // Store token (in localStorage or context)
      localStorage.setItem('token', response.data.token);

      // Redirect to homepage or another page
      navigate('/homepage-after-sign-up-or-login');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className={styles.loginPage}>
      <section className={styles.frameParent}>
        <div className={styles.arrowLeftCircleParent}>
          <img
            className={styles.arrowLeftCircleIcon}
            loading="lazy"
            alt=""
            src="/arrow-leftcircle.svg"
            onClick={() => navigate("/")}
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
          <form onSubmit={handleLogin}>
            <LoginFormFields setEmail={setEmail} setPassword={setPassword} />
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.loginButton}>Login</button>
          </form>
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

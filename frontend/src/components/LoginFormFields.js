import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./LoginFormFields.module.css";

const LoginFormFields = ({ className = "" }) => {
  const navigate = useNavigate();

  const onPrimaryClick = useCallback(() => {
    navigate("/homepage-after-sign-up-or-login");
  }, [navigate]);

  const onPrimaryClick1 = useCallback(() => {
    navigate("/sign-up");
  }, [navigate]);

  return (
    <div className={[styles.loginFormFields, className].join(" ")}>
      <div className={styles.loginFormFieldsChild} />
      <img className={styles.medicalBg4} alt="" src="/medical-bg-41@2x.png" />
      <a className={styles.login}>Login</a>
      <div className={styles.loginFormFieldsInner}>
        <div className={styles.socialButtonIconsParent}>
          <div className={styles.socialButtonIcons}>
            <div className={styles.socialButtonIconsChild} />
            <div className={styles.email}>Email</div>
          </div>
          <div className={styles.frameParent}>
            <div className={styles.frameWrapper}>
              <div className={styles.medicalBg3Parent}>
                <img
                  className={styles.medicalBg3}
                  alt=""
                  src="/medical-bg-31@2x.png"
                />
                <div className={styles.frameContainer}>
                  <div className={styles.facebookLogosu1Parent}>
                    <img
                      className={styles.facebookLogosu1Icon}
                      loading="lazy"
                      alt=""
                      src="/facebooklogosu-1@2x.png"
                    />
                    <div className={styles.emailLogin}>
                      <div className={styles.primaryWrapper}>
                        <button
                          className={styles.primary}
                          onClick={onPrimaryClick}
                        >
                          <div className={styles.title}>Login</div>
                        </button>
                      </div>
                      <div className={styles.pngTransparentGoogleLogoGoParent}>
                        <img
                          className={styles.pngTransparentGoogleLogoGoIcon}
                          loading="lazy"
                          alt=""
                          src="/pngtransparentgooglelogogooglelogogsuitechrometextlogochromeremovebgpreview-1@2x.png"
                        />
                        <div className={styles.orWrapper}>
                          <div className={styles.or}>or</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.dontHaveAnAccountParent}>
                  <div className={styles.dontHaveAn}>
                    don’t have an account?
                  </div>
                  <div className={styles.primaryContainer}>
                    <button
                      className={styles.primary1}
                      onClick={onPrimaryClick1}
                    >
                      <div className={styles.title1}>SignUp</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.passwordInput}>
              <div className={styles.socialButtonIconsChild} />
              <div className={styles.password}>Password</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

LoginFormFields.propTypes = {
  className: PropTypes.string,
};

export default LoginFormFields;

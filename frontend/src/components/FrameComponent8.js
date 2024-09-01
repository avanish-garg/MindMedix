import { useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./FrameComponent8.module.css";

const FrameComponent8 = ({ className = "" }) => {
  const onTherapyTextClick = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='primary2']");
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  const onCommunityTextClick = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='primary1']");
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  const onMoodTrackerTextClick = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='primary']");
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  return (
    <section
      className={[styles.homepageAfterSignUpOrLogiInner, className].join(" ")}
    >
      <header className={styles.rectangleParent}>
        <img
          className={styles.frameChild}
          alt=""
          src="/rectangle-4138@2x.png"
        />
        <div className={styles.frameItem} />
        <div className={styles.frameInner} />
        <div className={styles.rectangleDiv} />
        <img
          className={styles.mindmedixLogo1}
          loading="lazy"
          alt=""
          src="/mindmedix-logo-11@2x.png"
        />
        <div className={styles.frameParent}>
          <div className={styles.mindmedixWrapper}>
            <a className={styles.mindmedix}>MindMedix</a>
          </div>
          <div className={styles.frameWrapper}>
            <div className={styles.therapyParent}>
              <a className={styles.therapy} onClick={onTherapyTextClick}>
                Therapy
              </a>
              <a className={styles.community} onClick={onCommunityTextClick}>
                Community
              </a>
            </div>
          </div>
          <div className={styles.greeting}>
            <div className={styles.moodTrackerParent}>
              <a
                className={styles.moodTracker}
                onClick={onMoodTrackerTextClick}
              >
                Mood Tracker
              </a>
              <a className={styles.about}>{`About `}</a>
            </div>
          </div>
          <div className={styles.ellipseParent}>
            <div className={styles.ellipseDiv} />
            <img
              className={styles.userProfileIconFreeVector}
              loading="lazy"
              alt=""
              src="/userprofileiconfreevectorremovebgpreview-1@2x.png"
            />
          </div>
          <div className={styles.helloAkshatWrapper}>
            <h2 className={styles.helloAkshat}>Hello Akshat ;)</h2>
          </div>
        </div>
      </header>
    </section>
  );
};

FrameComponent8.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent8;

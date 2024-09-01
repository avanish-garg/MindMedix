import { useCallback } from "react";
import GroupComponent from "../components/GroupComponent";
import { useNavigate } from "react-router-dom";
import styles from "./MoodTrackerCase.module.css";

const MoodTrackerCase = () => {
  const navigate = useNavigate();

  const onArrowLeftCircleIconClick = useCallback(() => {
    navigate("/homepage-after-sign-up-or-login");
  }, [navigate]);

  return (
    <div className={styles.moodTrackerCase1}>
      <GroupComponent />
      <section className={styles.navigationContainer}>
        <div className={styles.moodHeaderParent}>
          <div className={styles.moodHeader}>
            <img
              className={styles.arrowLeftCircleIcon}
              loading="lazy"
              alt=""
              src="/arrow-leftcircle.svg"
              onClick={onArrowLeftCircleIconClick}
            />
            <div className={styles.moodQuestionContainer}>
              <div className={styles.moodQuestion}>
                <div className={styles.howAreYou}>
                  How are you feeling today?
                </div>
              </div>
              <div className={styles.moodGrid}>
                <div className={styles.moodGridChild} />
                <div className={styles.optionRow}>
                  <img
                    className={styles.image18Icon}
                    loading="lazy"
                    alt=""
                    src="/image-182@2x.png"
                  />
                </div>
                <div className={styles.moodImageContainer}>
                  <img
                    className={styles.image18Icon}
                    loading="lazy"
                    alt=""
                    src="/image-21@2x.png"
                  />
                </div>
                <div className={styles.optionRow1}>
                  <img
                    className={styles.image18Icon}
                    loading="lazy"
                    alt=""
                    src="/image-172@2x.png"
                  />
                </div>
                <img
                  className={styles.image20Icon}
                  loading="lazy"
                  alt=""
                  src="/image-20@2x.png"
                />
                <img
                  className={styles.image20Icon}
                  loading="lazy"
                  alt=""
                  src="/image-19@2x.png"
                />
              </div>
            </div>
          </div>
          <div className={styles.reasonInputContainerWrapper}>
            <div className={styles.reasonInputContainer}>
              <b className={styles.whatsAffectingYour}>
                What’s affecting your mood?
              </b>
              <div className={styles.reasonInput}>
                <div className={styles.describeYourReasonWrapper}>
                  <div className={styles.describeYourReason}>
                    Describe your reason
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MoodTrackerCase;

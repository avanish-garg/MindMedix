import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import FrameComponent4 from "../components/FrameComponent4";
import FrameComponent10 from "../components/FrameComponent10";
import FrameComponent11 from "../components/FrameComponent11";
import FrameComponent7 from "../components/FrameComponent7";
import FrameComponent2 from "../components/FrameComponent2";
import Post from "../components/Post";
import styles from "./Homepage.module.css";

const Homepage = () => {
  const navigate = useNavigate();

  const onPrimaryClick = useCallback(() => {
    navigate("/login-page");
  }, [navigate]);

  return (
    <div className={styles.homepage}>
      <div className={styles.homepageChild} />
      <FrameComponent4 />
      <FrameComponent10
        onPrimaryClick={onPrimaryClick}
        image1="/image-17@2x.png"
      />
      <section className={styles.community}>
        <FrameComponent11
          onPrimaryClick={onPrimaryClick}
          community1="/community-1@2x.png"
        />
      </section>
      <FrameComponent7
        onPrimaryClick={onPrimaryClick}
        propHeight="unset"
        propPadding="unset"
        image="/image1@2x.png"
        image="/image-18@2x.png"
        title="Coping with Anxiety"
        title="Mental Health Advocacy"
        subtitle="Learn techniques to manage your anxiety effectively."
        subtitle="Empower yourself through mental health advocacy initiatives."
        propHeight1="unset"
        propDisplay="unset"
      />
      <section className={styles.detection}>
        <FrameComponent2 />
      </section>
      <div className={styles.homepageItem} />
      <div className={styles.homepageInner} />
      <section className={styles.posts}>
        <div className={styles.trackerContent}>
          <Post image5="/image-5@2x.png" />
          <div className={styles.trackDescriptionWrapper}>
            <div className={styles.trackDescription}>
              <div className={styles.frameParent}>
                <div className={styles.trackYourMoodWrapper}>
                  <h1 className={styles.trackYourMood}>Track Your Mood</h1>
                </div>
                <div className={styles.keepTheTrack}>
                  Keep the track of your daily mood using our mood tracker.
                </div>
              </div>
              <div className={styles.exploreButton}>
                <button className={styles.primary} onClick={onPrimaryClick}>
                  <div className={styles.title}>Get Started</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className={styles.eventsContainer}>
        <div className={styles.eventsContainerChild} />
        <div className={styles.chatbotContent}>
          <h1 className={styles.talkToOur}>Talk to our Chatbot KAI</h1>
          <div className={styles.labelText}>KAI your personal bot</div>
        </div>
        <div className={styles.chatbotContent1}>
          <div className={styles.aFriendlyBot}>
            A friendly bot to answer your any question
          </div>
          <div className={styles.primaryWrapper}>
            <button className={styles.primary1} onClick={onPrimaryClick}>
              <div className={styles.title1}>Chat Now</div>
            </button>
          </div>
        </div>
        <img
          className={styles.chatbotArtificialIntelligencIcon}
          loading="lazy"
          alt=""
          src="/chatbotartificialintelligenceabstractconceptillustrationartificialintelligencechatbotserviceinteractivesupportmachinelearningnaturallanguageprocessing-1@2x.png"
        />
      </footer>
    </div>
  );
};

export default Homepage;

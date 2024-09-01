import { useCallback } from "react";
import FrameComponent8 from "../components/FrameComponent8";
import FrameComponent10 from "../components/FrameComponent10";
import FrameComponent11 from "../components/FrameComponent11";
import Row1 from "../components/Row1";
import EventItem from "../components/EventItem";
import Post from "../components/Post";
import { useNavigate } from "react-router-dom";
import styles from "./HomepageAfterSignUpOrLogi.module.css";

const HomepageAfterSignUpOrLogi = () => {
  const navigate = useNavigate();

  const onPrimaryClick = useCallback(() => {
    navigate("/mood-tracker-case-1");
  }, [navigate]);

  return (
    <div className={styles.homepageAfterSignUpOrLogi}>
      <div className={styles.homepageAfterSignUpOrLogiChild} />
      <FrameComponent8 />
      <FrameComponent10 image1="/image-17@2x.png" />
      <section className={styles.homepageAfterSignUpOrLogiInner}>
        <FrameComponent11 community1="/community-1@2x.png" />
      </section>
      <section className={styles.predictionContent}>
        <div className={styles.articlesContent}>
          <div className={styles.rowParent}>
            <Row1
              image="/image1@2x.png"
              title="Coping with Anxiety"
              subtitle="Learn techniques to manage your anxiety effectively."
            />
            <Row1
              propHeight="unset"
              propPadding="unset"
              image="/image-18@2x.png"
              title="Mental Health Advocacy"
              subtitle="Empower yourself through mental health advocacy initiatives."
              propHeight1="unset"
              propDisplay="unset"
            />
          </div>
          <div className={styles.articlesContentInner}>
            <div className={styles.latestArticlesResourcesParent}>
              <h1
                className={styles.latestArticles}
              >{`Latest Articles & Resources`}</h1>
              <button className={styles.primary}>
                <a className={styles.title}>Read More</a>
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.diseasePrediction}>
        <EventItem
          upcomingEvents="Disease Prediction"
          asset21="/asset-2-1@2x.png"
        />
      </section>
      <section className={styles.blog}>
        <div className={styles.trackerContent}>
          <Post image5="/image-5@2x.png" />
          <div className={styles.trackerDescriptionWrapper}>
            <div className={styles.trackerDescription}>
              <div className={styles.frameParent}>
                <div className={styles.trackYourMoodWrapper}>
                  <h1 className={styles.trackYourMood}>Track Your Mood</h1>
                </div>
                <div className={styles.keepTheTrack}>
                  Keep the track of your daily mood using our mood tracker.
                </div>
              </div>
              <div className={styles.primaryWrapper}>
                <button
                  className={styles.primary1}
                  data-scroll-to="primary"
                  onClick={onPrimaryClick}
                >
                  <div className={styles.title1}>Get Started</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className={styles.rectangleParent}>
        <div className={styles.frameChild} />
        <div className={styles.chatbotHeader}>
          <h1 className={styles.talkToOur}>Talk to our Chatbot KAI</h1>
          <div className={styles.labelText}>KAI your personal bot</div>
        </div>
        <div className={styles.aFriendlyBotToAnswerYourParent}>
          <div className={styles.aFriendlyBot}>
            A friendly bot to answer your any question
          </div>
          <div className={styles.diseasePredictionTitleConta}>
            <button className={styles.primary2}>
              <div className={styles.title2}>Chat Now</div>
            </button>
          </div>
        </div>
        <img
          className={styles.chatbotArtificialIntelligencIcon}
          loading="lazy"
          alt=""
          src="/chatbotartificialintelligenceabstractconceptillustrationartificialintelligencechatbotserviceinteractivesupportmachinelearningnaturallanguageprocessing-11@2x.png"
        />
      </footer>
    </div>
  );
};

export default HomepageAfterSignUpOrLogi;

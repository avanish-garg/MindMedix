import { useMemo, useCallback } from "react";
import Row from "./Row";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./FrameComponent7.module.css";

const FrameComponent7 = ({
  className = "",
  onPrimaryClick,
  articlesHeaderPosition,
  articlesHeaderAlignSelf,
  propHeight,
  propPadding,
  image,
  title,
  subtitle,
  propHeight1,
  propDisplay,
  frameSectionWidth,
}) => {
  const primaryButtonStyle = useMemo(() => {
    return {
      position: articlesHeaderPosition,
      alignSelf: articlesHeaderAlignSelf,
      width: frameSectionWidth,
    };
  }, [articlesHeaderPosition, articlesHeaderAlignSelf, frameSectionWidth]);

  const navigate = useNavigate();

  const onPrimaryClick1 = useCallback(() => {
    navigate("/login-page");
  }, [navigate]);

  return (
    <section
      className={[styles.primaryButton, className].join(" ")}
      style={primaryButtonStyle}
    >
      <div className={styles.articlesContent}>
        <div className={styles.articleList}>
          <Row
            propHeight={propHeight}
            propPadding={propPadding}
            image={image}
            title={title}
            subtitle={subtitle}
            propHeight1={propHeight1}
            propDisplay={propDisplay}
          />
          <Row
            propHeight={propHeight}
            propPadding={propPadding}
            image={image}
            title={title}
            subtitle={subtitle}
            propHeight1={propHeight1}
            propDisplay={propDisplay}
          />
        </div>
        <div className={styles.primaryTitle}>
          <div className={styles.articleLayout}>
            <h1
              className={styles.latestArticles}
            >{`Latest Articles & Resources`}</h1>
            <button className={styles.primary} onClick={onPrimaryClick}>
              <div className={styles.title}>Read More</div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

FrameComponent7.propTypes = {
  className: PropTypes.string,
  propHeight: PropTypes.string,
  propPadding: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  propHeight1: PropTypes.string,
  propDisplay: PropTypes.string,

  /** Style props */
  articlesHeaderPosition: PropTypes.any,
  articlesHeaderAlignSelf: PropTypes.any,
  frameSectionWidth: PropTypes.any,

  /** Action props */
  onPrimaryClick: PropTypes.func,
};

export default FrameComponent7;

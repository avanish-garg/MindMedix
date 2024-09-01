import { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./Row.module.css";

const Row = ({
  className = "",
  propHeight,
  propPadding,
  image,
  title,
  subtitle,
  propHeight1,
  propDisplay,
}) => {
  const rowStyle = useMemo(() => {
    return {
      height: propHeight,
      padding: propPadding,
    };
  }, [propHeight, propPadding]);

  const subtitleStyle = useMemo(() => {
    return {
      height: propHeight1,
      display: propDisplay,
    };
  }, [propHeight1, propDisplay]);

  return (
    <div className={[styles.row, className].join(" ")} style={rowStyle}>
      <div className={styles.article}>
        <div className={styles.imageContainer}>
          <img className={styles.imageIcon} loading="lazy" alt="" src={image} />
        </div>
        <div className={styles.titleSubtitles}>
          <div className={styles.title}>{title}</div>
          <div className={styles.subtitle} style={subtitleStyle}>
            {subtitle}
          </div>
        </div>
      </div>
    </div>
  );
};

Row.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,

  /** Style props */
  propHeight: PropTypes.any,
  propPadding: PropTypes.any,
  propHeight1: PropTypes.any,
  propDisplay: PropTypes.any,
};

export default Row;

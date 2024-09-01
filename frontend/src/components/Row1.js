import { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./Row1.module.css";

const Row1 = ({
  className = "",
  propHeight,
  propPadding,
  image,
  title,
  subtitle,
  propHeight1,
  propDisplay,
}) => {
  const row1Style = useMemo(() => {
    return {
      height: propHeight,
      padding: propPadding,
    };
  }, [propHeight, propPadding]);

  const subtitle1Style = useMemo(() => {
    return {
      height: propHeight1,
      display: propDisplay,
    };
  }, [propHeight1, propDisplay]);

  return (
    <div className={[styles.row, className].join(" ")} style={row1Style}>
      <div className={styles.article}>
        <div className={styles.imageContainer}>
          <img className={styles.imageIcon} loading="lazy" alt="" src={image} />
        </div>
        <div className={styles.titleParent}>
          <div className={styles.title}>{title}</div>
          <div className={styles.subtitle} style={subtitle1Style}>
            {subtitle}
          </div>
        </div>
      </div>
    </div>
  );
};

Row1.propTypes = {
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

export default Row1;

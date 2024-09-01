import PropTypes from "prop-types";
import styles from "./Post.module.css";

const Post = ({ className = "", image5 }) => {
  return (
    <div className={[styles.post, className].join(" ")}>
      <div className={styles.imageContainer}>
        <div className={styles.image}>
          <div className={styles.title}>Mood tracker</div>
          <div className={styles.pagination}>
            <div className={styles.pagination1}>
              <div className={styles.pages} />
              <div className={styles.pages1} />
              <div className={styles.pages1} />
              <div className={styles.pages1} />
            </div>
          </div>
          <img
            className={styles.image5Icon}
            loading="lazy"
            alt=""
            src={image5}
          />
        </div>
      </div>
      <div className={styles.textContent}>
        <div className={styles.title1}>Sharing my daily reflections.</div>
        <div className={styles.selection}>
          <div className={styles.labelNormal}>
            <div className={styles.labelText}>Self-Care</div>
          </div>
        </div>
        <div className={styles.avatar}>
          <img
            className={styles.avatarIcon}
            loading="lazy"
            alt=""
            src="/avatar1@2x.png"
          />
          <div className={styles.titleWrapper}>
            <div className={styles.title2}>Akshat :)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  className: PropTypes.string,
  image5: PropTypes.string,
};

export default Post;

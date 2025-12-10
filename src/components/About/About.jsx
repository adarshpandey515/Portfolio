import React from "react";

import styles from "./About.module.css";
import { getImageUrl } from "../../utils";

export const About = () => {
  return (
    <section className={styles.container} id="about">
      <h2 className={styles.title}>About</h2>
      <div className={styles.content}>
        <img
          src={getImageUrl("about/aboutImage.png")}
          alt="Me sitting with a laptop"
          className={styles.aboutImage}
        />
        <ul className={styles.aboutItems}>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/cursorIcon.png")} alt="AI/ML icon" />
            <div className={styles.aboutItemText}>
              <h3>AI/ML Engineer</h3>
              <p>
                I train  and design machine learning models .I've built classifiers, regressors, and vision models.
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/serverIcon.png")} alt="Web icon" />
            <div className={styles.aboutItemText}>
              <h3>Web Developer</h3>
              <p> 
                I’ve built several full‑stack apps with  and APIs with friends, working on both front‑end and back‑end.
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/cursorIcon.png")} alt="Robotics icon" />
            <div className={styles.aboutItemText}>
              <h3>Robotics Learner</h3>
              <p>
                I’ve worked on autonomous vehicle projects and worked in perception, planning, and control.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

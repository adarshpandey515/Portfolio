import React from "react";
import ThreeScene from "./ThreeScene";
import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

export const Hero = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content} style={{ flex:1, paddingTop: "140px" }}>
        <h1 style={{ fontSize: "70px" }}>
          Hi, I'm <span style={{ color: "#F4F754" }}>Adarsh</span>
        </h1>
        <br />
        <p className={styles.description}>
          I’m a Web, ML, and Robotics Learner.
          <br />
          Building,and having fun with cool tech.
          <br />
          Reach out if you'd like to learn more!
        </p>
        <a href="mailto:pandeyadarsh515@gmail.com" className={styles.contactBtn}>
          <div>Contact Me</div>
        </a>
      </div>
      <div style={{ flex: 1, width: "100%", height: "100%", position: "relative", overflow: "visible", zIndex: 5 }}>
        <ThreeScene />
      </div>
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};

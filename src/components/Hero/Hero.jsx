import React from "react";
import ThreeScene from "./ThreeScene";
import styles from "./Hero.module.css";
import resumePdf from "../../data/dec15.pdf";

export const Hero = () => {
  const [showResume, setShowResume] = React.useState(false);
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
        <div style={{display: "flex", flexDirection: "row", gap: "20px", marginTop: "20px"}}>

        <a href="mailto:pandeyadarsh515@gmail.com" className={styles.contactBtn}>
          <div>Contact Me</div>
        </a>
        <br></br>
        <button className={styles.contactBtn} onClick={() => setShowResume(true)}>
          <div>View Resume</div>
        </button>
        </div>
      </div>
      <div style={{ flex: 1, width: "100%", height: "100%", position: "relative", overflow: "visible", zIndex: 5 }}>
        <ThreeScene />
      </div>
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />

      {showResume && (
        <div className={styles.modalOverlay} style={{zIndex:50}} onClick={() => setShowResume(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 style={{ margin: 0 }}>Resume</h3>
              <button
                className={styles.iconButton}
                aria-label="Close"
                onClick={() => setShowResume(false)}
              >
                ✕
              </button>
            </div>
            <div className={styles.modalBody}>
              <iframe
                className={styles.pdfFrame}
                src={resumePdf}
                title="Resume PDF"
              />
            </div>
            <div className={styles.modalActions}>
              <a href={resumePdf} download className={styles.contactBtn}>
                <div>Download PDF</div>
              </a>
              <button className={styles.secondaryBtn} onClick={() => setShowResume(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

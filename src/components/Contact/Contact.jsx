import React from "react";

import styles from "./Contact.module.css";
import { getImageUrl } from "../../utils";

export const Contact = () => {
  return (
    <footer id="contact" className={styles.container}>
      <div className={styles.text}>
        <h2>Contact</h2>
        <p>Feel free to reach out!</p>
      </div>
      <div className={styles.linksContainer}>
      <ul className={styles.links} >
        <li className={styles.link}>
          <img src={getImageUrl("contact/phone.png")} alt="Phone icon" />
          <a href="tel:+919004353415">+91 9004353415</a>
        </li>
        <li className={styles.link}>
          <img src={getImageUrl("contact/emailIcon.png")} alt="Email icon" />
          <a href="mailto:pandeyadarsh515@gmail.com">pandeyadarsh515@gmail.com</a>
        </li>
        <li className={styles.link}>
          <img
            src={getImageUrl("contact/linkedinIcon.png")}
            alt="LinkedIn icon"
          />
          <a href="https://www.linkedin.com/in/adarsh-pandey-9083a9249/">linkedin.com/in/adarsh-pandey-9083a9249/</a>
        </li>
        <li className={styles.link}>
          <img src={getImageUrl("contact/githubIcon.png")} alt="Github icon" />
          <a href="https://github.com/adarshpandey515/">github.com/adarshpandey515</a>
        </li>
      </ul>

      </div>
    </footer>
  );
};

import React, { useRef } from "react";

import styles from "./Projects.module.css";

import projects from "../../data/projects.json";
import { ProjectCard } from "./ProjectCard";

export const Projects = () => {
  const rowRef = useRef(null);

  const scrollByCards = (dir) => {
    const cardWidth = 345 + 15; // width + gap
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: dir * cardWidth * 3, behavior: "smooth" });
    }
  };

  return (
    <section className={styles.container} id="projects">
      <h2 className={styles.title}>Projects</h2>
      <div className={styles.sliderRow}>
        <button className={styles.navButton} onClick={() => scrollByCards(-1)}>
          ◀
        </button>
        <div className={styles.viewport}>
          <div className={styles.projects} ref={rowRef}>
            {projects.map((project, id) => {
              return <ProjectCard key={id} project={project} />;
            })}
          </div>
        </div>
        <button className={styles.navButton} onClick={() => scrollByCards(1)}>
          ▶
        </button>
      </div>
    </section>
  );
};

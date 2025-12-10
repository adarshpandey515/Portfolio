import React from "react";
import styles from "./Achievements.module.css";
import achievements from "../../data/achievements.json";
import { getImageUrl } from "../../utils";

export const Achievements = () => {
  const [modal, setModal] = React.useState({ open: false, src: "", title: "" });

  const openModal = (src, title) => setModal({ open: true, src, title });
  const closeModal = () => setModal({ open: false, src: "", title: "" });
  return (
    <section className={styles.container} id="achievements">
      <h2 className={styles.title}>Achievements</h2>
      <div className={styles.grid}>
        {achievements.map((item, idx) => (
          <div key={idx} className={styles.card}>
            <img
              src={getImageUrl(item.imageSrc)}
              alt={`${item.title} image`}
              className={styles.image}
              onClick={() => openModal(item.imageSrc, item.title)}
              style={{ cursor: "pointer" }}
            />
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <ul className={styles.lines}>
              {item.lines && item.lines.length > 0 ? (
                item.lines.slice(0, 2).map((line, i) => (
                  <li key={i} className={styles.line}>{line}</li>
                ))
              ) : (
                <>
                  <li className={styles.line}>Details coming soon</li>
                  <li className={styles.line}>Stay tuned</li>
                </>
              )}
            </ul>
          </div>
        ))}
      </div>
      {modal.open && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#132a53",
              padding: 16,
              borderRadius: 10,
              boxShadow: "0 16px 14px 0 #04152d",
              maxWidth: "90vw",
              maxHeight: "90vh",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ color: "#fff" }}>{modal.title}</h3>
              <button onClick={closeModal} style={{ background: "#576cbc", color: "#fff", border: "none", borderRadius: 6, padding: "6px 10px", cursor: "pointer" }}>X</button>
            </div>
            <img
              src={getImageUrl(modal.src)}
              alt={modal.title}
              style={{ width: "80vw", maxWidth: 900, height: "70vh", objectFit: "contain", marginTop: 12 }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

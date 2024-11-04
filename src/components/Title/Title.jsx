import styles from "./Title.module.css";

export default function Title() {
  return (
    <div className={styles.titleContainer}>
      <h2>Made by Paweł Kozłowski</h2>
      <div className={styles.icons}>
        <a
          className={styles.link}
          href="https://github.com/sinet77"
          target="_blank"
          aria-label="GitHub"
        >
          Github
        </a>
        <a
          className={styles.link}
          href="https://www.linkedin.com/in/pawe%C5%82-koz%C5%82owski-69b29521b/"
          target="_blank"
          aria-label="LinkedIn"
        >
          Linkedin
        </a>
      </div>
    </div>
  );
}

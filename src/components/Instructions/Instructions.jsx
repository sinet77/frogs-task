import styles from "./Instructions.module.css";

export default function Instructions() {
  return (
    <div className={styles.criteria}>
      <h3 className={styles.title}>Instructions:</h3>
      <ul>
        <li>
          Each frog can jump on an empty field (select the frog, the empty
          field, and click the jump button).
        </li>
        <li>
          A <span className={styles.male}>male</span> frog can jump up to 3
          fields (including diagonally).
        </li>
        <li>
          A <span className={styles.female}>female</span> frog can jump up to 2
          fields (including diagonally).
        </li>
        <li>
          Each frog has two characteristics (an array of two elements: tall,
          short, fat, or slim).
        </li>
        <li>
          Two frogs of different genders, when adjacent, can reproduce (select
          one <span className={styles.male}>male</span> frog and one{" "}
          <span className={styles.female}>female</span> frog, then click the
          reproduce button).
        </li>
      </ul>
    </div>
  );
}

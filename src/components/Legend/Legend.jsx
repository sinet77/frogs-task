import { red_frog, blue_frog } from "../../assets/AppImages";
import Instructions from "../Instructions/Instructions";
import styles from "./Legend.module.css";

export default function Legend() {
  return (
    <div className={styles.legendAndInstructions}>
      <div className={styles.legendTogether}>
        <h3 className={styles.title}>Legend</h3>
        <div className={styles.frogs}>
          <div className={styles.frog}>
            <img className={styles.frog} src={blue_frog} alt="Blue frog" />
            <h4 className={styles.gender}>
              Frog <span className={styles.male}>male</span>
            </h4>
          </div>
          <div className={styles.frog}>
            <img className={styles.frog} src={red_frog} alt="Red frog" />
            <h4 className={styles.gender}>
              Frog <span className={styles.female}>female</span>
            </h4>
          </div>
        </div>
      </div>
      <Instructions />
    </div>
  );
}

import FormCar from "./FormCar";
import TableCar from "./TableCar";
import styles from "./Cars.module.css";
import Cars from "./Cars";

export default function CarsPage() {
  return (
    <div className={styles.items}>
      <div className={styles.main_form}>
        <div className={styles.container}>
          <Cars />
        </div>
      </div>
    </div>
  );
}

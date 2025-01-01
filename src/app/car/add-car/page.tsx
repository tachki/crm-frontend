import FormCar from "./FormCar";
import TableCar from "./TableCar";
import styles from "./Cars.module.css";

export default function CarsPage() {
  return (
    <div className={styles.items}>
      <div className={styles.main_form}>
        <div className={styles.container}>
          <FormCar />
          <TableCar />
        </div>
      </div>
    </div>
  );
}

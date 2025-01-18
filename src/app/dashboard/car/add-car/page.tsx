import FormCar from "./FormCar";
import TableCar from "./TableCar";
import styles from "./Cars.module.css";
import Cars from "./Cars";

export default function CarsPage() {
  return (
    <div className={`flex justify-between items-center m-6 mb-9`} >
      <Cars />
    </div>
  );
}

'use client'

import React from 'react'
import styles from "./Cars.module.css";

const TableCar = () => {
  return (
    <div className={styles.contentTop}>
      <label>Техосмотр</label>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Документ</th>
            <th>Год</th>
            <th>Стоимость</th>
          </tr>
        </thead>
        <tbody>
          {/* Прописать вызов к бэку */}
          {/* предусмотреть что в таблице должна быть хоть одна строчка */}
          <tr>
            <td>Машина</td>
            <td>2024</td>
            <td>3000</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TableCar
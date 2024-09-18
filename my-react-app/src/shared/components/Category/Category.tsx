
import styles from './Category.module.css'

const categories = ["Traditional", "Asiatic", "Burger", "Kebab", "Cafea"];

export const CategoryList = () => (
  <section className={styles.categories}>
    <div className={styles.categoryList}>
     {categories.map((category, index) => (
      <div key={index} className={styles.categoryItem}>{category}</div>
      ))}
    </div>
  </section>
);




const categories = ["Traditional", "Asiatic", "Burger", "Kebab", "Cafea"];

export const CategoryList = () => (
  <div className="category-list">
    {categories.map((category, index) => (
      <div key={index} className="category-item">{category}</div>
    ))}
  </div>
);

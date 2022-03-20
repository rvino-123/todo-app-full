import React from "react";

function CategorySelectItem({ category, isActive, onClick, id }) {
  const { color, name } = category.data;
  return (
    <div
      onClick={onClick}
      className={`category-select-item ${
        isActive ? "active-select-item" : ""
      } `}
      id={id}
    >
      <span id={id}>{name}</span>
      <div
        className="category-color category-color-table-display"
        style={{ backgroundColor: `${color}` }}
        id={id}
      ></div>
    </div>
  );
}

export default CategorySelectItem;

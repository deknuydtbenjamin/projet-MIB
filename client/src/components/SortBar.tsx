import "./SortBar.css";
import { useState } from "react";

export default function SortBar({
  categories,
  setCurrentCategory,
}: {
  categories: string[];
  setCurrentCategory: (v: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = (value: string) => setCurrentCategory(value);
  const handleclickMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickFavorites = () => {
    setCurrentCategory("favorites");
  };

  return (
    <section className="sortBar">
      <div className="burger openNav">
        <button type="button" className="btnBurger" onClick={handleclickMenu}>
          <span className={`burgerNav ${isOpen ? "open" : ""}`}> </span>
        </button>
      </div>
      <div className={`sortButtons ${isOpen ? "openNav" : ""}`}>
        <button
          type="button"
          onClick={() => handleClick("")}
          className="buttons"
        >
          Tous les articles
        </button>
        {categories.map((c) => (
          <button
            type="button"
            key={c}
            onClick={() => handleClick(c)}
            className="buttons"
          >
            {c}
          </button>
        ))}
        <button
          type="button"
          onClick={handleClickFavorites}
          className="buttons"
        >
          Tous les favoris
        </button>
      </div>
    </section>
  );
}

import { NavLink } from "react-router-dom";

import { useCallback, useEffect, useState } from "react";

import logo from "../assets/images/logoMIBNews.webp";

const collectFavorites = () => {
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : ([] as string[]);
};
export default function Header() {
  const [favoriteCount, setFavoriteCount] = useState<number>(0);

  const updateFavoriteCount = useCallback(() => {
    const favorites = collectFavorites();
    setFavoriteCount(favorites.length);
  }, []);

  useEffect(() => {
    const localStorageChange = (event: StorageEvent) => {
      if (event.key === "favorites") {
        updateFavoriteCount();
      }
    };

    window.addEventListener("storage", localStorageChange);
  }, [updateFavoriteCount]);

  return (
    <header>
      <NavLink to="/" reloadDocument>
        <img src={logo} alt="logo MIB News" className="logo" />
      </NavLink>

      <div className="titlebtn">
        <h1>M.I.B News</h1>
        <button type="button" className="favoris">
          ❤️Favoris: {favoriteCount}
        </button>
      </div>
    </header>
  );
}

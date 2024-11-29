import "./Article.css";
import { useEffect, useState } from "react";
import art from "../assets/images/artimg.webp";
import lifeStyle from "../assets/images/lifestyle.webp";
import News from "../assets/images/newsimg.webp";
import opinion from "../assets/images/opinionimg.webp";
import sport from "../assets/images/sportimg.webp";
import type { ArticleType } from "../lib/definitions";

const collectFavorites = () => {
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : ([] as string[]);
};

const categoryImages: { [key: string]: string } = {
  News: News,
  Sport: sport,
  Lifestyle: lifeStyle,
  Opinion: opinion,
  Arts: art,
};

const Article = ({
  id,
  webTitle,
  webUrl,
  pillarName,
  modifyFavorites,
}: ArticleType & { modifyFavorites: () => void }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const updateFavorites = (updatedFavorites: string[]) => {
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(updatedFavorites.includes(id));

    const event = new StorageEvent("storage", {
      key: "favorites",
      newValue: JSON.stringify(updatedFavorites),
    });
    window.dispatchEvent(event);
  };

  useEffect(() => {
    const favorites = collectFavorites();
    setIsFavorite(favorites.includes(id));
  }, [id]);

  const toggleFavorite = (id: string) => {
    const favorites = collectFavorites();
    if (isFavorite) {
      const newFavorites = favorites.filter((favId: string) => favId !== id);
      updateFavorites(newFavorites);
    } else {
      updateFavorites([...favorites, id]);
    }
    modifyFavorites();
  };

  const articleImage = categoryImages[pillarName];

  return (
    <section className="article-card" key={id}>
      <div className="contenu">
        <img src={articleImage} alt={webTitle} className="article-image" />
        <h3>{webTitle}</h3>
      </div>
      <a
        href={webUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="lirePlus"
      >
        Lire l'article
      </a>
      <button
        className="favorite-button"
        type="button"
        onClick={() => toggleFavorite(id)}
      >
        {isFavorite ? "❤️" : "🖤"}
      </button>
    </section>
  );
};

export default Article;

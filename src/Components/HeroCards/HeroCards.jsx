import { useState } from "react";
import "./HeroCards.css";
import Modal from "../Modal/ModalCard";
import { FaStar } from "react-icons/fa";

const HeroCards = ({ heroes, favorites, handleFavoriteToggle }) => {
  const [selectedHero, setSelectedHero] = useState(null);

  const handleHeroClick = (hero) => {
    setSelectedHero(hero);
  };

  const isHeroFavorite = (hero) => {
    return favorites.some((favHero) => favHero.id === hero.id);
  };

  return (
    <div className="card">
      {heroes.map((hero) => (
        <div
          key={hero.id}
          className="img-name-container"
          onClick={() => handleHeroClick(hero)}
        >
          <img
            src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
            alt={hero.name}
          />
          <h3 className="card-name">{hero.name}</h3>
          <div
            className="favorite-icon"
            onClick={(e) => {
              e.stopPropagation();
              handleFavoriteToggle(hero);
            }}
          >
            {isHeroFavorite(hero) ? (
              <FaStar color="gold" />
            ) : (
              <FaStar color="gray" />
            )}
          </div>
        </div>
      ))}
      {selectedHero && (
        <Modal hero={selectedHero} onClose={() => setSelectedHero(null)} />
      )}
    </div>
  );
};

export default HeroCards;

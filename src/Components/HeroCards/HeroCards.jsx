import { useState } from "react";
import "./HeroCards.css";
import Modal from "../Modal/ModalCard";

const HeroCards = ({ heroes }) => {
  const [selectedHero, setSelectedHero] = useState(null);

  const handleHeroClick = (hero) => {
    setSelectedHero(hero);
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
        </div>
      ))}
      {selectedHero && (
        <Modal hero={selectedHero} onClose={() => setSelectedHero(null)} />
      )}
    </div>
  );
};

export default HeroCards;

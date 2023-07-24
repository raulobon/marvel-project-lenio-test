import { useState, useEffect, useRef } from "react";
import "./ModalCard.css";

const ModalCard = ({ hero, onClose }) => {
  const modalRef = useRef(null);
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchComics();
  }, []);

  const fetchComics = async () => {
    try {
      const response = await fetch(
        `https://gateway.marvel.com/v1/public/characters/${
          hero.id
        }/comics?apikey=${import.meta.env.VITE_MARVEL_APIKEY}`
      );
      const data = await response.json();

      console.log("API Response:", data);

      if (data.data && data.data.results) {
        setComics(data.data.results);
        setLoading(false);
      } else {
        setError("Failed to fetch comics.");
        setLoading(false);
      }
    } catch (error) {
      setError("Error fetching comics.");
      setLoading(false);
      console.error("Error fetching comics:", error);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    const originalOverflow = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (!hero || !hero.id) {
    return null;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="modal">
      <div className="modal-content" ref={modalRef}>
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{hero.name} Comics</h2>
        <div className="comic-list">
          {comics.map((comic) => (
            <div key={comic.id} className="comic-item">
              <img
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt={comic.title}
                className="comic-image"
              />
              <div className="comic-details">
                <h3 className="comic-title">{comic.title}</h3>
                {comic.description ? (
                  <p className="comic-description">{comic.description}</p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalCard;

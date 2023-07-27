import { useState, useEffect } from "react";
import SearchBar from "./Components/SearchBar/SearchBar";
import HeroCards from "./Components/HeroCards/HeroCards";
import { getRandomInt } from "./utils/getRandomInt";
import ComicData from "./Components/ComicData/ComicData";
import debounce from "./utils/debounce";

const App = () => {
  const [hero, setHero] = useState([]);
  const [pastedComicData, setPastedComicData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    fetchHeroes();
    loadFavorites();
  }, []);

  const handleShowFavorites = () => {
    setShowFavorites((prevShowFavorites) => !prevShowFavorites);
    setHero([]);
  };

  const handleFavoriteToggle = (hero) => {
    if (favorites.find((favHero) => favHero.id === hero.id)) {
      const updatedFavorites = favorites.filter(
        (favHero) => favHero.id !== hero.id
      );
      setFavorites(updatedFavorites);
    } else {
      setFavorites([...favorites, hero]);
    }
  };

  const fetchHeroes = async () => {
    try {
      const response = await fetch(
        `https://gateway.marvel.com/v1/public/characters?orderBy=modified&apikey=${
          import.meta.env.VITE_MARVEL_APIKEY
        }&limit=8&offset=${getRandomInt(0, 1562)}`
      );
      const data = await response.json();
      setHero(data.data.results);
    } catch (error) {
      console.error("Error fetching heroes:", error);
    }
  };

  //debounce implementation
  const handleSearch = debounce(async (searchTerm) => {
    if (searchTerm) {
      try {
        const response = await fetch(
          `https://gateway.marvel.com/v1/public/characters?apikey=${
            import.meta.env.VITE_MARVEL_APIKEY
          }&nameStartsWith=${searchTerm}&limit=8`
        );
        const data = await response.json();
        setHero(data.data.results);
      } catch (error) {
        console.error("Error searching heroes:", error);
      }
    } else {
      fetchHeroes();
    }
  }, 5000);
  const loadFavorites = () => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (savedFavorites) {
      setFavorites(savedFavorites);
    }
  };

  return (
    <div className="page-container">
      <SearchBar
        onSearch={handleSearch}
        setPastedComicData={setPastedComicData}
        handleShowFavorites={handleShowFavorites}
        favorites={favorites}
      />
      <ComicData comicData={pastedComicData} />
      {showFavorites && favorites.length > 0 ? (
        <HeroCards
          heroes={favorites}
          favorites={favorites}
          handleFavoriteToggle={handleFavoriteToggle}
        />
      ) : (
        <HeroCards
          heroes={hero}
          favorites={favorites}
          handleFavoriteToggle={handleFavoriteToggle}
        />
      )}
    </div>
  );
};

export default App;

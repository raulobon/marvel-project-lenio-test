import { useState, useEffect } from "react";
import SearchBar from "./Components/SearchBar/SearchBar";
import HeroCards from "./Components/HeroCards/HeroCards";
import { getRandomInt } from "./utils/getRandomInt";
import ComicData from "./Components/ComicData/ComicData";

const App = () => {
  const [hero, setHero] = useState([]);
  const [pastedComicData, setPastedComicData] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchHeroes();
    loadFavorites();
  }, []);

  const handleShowFavorites = () => {
    // If the search input is empty, show all heroes; otherwise, show favorites
    if (favorites.length === 0) {
      fetchHeroes();
    } else {
      setHero(favorites);
    }
  };

  const handleFavoriteToggle = (hero) => {
    if (favorites.find((favHero) => favHero.id === hero.id)) {
      // Remove the hero from favorites if it's already there
      const updatedFavorites = favorites.filter(
        (favHero) => favHero.id !== hero.id
      );
      setFavorites(updatedFavorites);
    } else {
      // Add the hero to favorites
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

  const handleSearch = async (searchTerm) => {
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
  };

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
        onShowFavorites={handleShowFavorites} // Pass the handleShowFavorites function to SearchBar
        favorites={favorites}
      />
      <ComicData comicData={pastedComicData} />
      <HeroCards
        heroes={hero}
        favorites={favorites}
        handleFavoriteToggle={handleFavoriteToggle} // Pass the handleFavoriteToggle function to HeroCards
      />
    </div>
  );
};

export default App;

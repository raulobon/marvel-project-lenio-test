import { useState, useEffect } from "react";
import SearchBar from "./Components/SearchBar/SearchBar";
import HeroCards from "./Components/HeroCards/HeroCards";
import { getRandomInt } from "./utils/getRandomInt";
import ComicData from "./Components/ComicData/ComicData";

const App = () => {
  const [hero, setHero] = useState([]);
  const [pastedComicData, setPastedComicData] = useState(null);

  useEffect(() => {
    fetchHeroes();
  }, []);

  const fetchHeroes = async () => {
    try {
      const response = await fetch(
        `https://gateway.marvel.com/v1/public/characters?orderBy=modified&apikey=${
          import.meta.env.VITE_MARVEL_APIKEY
        }&limit=8&offset=${getRandomInt(0, 1562)}}`
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

  return (
    <div className="page-container">
      <SearchBar
        onSearch={handleSearch}
        setPastedComicData={setPastedComicData}
      />
      <ComicData comicData={pastedComicData} />
      <HeroCards heroes={hero} />
    </div>
  );
};

export default App;

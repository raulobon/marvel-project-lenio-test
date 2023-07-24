import { useState, useEffect } from "react";
import "./SearchBar.css";
import { FaStar } from "react-icons/fa";
import marvelogo from "../../assets/Marvel_Logo.svg";

const SearchBar = ({
  onSearch,
  onShowFavorites,
  setPastedComicData,
  pastedComicData,
}) => {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    onSearch(e.target.value);

    if (isComicUrl(e.target.value)) {
      const comicId = extractComicIdFromUrl(e.target.value);
      if (comicId) {
        fetchComicData(comicId);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchText !== "") onSearch(searchText);
  };

  useEffect(() => {
    if (pastedComicData) {
      console.log("Pasted Comic Data:", pastedComicData);
    }
  }, [pastedComicData]);

  const isComicUrl = (url) => {
    return url.startsWith("https://www.marvel.com/comics/issue/");
  };

  const extractComicIdFromUrl = (url) => {
    const parts = url.split("/");
    const comicIdIndex = parts.indexOf("issue") + 1;
    if (comicIdIndex > 0 && comicIdIndex < parts.length) {
      return parts[comicIdIndex];
    }
    return null;
  };

  const fetchComicData = (comicId) => {
    console.log("Fetching comic data...");
    fetch(
      `https://gateway.marvel.com/v1/public/comics/${comicId}?apikey=${
        import.meta.env.VITE_MARVEL_APIKEY
      }`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Comic Data:", data);
        setPastedComicData(data.data.results[0]);
      })
      .catch((error) => {
        console.error("Error fetching comic data:", error);
      });
  };

  return (
    <div className="search-bar">
      <img src={marvelogo} className="logo" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Buscar"
          value={searchText}
          onChange={handleInputChange}
        />
      </form>
      <div className="favorites-icon">
        <FaStar onClick={onShowFavorites} />
      </div>
    </div>
  );
};

export default SearchBar;

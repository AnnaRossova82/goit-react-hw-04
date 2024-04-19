import { fetchImages } from "../images-api.js";
import css from "./App.module.css";
import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import { useEffect, useState } from "react";

export default function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (query === "") {
      return;
    }

    async function fetchImageData() {
      try {
        setError(false);
        setIsLoading(true);
        const data = await fetchImages(query, page);
        setImages((prevImages) => {
          return [...prevImages, ...data];
        });
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchImageData();
  }, [page, query]);

  return (
    <div className={css.container}>
              <button onClick={handleLoadMore}>Load more images</button>

      <SearchBar onSearch={handleSearch} />

      {error && <b>There was an error! Please reload the page!</b>}

      {images.length > 0 && <ImageGallery items={images} />}

      {isLoading && <b>Please wait, loading images...</b>}
      {images.length > 0 && !isLoading && (
        <button onClick={handleLoadMore}>Load more images</button>
      )}
    </div>
  );
}
 
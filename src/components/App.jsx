import { useEffect, useState } from 'react';
import css from './App.module.css';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import { fetchImages } from '../images-api.js';

export default function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }

    async function fetchImageData() {
      setIsLoading(true);
      try {
        const data = await fetchImages(query, page);
        setImages((prevImages) => [...prevImages, ...data]);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchImageData();
  }, [page, query]);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSearch} />
      
      {error && <b>There was an error! Please reload the page!</b>}
      
      {images.length > 0 && (
        <ImageGallery 
          items={images} 
          openModal={openModal} 
          closeModal={closeModal} 
          selectedImage={selectedImage} 
        />
      )}
      
      {isLoading && <b>Please wait, loading images...</b>}
      
      {images.length > 0 && !isLoading && (
        <button onClick={handleLoadMore}>Load more images</button>
      )}
    </div>
  );
}
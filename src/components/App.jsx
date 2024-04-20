import { useEffect, useState, useRef } from 'react';
import css from './App.module.css';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import { fetchImages } from '../images-api.js';
import Loader from 'react-loader-spinner';

export default function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const btnRef = useRef();

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

  useEffect(() => {
    if (page > 1 && btnRef.current) {
      setTimeout(() => {
        btnRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 100); 
    }
  }, [page]);

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
      
      <ImageGallery 
        items={images} 
        openModal={openModal} 
        closeModal={closeModal} 
        selectedImage={selectedImage} 
      />
      
      {isLoading && (
        <div className={css.loader}>
           <Loader type="ThreeDots" color="#000" height={50} width={50} /> */
        </div>
      )}
      
      {images.length > 0 && !isLoading && (
        <button ref={btnRef} onClick={handleLoadMore}>Load more images</button>
      )}
    </div>
  );
}
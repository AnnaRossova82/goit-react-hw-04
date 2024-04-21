import { useEffect, useState, useRef } from 'react';
import css from './App.module.css';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import { fetchImages } from '../images-api.js';
import { Audio } from 'react-loader-spinner';
import ImageModal from './ImageModal/ImageModal.jsx';
import LoadMoreBtn from './LoadModeBtn/LoadMoreBtn.jsx'


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
      
      <ImageGallery items={images} openModal={openModal} />
      
      {isLoading && (
        <div>
          <Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="three-dots-loading"
            wrapperStyle
            wrapperClass
          />
        </div>
      )}
      
      {images.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}

      <ImageModal selectedImage={selectedImage} closeModal={closeModal} />
    </div>
  );
}
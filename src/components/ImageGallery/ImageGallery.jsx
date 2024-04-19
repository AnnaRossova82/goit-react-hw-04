const ImageGallery = ({ images }) => {
    return (
      <div>
        {images.length > 0 && (
          <ul>
            {images.map((image) => (
              <li key={image.id}>
                <div>
                  <img src={image.urls.regular} alt={image.alt_description} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default ImageGallery;
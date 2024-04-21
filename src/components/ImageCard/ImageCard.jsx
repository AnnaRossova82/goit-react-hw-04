/* const ImageCard = ({ image, openModal }) => {
    return (
      <div onClick={() => openModal(image)}>
        <img src={image.urls.small} alt={image.alt_description} />
      </div>
    );
  };
  
  export default ImageCard; */

  const ImageCard = ({ image, openModal }) => {
    return (
      <div><img
      src={image.urls.small}
      alt={image.alt_description}
      onClick={() => openModal(image)}
    />
    </div>
      
    );
  };
  
  export default ImageCard;
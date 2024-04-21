const ImageCard = ({ image, openModal }) => {
    return (
      <div onClick={() => openModal(image)}>
        <img src={image.urls.small} alt={image.alt_description} />
      </div>
    );
  };
  
  export default ImageCard;
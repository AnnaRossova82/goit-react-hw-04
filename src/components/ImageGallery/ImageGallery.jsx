const ImageGallery = ({ items }) => {
  return (
    <div>
      {items && items.length > 0 ? (
        <ul>
          {items.map((image) => (
            <li key={image.id}>
              <div key={image.objectID}>
                <img src={image.urls.small} alt={image.alt_description} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No images to display</p>
      )}
    </div>
  );
};

export default ImageGallery;
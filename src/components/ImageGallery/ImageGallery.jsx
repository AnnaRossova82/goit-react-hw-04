import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

const ImageGallery = ({ items, openModal }) => {
  return (
    <div>
      {items && items.length > 0 ? (
        <ul className={css.itemsList}>
          {items.map((image) => (
            <li className={css.imagesList} key={image.id}>
                <ImageCard image={image} openModal={openModal} />
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
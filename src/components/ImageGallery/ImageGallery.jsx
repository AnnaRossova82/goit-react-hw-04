import css from "./ImageGallery.module.css";
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const ImageGallery = ({ items, openModal, closeModal, selectedImage }) => {
  return (
    <div>
      {items && items.length > 0 ? (
        <ul className={css.itemsList}>
          {items.map((image) => (
            <li className={css.imagesList} key={image.id}>
              <div onClick={() => openModal(image)}>
                <img className={css.image} src={image.urls.small} alt={image.alt_description} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No images to display</p>
      )}

      {selectedImage && (
        <Modal className={css.modal}
          isOpen={true}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Image Modal"
        >
          <img src={selectedImage.urls.regular} alt={selectedImage.alt_description} style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </Modal>
      )}
    </div>
  );
};

export default ImageGallery;
import styles from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ image, onOpenModal }) {
  return (
    <li
      key={image.id}
      onClick={() => {
        onOpenModal(image);
      }}
      className={styles.ImageGalleryItem}
    >
      <img
        height={260}
        className={styles.ImageGalleryItem__image}
        src={image.webformatURL}
        alt={image.tags}
      />
    </li>
  );
}

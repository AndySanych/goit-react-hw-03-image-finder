import ImageGalleryItem from '../ImageGalleryItem';

import styles from './ImageGallery.module.css';

export default function ImageGallery({ images, onOpenModal }) {
  return (
    <ul className={styles.ImageGallery}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          onOpenModal={onOpenModal}
        />
      ))}
    </ul>
  );
}

import { motion, AnimatePresence } from 'framer-motion';
import PhotoCard from './PhotoCard';

const MasonryGrid = ({ photos, onPhotoClick, columns = 3 }) => {
  const columnCount = typeof columns === 'object' ? columns : { mobile: 1, tablet: 2, desktop: columns };

  const getGridColumns = () => {
    if (typeof window === 'undefined') return columnCount.desktop;
    const width = window.innerWidth;
    if (width < 768) return columnCount.mobile;
    if (width < 1024) return columnCount.tablet;
    return columnCount.desktop;
  };

  const createMasonryColumns = () => {
    const cols = getGridColumns();
    const columnsArray = Array.from({ length: cols }, () => []);
    
    photos.forEach((photo, index) => {
      const columnIndex = index % cols;
      columnsArray[columnIndex].push(photo);
    });
    
    return columnsArray;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`grid gap-4`}
      style={{
        gridTemplateColumns: `repeat(${getGridColumns()}, minmax(0, 1fr))`
      }}
    >
      {createMasonryColumns().map((columnPhotos, columnIndex) => (
        <div key={columnIndex} className="flex flex-col gap-4">
          {columnPhotos.map((photo, photoIndex) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              onClick={onPhotoClick}
              index={columnIndex * getGridColumns() + photoIndex}
            />
          ))}
        </div>
      ))}
    </motion.div>
  );
};

export default MasonryGrid;

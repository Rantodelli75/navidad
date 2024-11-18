import { motion } from 'framer-motion';

interface StoryPageProps {
  image: string;
  fallbackImage?: string;
  isVisible: boolean;
}
 

export const StoryPage = ({ image, fallbackImage, isVisible }: StoryPageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 100 }}
      exit={{ opacity: 0, x: -100 }}
      className="absolute inset-0 flex flex-col md:flex-row p-8 gap-8 transition-opacity duration-500"
    >
      <motion.img
        src={image}
        onError={(e) => {
          if (fallbackImage) {
            (e.target as HTMLImageElement).src = fallbackImage;
          }
        }}
        className="w-full h-48 md:h-auto object-cover rounded-lg shadow-lg"
        initial={{ scale: 0.8 }}
        animate={{ scale: isVisible ? 1 : 0.8 }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
};

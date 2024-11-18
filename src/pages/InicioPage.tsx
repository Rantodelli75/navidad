import { motion } from 'framer-motion';
import { IMAGES } from '../constants/images';

export const InicioPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      id="contenedor"
    >
      {/* Capa base - imagen de fondo */}
      <motion.img
        src={IMAGES.TITULO}
        className="w-[100%] h-[100%] object-fill z-0"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      {/* Aquí puedes añadir más capas SVG */}
      <motion.svg
        className="absolute inset-0"
        // Añade tus elementos SVG aquí
      >
        {/* Elementos SVG */}
      </motion.svg>
    </motion.div>
  );
}; 
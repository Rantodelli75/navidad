import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext';
import { IMAGES } from '../constants/images';

// Lista de todas las imágenes que necesitas precargar
const IMAGES_TO_LOAD = Object.values(IMAGES);

export const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const { setIsLoaded } = useLoading();
  const navigate = useNavigate();

  useEffect(() => {
    const loadImages = async () => {
      let loadedImages = 0;
      
      try {
        const imagePromises = IMAGES_TO_LOAD.map((src) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
              loadedImages++;
              setProgress((loadedImages / IMAGES_TO_LOAD.length) * 100);
              resolve(null);
            };
            img.onerror = reject;
          });
        });

        await Promise.all(imagePromises);
        setIsLoaded(true);
        navigate('/inicio');
      } catch (error) {
        console.error('Error cargando imágenes:', error);
        setIsLoaded(true);
        navigate('/inicio');
      }
    };

    loadImages();
  }, [navigate, setIsLoaded]);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-b from-amber-100 to-amber-200">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-amber-800 text-lg">Cargando recursos... {Math.round(progress)}%</p>
      </div>
    </div>
  );
};

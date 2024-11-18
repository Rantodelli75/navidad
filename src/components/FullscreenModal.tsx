import { AnimatePresence, motion } from "framer-motion";
import { useState, useCallback, useRef, useEffect } from "react";

interface FullscreenModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const FullscreenModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Inicializar el audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
  }, []);

  const handleStart = useCallback(async () => {
    // Iniciar audio y pantalla completa
    if (audioRef.current) {
      try {
        await audioRef.current.play();
      } catch (err) {
        console.error('Error al reproducir audio:', err);
      }
    }
    setIsOpen(false);
    toggleFullscreen();
  }, []);

  const toggleFullscreen = useCallback(async () => {
    if (!isFullscreen) {
      try {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
          await elem.requestFullscreen();
        } else if ((elem as any).webkitRequestFullscreen) {
          await (elem as any).webkitRequestFullscreen();
        } else if ((elem as any).webkitEnterFullscreen) {
          await (elem as any).webkitEnterFullscreen();
        }
        setIsFullscreen(true);
      } catch (err) {
        console.error('Error al activar pantalla completa:', err);
      }
    } else {
      try {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        }
        setIsFullscreen(false);
      } catch (err) {
        console.error('Error al salir de pantalla completa:', err);
      }
    }
  }, [isFullscreen]);

  return (
    <>
      <audio 
        ref={audioRef}
        loop
        preload="auto"
        src="/assets/navidad-fondo.mp3"
      />
      <div className="fullscreen-modal">
      <SpringModal 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
        onStart={handleStart}
      />
      </div>
    </>
  );
};

const SpringModal = ({ 
  isOpen,  
  isFullscreen, 
  toggleFullscreen,
  onStart 
}: FullscreenModalProps & { 
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  onStart: () => void;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="fullscreen-modal bg-gradient-to-br from-sky-950 to-blue-500 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="flex justify-end mb-2">
                <button
                  onClick={toggleFullscreen}
                  className="p-2 hover:bg-white/10 rounded"
                >
                  {isFullscreen ? '🗗' : '⛶'}
                </button>
              </div>
              <h3 className="text-3xl font-bold text-center mb-2 font-roboto">
                Feliz Navidad
              </h3>
              <p className="text-center mb-6 font-roboto">
                Bienvenidos a la aventura de navidad, estás a punto de entrar en un mundo mágico.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={onStart}
                  className="font-roboto bg-blue-500 hover:opacity-90 transition-opacity text-white font-bold w-full py-2 rounded"
                >
                  Entendido
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullscreenModal;
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import FullscreenModal from './components/FullscreenModal';
import { Preloader } from './components/Preloader';
import { useLoading } from './context/LoadingContext';

const ROUTES = ['/inicio', '/sinopsis', '/acto1', '/acto2', '/acto3', '/acto4', '/final'];
  
function App() {
  const { isLoaded } = useLoading();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = '/' + location.pathname.split('/').filter(Boolean)[0];
  const currentIndex = ROUTES.indexOf(currentPath);

  if (!isLoaded) {
    return <Preloader />;
  }

  const nextPage = () => {
    if (currentIndex < ROUTES.length - 1) {
      navigate(ROUTES[currentIndex + 1]);
    }
  };

  const prevPage = () => {
    if (currentIndex > 0) {
      navigate(ROUTES[currentIndex - 1]);
    }
  };
  
  return (
    <>
      <div className="h-screen bg-[#040B1D] flex w-full relative overflow-auto aspect-[16/9] ">
        <Outlet />
      </div>
      <div className="absolute bottom-4 left-0 pl-12 pr-12 right-0 flex justify-between z-10">
        <button
          className="disabled:opacity-50 disabled:cursor-not-allowed rounded-lg px-4 py-2 font-medium bg-indigo-500 text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
          onClick={prevPage}
          disabled={currentIndex === 0}
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </button>
        <button
          onClick={nextPage}
          disabled={currentIndex === ROUTES.length - 1}
          className="disabled:opacity-50 disabled:cursor-not-allowed rounded-lg px-4 py-2 font-medium bg-indigo-500 text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
          aria-label="Página siguiente"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>
      <FullscreenModal />
    </>
  );
}

export default App;

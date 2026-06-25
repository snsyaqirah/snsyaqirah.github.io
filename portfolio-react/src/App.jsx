import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import PortfolioPage from './pages/PortfolioPage';
import './styles/global.css';

const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioPage />} />
      <Route
        path="/projects/:slug"
        element={
          <Suspense fallback={null}>
            <ProjectDetailPage />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;

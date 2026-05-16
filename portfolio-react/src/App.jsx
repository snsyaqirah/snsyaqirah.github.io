import { Routes, Route } from 'react-router-dom';
import PortfolioPage from './pages/PortfolioPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import './styles/global.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioPage />} />
      <Route path="/projects/:slug" element={<ProjectDetailPage />} />
    </Routes>
  );
}

export default App;

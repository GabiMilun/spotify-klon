import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index.jsx';
import LibraryLayout from './Home.jsx';
import Trending from './components/Trending.jsx';
import TrendingSection from './components/TrendingSection.jsx';
import SearchResults from './components/SearchResults.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LibraryLayout />}>
          <Route index element={<Trending />} />
          <Route path="section/:sectionId" element={<TrendingSection />} />
          <Route path="search/:query" element={<SearchResults />} />
        </Route>
        <Route path="/index" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

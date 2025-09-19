
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SinglePage from './pages/SinglePage';
import AllEntries from './pages/AllEntries';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form/:companyName" element={<SinglePage />} />
        <Route path="/entries" element={<AllEntries />} />
      </Routes>
    </Router>
  );
}

export default App;


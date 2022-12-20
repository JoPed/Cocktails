import 'bootstrap/dist/css/bootstrap-grid.min.css';
import './scss/App.scss';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CocktailsByIngredients from './pages/CocktailsByIngredients';
import CocktailDetails from './pages/CocktailDetails';

import Navbar from './components/Navbar';

function App () {

  return (
    <Router>

      <Navbar />

      <Routes>

        <Route index element={<CocktailsByIngredients />} />
        <Route path="/cocktaildetails" element={<CocktailDetails />} />

      </Routes>

    </Router>
  )
}

export default App

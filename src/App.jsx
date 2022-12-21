import 'bootstrap/dist/css/bootstrap-grid.min.css';
import './scss/App.scss';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Container from 'react-bootstrap/Container'

import CocktailsByIngredients from './pages/CocktailsByIngredients';
import CocktailDetails from './pages/CocktailDetails';
import About from './pages/About';
import Guide from './pages/Guide';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App () {

  return (
    <Router>

      <Navbar />

      <Container fluid className="container">
        <Routes>

          <Route index element={ <CocktailsByIngredients /> } />
          <Route path="/cocktaildetails" element={ <CocktailDetails /> } />
          <Route path="/guide" element={<Guide />} />
          <Route path="/about" element={<About />} />

        </Routes>
      </Container>

      <Footer />

    </Router>
  )
}

export default App

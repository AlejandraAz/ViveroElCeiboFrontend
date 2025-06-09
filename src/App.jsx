import { BrowserRouter } from 'react-router-dom';
import './css/App.css';
import NavBar from './Components/NavBar.jsx';
import Carrousel from './Components/Carrousel.jsx';
import BarraFiltros from './Components/BarraFiltros.jsx';
import Tarjetas from './Components/Tarjetas.jsx';
import HeroOverlay from './Components/HeroOverlay.jsx';
import Footer from './Components/Footer.jsx';


function App() {

  return (
    <>
    <BrowserRouter>
      <NavBar/>
      <Carrousel/>
      <BarraFiltros/>
      <Tarjetas/>
      <HeroOverlay/>
      <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App


import './css/App.css';
import NavBar from './Components/NavBar.jsx';
import Carrousel from './Components/Carrousel.jsx';
import Tarjetas from './Components/Tarjetas.jsx';
import HeroOverlay from './Components/HeroOverlay.jsx';
import Footer from './Components/Footer.jsx';
import ProfilePage from "./Pages/Customer/ProfilePage.jsx"
import AppRoutes from './routes/AppRoutes.jsx';


function App() {

  return (
    <>
    <AppRoutes/>
    {/* <ProfilePage/> */}
      {/* <NavBar/>
      <Carrousel/>
      <BarraFiltros/>
      <Tarjetas/>
      <HeroOverlay/>
      <Footer/> */}
    </>
  )
}

export default App

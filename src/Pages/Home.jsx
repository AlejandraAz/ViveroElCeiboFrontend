import React from 'react'
import Carrousel from '../Components/Carrousel.jsx';
import BarraFiltros from '../Components/BarraFiltros.jsx';
import Tarjetas from '../Components/Tarjetas.jsx';
import HeroOverlay from '../Components/HeroOverlay.jsx';
import FormPages from './LoginPage.jsx';
import RegisterLogin from '../Components/RegisterLogin.jsx';

const Home = () => {
  return (
    <>
    <Carrousel/>
    <BarraFiltros/>
    <Tarjetas/>
    <HeroOverlay/>
    {/* prueba */}
    <FormPages/>
    <RegisterLogin/>
    </>
  )
}

export default Home;
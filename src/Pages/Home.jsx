import React from 'react'
import Carrousel from '../Components/Carrousel.jsx';
import BarraFiltros from '../Components/BarraFiltros.jsx';
import Tarjetas from '../Components/Tarjetas.jsx';
import HeroOverlay from '../Components/HeroOverlay.jsx';

const Home = () => {
  return (
    <>
    <Carrousel/>
    <BarraFiltros/>
    <Tarjetas/>
    <HeroOverlay/>
    </>
  )
}

export default Home;
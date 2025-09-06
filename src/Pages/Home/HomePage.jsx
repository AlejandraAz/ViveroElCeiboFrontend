import React from 'react'
import Carrousel from '../../Components/Carrousel.jsx';
import BarraFiltros from '../../Components/BarraFiltros.jsx';
import Tarjetas from '../../Components/Tarjetas.jsx';
import HeroOverlay from '../../Components/HeroOverlay.jsx';
import FormPages from '../Auth/LoginPage.jsx';
import RegisterLogin from '../../Components/RegisterLogin.jsx';

const Home = () => {
  return (
    <>
    <Carrousel/>
    {/* <BarraFiltros/> */}
    <Tarjetas/>
    <HeroOverlay/>
    {/* prueba para visualizar lo que estoy haciendo */}
    {/* <FormPages/>
    <RegisterLogin/> */}
    </>
  )
}

export default Home;
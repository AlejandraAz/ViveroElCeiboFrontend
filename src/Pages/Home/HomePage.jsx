import React from 'react'
import Carrousel from '../../Components/Carrousel.jsx';
import SearchHome from "../../Components/SearchHome.jsx";
import Tarjetas from '../../Components/Tarjetas.jsx';
import HeroOverlay from '../../Components/HeroOverlay.jsx';
import FormPages from '../Auth/LoginPage.jsx';
import RegisterLogin from '../../Components/RegisterLogin.jsx';
import FeaturedCarousel from '../../Components/FeaturedCarrusel.jsx';
import AllProducts from '../../Components/AllProducts.jsx';
import Benefits from '../../Components/Benefits.jsx';


const Home = () => {
  return (
    <>
    <Carrousel/>
    <Benefits/>
    <SearchHome/>
    <FeaturedCarousel/>
    <AllProducts/>
    {/* <Tarjetas/> */}
    <HeroOverlay/>

    {/* prueba para visualizar lo que estoy haciendo */}
    {/* <FormPages/>
    <RegisterLogin/> */}
    </>
  )
}

export default Home;
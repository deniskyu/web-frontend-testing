import React, {useEffect} from 'react'
import './HomePage.css'
import Landing from '../../components/Landing/Landing'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import Reviews from '../../components/Reviews/Reviews'
import { useLocation } from 'react-router-dom'


const HomePage = () => {

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace('#', ''));
      if (element) {
        const yOffset = -100; // offset by 100px
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className='homepage'>
      <Landing/>
      <ExploreMenu />
      <Reviews />
    </div>
  )
}

export default HomePage

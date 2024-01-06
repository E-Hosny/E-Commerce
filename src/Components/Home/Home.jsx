import style from'./Home.module.css';
import FeaturedProduct from '../FeaturedProduct/FeaturedProduct';
import CategorySlider from '../CategorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';


export default function Home()
{
    


  return <>
     <MainSlider/>
     <CategorySlider/>
     <FeaturedProduct/>
  </>
}
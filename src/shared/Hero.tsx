import imgHero1 from '../assets/hero-img/DSC03568.png';
import imgHero2 from '../assets/hero-img/DSC03617.png';
import imgHero3 from '../assets/hero-img/DSC03652 - Copy.png';
import imgHero4 from '../assets/hero-img/Untitled-2.png';

const Hero = () => {
  return (
    <div className="relative">
      <div className="flex justify-center w-full flex-wrap relative">
        <img src={imgHero1} alt="" className="md:w-1/4 w-1/2 object-cover" />
        <img src={imgHero2} alt="" className="md:w-1/4 w-1/2  object-cover" />
        <img src={imgHero4} alt="" className="md:w-1/4 w-1/2  object-cover" />
        <img src={imgHero3} alt="" className="md:w-1/4 w-1/2  object-cover" />
      </div>
      <div className="absolute inset-0  flex items-center justify-center text-white">
        <div className="bg-gray-900 bg-opacity-40 p-6 w-full h-full">
          <div className="title relative top-1/2 left-1/2 w-fit -translate-x-1/2 -translate-y-1/2">

          <p className="text-3xl font-bold ">Welcome to <span className="text-red-500">ZOCHY</span></p>
          <p className="w-full mt-2">Urban Vibes Collection: Oversized Basics & Baggy Comfort</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;

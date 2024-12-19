import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useState, useEffect, useRef } from 'react';

const HeroSection = () => {
  const images = [
    '/images/cloth1.jpg',
    '/images/cloth2.jpg',
    '/images/cloth4.jpg',
    '/images/shoes1.jpg',
    '/images/cloth5.jpg',
    '/images/shoes2.jpg',
    '/images/shoes.jpg',
  ];

  const swiperRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (swiperRef.current) {
        swiperRef.current.swiper.slideNext(); 
      }
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  const goToNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goToPrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <div className="hero-section relative w-full overflow-hidden border-4 border-blue-500 rounded-lg bg-gradient-to-r from-teal-400 to-blue-500">
      
   
      <div
        className="absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer opacity-70 hover:opacity-100 z-10 flex justify-center items-center w-12 h-12 bg-white text-black rounded-full border-4 border-black text-3xl"
        onClick={goToPrevSlide}
      >
        <span>&lt;</span>
      </div>

     
      <div
        className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer opacity-70 hover:opacity-100 z-10 flex justify-center items-center w-12 h-12 bg-white text-black rounded-full border-4 border-black text-3xl"
        onClick={goToNextSlide}
      >
        <span>&gt;</span>
      </div>

     
      <Swiper
        spaceBetween={5}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          1024: {
            slidesPerView: 4,
            spaceBetween: 5,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
        }}
        className="w-full"
        ref={swiperRef}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center items-center">
              <div className="w-[350px] h-[350px] overflow-hidden flex justify-center items-center border-4 border-white rounded-lg">
                <img
                  src={image}
                  alt={`Promo ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;

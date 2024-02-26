import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import customFetch from '../api';

const CarouselSection = () => {
  const [images,setImages]=useState("")
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };

  useEffect(()=>{
    const getSliderImage=async()=>{
      const res = await customFetch('/api/post/getSlider');
      const data = await res?.json();
       if(res.ok){
        setImages(data?.slider[0]?.sliderImages)
        // setImages(data?.slider[0]?.sliderImages);
       } else{
        console.log("error to get Slider images")
       }
    }
    getSliderImage()
  },[images?.length])
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Slider {...settings}>
        {images.length > 0 && images?.map((image, index) => (
          <div key={index} className="px-2">
            <img src={image?.imageUrl} alt={`Slide ${index}`} style={{height: '500px', width: '100%', objectFit: 'cover'}}/>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselSection;

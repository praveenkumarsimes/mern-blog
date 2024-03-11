import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import customFetch from '../api';
import first1 from '../../images/first1.jpg';
import meerat from '../../images/meerat.jpg'; // Import your second image here

// ... (previous imports)

const CarouselSection = () => {
  const [images, setImages] = useState([]);

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

  useEffect(() => {
    const getSliderImage = async () => {
      try {
        const res = await customFetch('/api/post/getSlider');
        if (res.ok) {
          const data = await res.json();
          console.log("API Response:", data); // Log the API response for debugging
          const sliderImages = data?.slider[0]?.sliderImages || [];
          setImages(sliderImages.concat([first1, meerat, meerat, meerat]));
        } else {
          console.log("Error getting Slider images:", res.status, res.statusText);
        }
      } catch (error) {
        console.error("Error fetching Slider images:", error);
      }
    }
  
    getSliderImage();
  }, []);
   // Dependency array should be empty to run only once

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Slider {...settings}>
        {images.length > 0 ? (
          images.map((image, index) => (
            <div key={index} className="px-2">
              <img src={image} alt={`Slide ${index}`} style={{ height: '400px', width: '100%', objectFit: 'cover' }} />
            </div>
          ))
        ) : (
          <div>No images to display</div>
        )}
      </Slider>
    </div>
  );
};

export default CarouselSection;
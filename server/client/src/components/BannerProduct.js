

import React, { useEffect, useState } from 'react';
import image1 from '../assest/images/web banner.png';
import image2 from '../assest/images/Product Image.png';
import image3 from '../assest/banner/img3.jpg';
import image4 from '../assest/banner/img4.jpg';
import image5 from '../assest/banner/img5.webp';

import image1Mobile from '../assest/banner/img1_mobile.jpg';
import image2Mobile from '../assest/banner/img2_mobile.webp';
import image3Mobile from '../assest/banner/img3_mobile.jpg';
import image4Mobile from '../assest/banner/img4_mobile.jpg';
import image5Mobile from '../assest/banner/img5_mobile.png';


import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { MdLocalShipping } from 'react-icons/md';
import { CgHeadset, CgShoppingBag } from 'react-icons/cg';
const features = [
  {
    icon: <MdLocalShipping fontSize="large" color="primary" />,
    title: "Free Shipping",
    description: "Free shipping on all your orders",
  },
  {
    icon: <CgHeadset fontSize="large" color="primary" />,
    title: "Customer Support 24/7",
    description: "Instant access to support",
  },
  {
    icon: <CgShoppingBag fontSize="large" color="primary" />,
    title: "100% Secure Payment",
    description: "We ensure your money is safe",
  },
];
const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const desktopImages = [image1, "https://graphicsfamily.com/wp-content/uploads/edd/2023/05/Website-Food-Banner-Design-1180x664.jpg", "https://img.freepik.com/free-psd/flat-design-pizzeria-template_23-2150192550.jpg?t=st=1730407002~exp=1730410602~hmac=ff984fc4397eeae19e6374a3868585bc8f40f2003bd732b6fd1d834805d0c459&w=2000", "https://img.freepik.com/free-psd/delicious-burger-food-menu-web-banner-template_120329-4903.jpg?t=st=1730407063~exp=1730410663~hmac=90f803cdea71b6e0c36a1602d9335a414899eed2515c67788dfd2fbf6d758d9f&w=1800", "https://media.istockphoto.com/id/1131005373/photo/kitchen-fresh-colorful-organic-vegetables-on-worktop.jpg?s=1024x1024&w=is&k=20&c=9bj3OqG3Drzyz95L--Arej95bZMI55m_XOuWosIEzJQ="];
  const mobileImages = ["https://img.pikbest.com/origin/06/12/48/20hpIkbEsTSxn.jpg!w700wp","https://indiater.com/wp-content/uploads/2020/05/creative-banner-for-restaurant-promo-burger-in-phone-free-psd-template.jpg","https://img.pikbest.com/origin/06/40/94/086pIkbEsTE7A.jpg!w700wp","https://img.pikbest.com/origin/05/99/16/64tpIkbEsTf8s.jpg!w700wp","https://img.pikbest.com/origin/06/40/94/086pIkbEsTE7A.jpg!w700wp","https://img.pikbest.com/origin/05/99/16/64tpIkbEsTf8s.jpg!w700wp"];

  const nextImage = () => {
    if (desktopImages?.length - 1 > currentImage) {
      setCurrentImage(prev => prev + 1);
    }
  };

  const prevImage = () => {
    if (currentImage !== 0) {
      setCurrentImage(prev => prev - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (desktopImages?.length - 1 > currentImage) {
        nextImage();
      } else {
        setCurrentImage(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <>
    <div className="mx-auto rounded">
    <div className=" w-full  relative "> {/* Adjusted fixed height */}
      {/* Navigation Buttons */}
      <div className="absolute z-10 h-full w-full md:flex items-center hidden">
        <div className="flex justify-between w-full text-2xl">
          <button onClick={prevImage} className="bg-white shadow-md rounded-full p-1">
            <FaAngleLeft />
          </button>
          <button onClick={nextImage} className="bg-white shadow-md rounded-full p-1">
            <FaAngleRight />
          </button>
        </div>
      </div>
  
      {/* Desktop and Tablet Version */}
      <div className="hidden md:flex h-[550px] w-full overflow-hidden">
        {desktopImages?.map((imageUrl, index) => (
          <div
            className="w-full h-full min-w-full transition-all "
            key={imageUrl}
            style={{ transform: `translateX(-${currentImage * 100}%)` }}
          >
            <img src={imageUrl} className="w-full h-full object-fit" alt={`Slide ${index}`} />
          </div>
        ))}
      </div>
  
      {/* Mobile Version */}
      <div className="flex h-[330px] w-full overflow-hidden md:hidden ">
        {mobileImages?.map((imageUrl, index) => (
          <div
            className="w-full h-full min-w-full transition-all"
            key={imageUrl}
            style={{ transform: `translateX(-${currentImage * 100}%)` }}
          >
            <img src={imageUrl} className="w-full h-full object-fill" alt={`Slide ${index}`} />
          </div>
        ))}
      </div>
    </div>
  </div>
 
<div className="flex  md:flex-row justify-around md:p-[60px_20px_20px_20px] p-[5px_5px_5px_5px] w-[90%] shadow-xl rounded mt-4">
  {features?.map((feature, index) => (
    <div key={index} className="text-center text-[#AA0000] flex flex-col md:flex-row items-center gap-[15px] mb-4 md:mb-0">
      {feature.icon}
      <div className="text-center">
        <h6 className="text-[#1A1A1A] font-semibold mb-2 text-[10px] md:text-base">{feature.title}</h6>
        <p className="text-[8px] text-[#8B8B8B]  md:text-sm">{feature.description}</p>
      </div>
    </div>
  ))}
</div>

  </>
  
  );
};

export default BannerProduct;

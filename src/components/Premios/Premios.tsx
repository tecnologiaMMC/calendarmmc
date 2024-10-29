import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import premio7 from "./img/premio7.png";
import premio8 from "./img/premio8.png";
import premio9 from "./img/premio9.png";
import premio10 from "./img/premio10.png";
import premio11 from "./img/premio11.png";


// Import Swiper styles
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// Import required modules
import { Zoom, Autoplay, Pagination, Navigation } from "swiper/modules";

const  Premios=()=> {
   const images = [premio7,premio8,premio9,premio10,premio11];
   const whats = () => {
      window.open("https://wa.link/z6yjk0", "_blank");
   };
   return (
      <div className="w-[100%] flex flex-col items-center mt-[50px] ">
         <div className="w-[100%] sm:w-[100%] md:w-[80%]  prem">
            <Swiper
               spaceBetween={30}
               slidesPerView={1}
               breakpoints={{
                  "@0.00": {
                     slidesPerView: 1,
                     spaceBetween: 10,
                  },
                  "@0.75": {
                     slidesPerView: 2,
                     spaceBetween: 20,
                  },
               }}
               autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
               }}
               // style={{
               //    "--swiper-navigation-color": "#45204b",
               //    "--swiper-pagination-color": "#45204b",
               // }}
               zoom={true}
               navigation={true}
               pagination={{
                  clickable: true,
               }}
               modules={[Zoom, Navigation, Pagination, Autoplay]}
               className="mySwiper"
            >
               {images.map((img, index) => (
                  <SwiperSlide key={index} className="swiperslideprem">
                     <div className="w-[80%] sm:w-[80%] md:w-[90%]   ">
                        <img src={img.src} alt="" />
                     </div>
                  </SwiperSlide>
               ))}
            </Swiper>
         </div>
         <div onClick={whats} className="button_buy-s">¡Compra Aquí!</div>
      </div>
   );
}
export default Premios
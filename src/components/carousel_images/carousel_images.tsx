"use client"; // <===== REQUIRED

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import mmc from "@img/mmc-portada.png";
import tusuy from "@img/tusuy.jpg";
import { useRouter } from "next/navigation";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import {
   Autoplay,
   Pagination,
   Navigation,
   EffectFade,
   EffectCards,
   EffectCube,
} from "swiper/modules";

export default function Carousel() {
   const images = [mmc.src];
   const router = useRouter();

   const llevame = (pos: number) => {
      if (pos === 0) {
         router.push("/calendario/concurso/tusuy-peru-lima-2024");
      }
   };
   return (
      <>
         <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
               delay: 4500,
               disableOnInteraction: false,
            }}
            pagination={{
               clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
         >
            {images.map((img, index) => (
               <SwiperSlide key={index}>
                  <div className="w-full relative">
                     <img
                        className="cursor-pointer"
                        src={img}
                        alt=""
                     />
                  </div>
               </SwiperSlide>
            ))}
         </Swiper>
      </>
   );
}
{/* <img
   className={`${index == 0 ? "cursor-pointer" : "cursor-default"}`}
   onClick={() => llevame(index)}
   src={img}
   alt=""
/>; */}

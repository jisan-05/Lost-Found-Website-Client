import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import slide1 from "../../assets/slider-img/slide-1.jpg"; // Example: A person holding a lost item
import slide2 from "../../assets/slider-img/slide-2.jpeg"; // Example: A lost pet
import slide3 from "../../assets/slider-img/slide-3.webp"; // Example: A happy reunion

const Slider = () => {
    return (
        <div className="relative">
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                modules={[Navigation, Pagination, Autoplay]}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {/* Slide 1: Report Lost Items */}
                <SwiperSlide>
                    <div className="relative">
                        <img
                            className="w-full h-[500px] object-cover"
                            src={slide1}
                            alt="Report lost items"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-[#0000003d] bg-opacity-30">
                            <div className="text-center text-white">
                                <h2 className="text-4xl font-bold mb-4">Lost Something?</h2>
                                <p className="text-xl">
                                    Report your lost items and let us help you find them.
                                </p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 2: Found a Lost Pet */}
                <SwiperSlide>
                    <div className="relative">
                        <img
                            className="w-full h-[500px] object-cover"
                            src={slide2}
                            alt="Found a lost pet"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-[#0000003d] bg-opacity-30">
                            <div className="text-center text-white">
                                <h2 className="text-4xl font-bold mb-4">Found a Lost Pet?</h2>
                                <p className="text-xl">
                                    Help reunite lost pets with their owners. Report found pets here.
                                </p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 3: Success Story */}
                <SwiperSlide>
                    <div className="relative">
                        <img
                            className="w-full h-[500px] object-cover"
                            src={slide3}
                            alt="Happy reunion"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-[#0000003d] bg-opacity-30">
                            <div className="text-center text-white">
                                <h2 className="text-4xl font-bold mb-4">Reunited and It Feels So Good!</h2>
                                <p className="text-xl">
                                    Join our community and help reunite lost items with their owners.
                                </p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Slider;
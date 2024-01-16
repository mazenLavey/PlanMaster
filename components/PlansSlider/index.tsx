"use client";

import { useContext } from "react";
import { PlansContext } from "@/contexts/PlansContext";
import PlanCard from "@/components/PlanCard";
import { Swiper, SwiperSlide, SwiperProps } from 'swiper/react';
import { Mousewheel, Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css';
import "./index.scss";

const swiperParams: SwiperProps = {
    slidesPerView: "auto",
    slideToClickedSlide: true,
    spaceBetween: 16,
    modules: [Mousewheel, Pagination],
    mousewheel: true,
    pagination: { 
        clickable: true,
        el: ".PlansSlider__Pagination",
    },
};


const PlansSlider: React.FC = () => {
    const { activePlans, currentPlan } = useContext(PlansContext);

    const renderPlans = () => {
        if(!activePlans) return;

        return activePlans.map(el => {
            return(
                <SwiperSlide key={el.id} className="PlansSlider__Slide">
                    <PlanCard data={el} isCurrent={currentPlan?.id === el.id}/>
                </SwiperSlide>
            )
        })
    }

    return (
        <div className="PlansSlider">
            <Swiper
                className="PlansSlider__Swiper"
                wrapperClass="PlansSlider__SwiperWrapper"
                {...swiperParams}
            >
                {renderPlans()}
            </Swiper>
            <div className="PlansSlider__Pagination"></div>
        </div>
    );
};

export default PlansSlider;
"use client";

import { useContext, useRef } from "react";
import { PlansContext } from "@/contexts/PlansContext";
import useMedia from "@/hooks/useMedia";
import PlanCard from "@/components/cards/PlanCard";
import styles from "@/styles/Plans.module.scss";
import AddNewPlan from "../buttons/AddNewPlan";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper";
import 'swiper/css';
import "swiper/css/pagination";

const Plans: React.FC = ()=>{
    const {allPlans, showPlan, deletePlan} = useContext(PlansContext);
    const {isMobileScreen} = useMedia();
    const planBoxRef = useRef<HTMLDivElement>(null);

    function handleScroll(e: React.WheelEvent<HTMLDivElement>): void {
        const container = planBoxRef.current;
        if(container) {
            container.scrollLeft += e.deltaY;
        }
    }

    return (
        <section className={styles.wrapper}>
            <div className={styles.header}>
                <h2 className={styles.title}>{allPlans.length === 1? "plan" : "plans"} ({allPlans.length})</h2>
                <AddNewPlan />
            </div>
            {
                isMobileScreen?
                <div style={{overflow: "hidden", paddingBottom: "2.5rem"}} className={styles.mobileScreen}>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={1.5}
                        pagination={{
                            type: "fraction",
                        }}
                        modules={[Pagination]}
                    >
                        {allPlans && allPlans.map(el => <SwiperSlide key={el.id}><PlanCard showPlan={()=> showPlan(el)} data={el} deletePlan={() => deletePlan(el.id)}/></SwiperSlide>)}
                    </Swiper>
                </div>
                :
                <div className={styles.plansContainer} onWheel={handleScroll} ref={planBoxRef}>
                {allPlans && allPlans.map(el => <PlanCard key={el.id} showPlan={()=> showPlan(el)} data={el} deletePlan={() => deletePlan(el.id)}/>)}
                </div>
            }
        </section>
    );
};

export default Plans;
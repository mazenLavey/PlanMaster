"use client";

import { ChangeEvent, FormEvent, useContext, useState } from "react";
import styles from "@/styles/PlanForm.module.scss";
import stylesBtns from "@/styles/Buttons.module.scss";
import { PlansContext } from "@/contexts/PlansContext";
import { PlanType } from "@/types/interfaces";
import dateFormat from "@/functions/dateFormat";

interface Props {
    data: PlanType,
    closePopup: ()=> void
}

const PlanForm: React.FC<Props> = ({data, closePopup})=>{
    const [formData, setFormData] = useState<PlanType>(data);
    const {editPlanInfo} = useContext(PlansContext);
    const todayDate = dateFormat();

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        const {name, value} = e.target;

        setFormData(prevValue => {
            return {
                ...prevValue,
                [name]: value
            };
        });
    };

    function handleSubmit(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        const planId: string = data.id;
        editPlanInfo(formData, planId);
        closePopup();
    };

    return (
        <form onSubmit={handleSubmit} className={styles.wrapper}>
            <div className={styles.form}>
                <label htmlFor="title">title</label>
                <input type="text" name="title" id="title" onChange={handleChange} value={formData.title} required/>

                <label htmlFor="description">descripe your plan</label>
                <input type="text" name="description" id="description" onChange={handleChange} value={formData.description} required/>

                <label htmlFor="deadline">deadline</label>
                <input type="date" name="deadline" id="deadline" onChange={handleChange} value={formData.deadline} min={todayDate} />
            </div>
            <button className={stylesBtns.button}>Save</button>
        </form>
    );
};

export default PlanForm;
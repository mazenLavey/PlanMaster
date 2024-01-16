"use client";

import { ChangeEvent, FormEvent, useContext, useState } from "react";
import Btn from "@/components/Btn";
import { PlansContext } from "@/contexts/PlansContext";
import { PlanType } from "@/types/interfaces";
import { formatISO } from "date-fns";
import "./index.scss";

interface Props {
    data: PlanType,
    closePopup: ()=> void
}

const PlanForm: React.FC<Props> = ({data, closePopup})=>{
    const [formData, setFormData] = useState<PlanType>(data);
    const {editPlanInfo} = useContext(PlansContext);
    const todayDate = formatISO(new Date().getTime(), { representation: 'date' });

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = e.target;

        setFormData(prevValue => {
            return {
                ...prevValue,
                [name]: value
            };
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const planId: string = data.id;
        editPlanInfo(formData, planId);
        closePopup();
    };

    return (
        <form className="PlanForm" onSubmit={handleSubmit}>
            <div className="PlanForm__Inner">
                <label className="PlanForm__Label" htmlFor="title">title</label>
                <input className="PlanForm__Input" type="text" name="title" id="title" onChange={handleChange} value={formData.title} required placeholder="e.g. Learn Photoshop"/>

                <label className="PlanForm__Label" htmlFor="description">descripe your plan</label>
                <input className="PlanForm__Input" type="text" name="description" id="description" onChange={handleChange} value={formData.description} placeholder="e.g. I have to Learn the basics of photoshop ..."/>

                <label className="PlanForm__Label" htmlFor="deadline">deadline</label>
                <input className="PlanForm__Input PlanForm__Input--Date" type="date" name="deadline" id="deadline" onChange={handleChange} value={formData.deadline} min={todayDate}/>
            </div>
            <Btn>
                Save
            </Btn>
        </form>
    );
};

export default PlanForm;
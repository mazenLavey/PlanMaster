"use client";

import { ChangeEvent, FormEvent, useContext, useState } from "react";
import Btn from "@/components/Btn";
import { PlansContext } from "@/contexts/PlansContext";
import { PlanType } from "@/types/interfaces";
import { formatISO } from "date-fns";
import InputText from "@/components/InputText";
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
                <InputText label="title" name="title" id="title" placeholder="e.g. Learn Photoshop" onChange={handleChange} value={formData.title} required />
                <InputText label="descripe your plan" name="description" id="description" placeholder="e.g. I have to Learn the basics of photoshop ..." onChange={handleChange} value={formData.description} />
                <InputText label="deadline" type="date" name="deadline" id="deadline" onChange={handleChange} value={formData.deadline} min={todayDate} />
            </div>
            <Btn type="submit">
                Save
            </Btn>
        </form>
    );
};

export default PlanForm;
"use client";

import { PlansContext } from "@/contexts/PlansContext";
import { useContext } from "react";
import styles from "@/styles/Buttons.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AddNewPlan: React.FC = ()=>{
    const {addNewPlan} = useContext(PlansContext);
    return (
        <button onClick={addNewPlan} className={styles.button}>
            <FontAwesomeIcon icon={faPlus} width={16}/>
            plan
        </button>
    );
};

export default AddNewPlan;
"use client";

import { SubTask } from "@/types/interfaces";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import InputText from "@/components/InputText";
import "./index.scss";

interface Props {
    slotId: string,
    subtaskData?: SubTask,
    updateSubTasks: (slotId: string, newtitle: string)=> void,
    deleteSubTask: ()=> void
}

const SubTaskSlot: React.FC<Props> = ({slotId, subtaskData, updateSubTasks, deleteSubTask})=>{
    const [inputData, setInputData] = useState<SubTask>({
        id: subtaskData?.id || slotId,
        title: subtaskData?.title || "",
        status: subtaskData?.status || false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {value, id} = e.target;
        setInputData(prevValue => {
            return {
                ...prevValue,
                title: value
            }
        }) ;
        updateSubTasks(id, value);
    };

    return (
        <div className="SubTaskSlot">
            <InputText name={slotId} id={slotId} onChange={handleChange} value={inputData.title} required/>
            <button className="SubTaskSlot__Btn" type="button" onClick={deleteSubTask}>
                <FontAwesomeIcon icon={faXmark} width={20}/>
            </button>
        </div>
    );
};

export default SubTaskSlot;
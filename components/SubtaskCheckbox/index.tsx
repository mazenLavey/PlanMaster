import classNames from "classnames";
import { SubTask } from "@/types/interfaces";
import "./index.scss";

type Props = {
    data: SubTask,
    isChecked: boolean, 
    isDisabled: boolean,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const SubtaskCheckbox: React.FC<Props> = ({data, isChecked, isDisabled, handleChange}) => {
    return(
        <div className="SubtaskCheckbox">
            <input 
                className={classNames("SubtaskCheckbox__Checkbox", {
                    "SubtaskCheckbox__Checkbox--Checked": isChecked,
                    "SubtaskCheckbox__Checkbox--Disabled": isDisabled,
                })} 
                type="checkbox" 
                name={data.id} 
                id={data.id} 
                checked={isChecked} 
                onChange={(e) => handleChange(e)} 
                disabled={isDisabled}
            />
            <label 
                className={classNames("SubtaskCheckbox__Label", {
                    "SubtaskCheckbox__Label--Checked": isChecked,
                    "SubtaskCheckbox__Label--Disabled": isDisabled,
                })} 
                htmlFor={data.id}>
                    {data.title}
            </label>
        </div>
    )
}

export default SubtaskCheckbox;
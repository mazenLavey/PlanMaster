import classNames from "classnames";
import "./index.scss";

type Props = {
    id: string,
    label: string,
    isChecked: boolean, 
    isDisabled: boolean,
    isError?: boolean,
    withLineThrough?: boolean,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const InputCheckbox: React.FC<Props> = ({
    id, 
    label, 
    isChecked, 
    isDisabled, 
    isError,  
    withLineThrough = true, 
    handleChange
}) => {
    return(
        <div className="InputCheckbox">
            <input 
                className={classNames("InputCheckbox__Checkbox", {
                    "InputCheckbox__Checkbox--Checked": isChecked,
                    "InputCheckbox__Checkbox--Disabled": isDisabled,
                    "InputCheckbox__Checkbox--Error": isError,
                })} 
                type="checkbox" 
                name={id} 
                id={id} 
                checked={isChecked} 
                onChange={(e) => handleChange(e)} 
                disabled={isDisabled}
            />
            <label 
                className={classNames("InputCheckbox__Label", {
                    "InputCheckbox__Label--Checked": isChecked && withLineThrough,
                    "InputCheckbox__Label--Disabled": isDisabled,
                })} 
                htmlFor={id}>
                    {label}
            </label>
        </div>
    )
}

export default InputCheckbox;
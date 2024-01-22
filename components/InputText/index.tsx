import { InputHTMLAttributes } from "react";
import classNames from "classnames";
import "./index.scss";

type Props = InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> & {
    tag?: "input" | "textarea",
    label?: string,
    className?: string,
    errorMessage?: string,
    isError?: boolean,
    children?: React.ReactNode,
}

const InputText: React.FC<Props> = ({
    tag = "input",
    children,
    className,
    label,
    required,
    type,
    isError = false,
    errorMessage,
    ...inputProps
}) => {
    const isRequired = Boolean(required);

    return (
        <div className="InputText">
            {label && <label className={classNames("InputText__Label", {
                "InputText__Label--Required": isRequired,
            })} htmlFor={inputProps.id}>
                {label}
            </label>}
            <div className="InputText__Wrapper">
                {
                    tag === "input" ?
                    <input 
                        className={classNames([className, "InputText__Input"], {
                            "InputText__Input--Date": type === "date",
                            "InputText__Input--Error": isError,
                        })}
                        type={type?? "text"}
                        {...inputProps}
                    />
                    :
                    <textarea 
                        className="InputText__Textarea"
                        {...inputProps}
                    />
                }
                {children}
                {isError && <span className="InputText__ErrorMessage">* {errorMessage}</span>}
            </div>
        </div>
    )
};

export default InputText;
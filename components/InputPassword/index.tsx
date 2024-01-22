"use client";

import { InputHTMLAttributes } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useToggle } from "react-use";
import InputText from "@/components/InputText";
import "./index.scss";

type Props = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    className?: string;
    isError?: boolean;
    errorMessage?: string,
};

const InputPassword: React.FC<Props> = ({
    label,
    className,
    isError = false,
    errorMessage,
    ...inputProps
}) => {
    const [isShowPassword, toggleIsShowPassword] = useToggle(false);

    return (
        <InputText
            className={className}
            label={label}
            type={isShowPassword ? "text" : "password"}
            isError={isError}
            errorMessage={errorMessage}
            data-lpignore="true"
            role="note"
            {...inputProps}>
                <button
                    className="InputPassword__BtnShowPassword"
                    type="button"
                    onClick={toggleIsShowPassword}
                >
                    <FontAwesomeIcon icon={isShowPassword ? faEye : faEyeSlash} />
                </button>
        </InputText>
    );
};

export default InputPassword;

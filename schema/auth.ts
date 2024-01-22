import * as yup from "yup";
import { ERROR_MESSAGES } from "@/constants";

export const registerSchema = yup.object({
    userEmail: yup.string().email(ERROR_MESSAGES.invalid_email).required(ERROR_MESSAGES.required),
    userPassword: yup.string().min(6, ERROR_MESSAGES.password).required(ERROR_MESSAGES.required),
    userConfirmationPassword: yup
        .string()
        .oneOf([yup.ref("userPassword")], ERROR_MESSAGES.password_confirmation)
        .required(ERROR_MESSAGES.required),
        agreeCheckbox: yup.boolean().oneOf([true]).required(ERROR_MESSAGES.required),
});

export const loginSchema = yup.object({
    userEmail: yup.string().email(ERROR_MESSAGES.invalid_email).required(ERROR_MESSAGES.required),
    userPassword: yup.string().min(6, ERROR_MESSAGES.password).required(ERROR_MESSAGES.required),
});
"use client";

import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import AuthContainer from "@/components/AuthContainer";
import routes from "@/routes";
import InputText from "@/components/InputText";
import Btn from "@/components/Btn";
import { useFormik } from 'formik';
import { registerSchema } from '@/schema/auth';
import InputPassword from "@/components/InputPassword";
import InputCheckbox from "@/components/InputCheckbox";
import "./index.scss";

const Register: React.FC = () => {
    const {createUserByEmail} = useContext(AuthContext);
    const router = useRouter()

    const { values, handleChange, handleSubmit, handleBlur, errors, touched, isSubmitting } = useFormik({
        initialValues: {
            userEmail: '',
            userPassword: '',
            userConfirmationPassword: '',
            agreeCheckbox: false
        },
        validationSchema: registerSchema,
        onSubmit: async (data, actions) => {
            try {
                actions.setSubmitting(true);
                await createUserByEmail(data.userEmail, data.userPassword);
                router.push(routes.dashboard);
                actions.resetForm();
                actions.setSubmitting(false);
            } catch (err) {
                console.error("[registration]", err)
            }
        }
    });

    return(
        <AuthContainer>
            <form className="Register" onSubmit={handleSubmit}>
                <InputText
                    className="Register__Input"
                    type="email" 
                    name="userEmail" 
                    id="userEmail" 
                    placeholder="Email"
                    onChange={handleChange} 
                    onBlur={handleBlur} 
                    value={values.userEmail}
                    errorMessage={errors.userEmail}
                    isError={!!errors.userEmail && touched.userEmail}/>

                <InputPassword
                    className="Register__Input"
                    name="userPassword" 
                    id="userPassword"
                    placeholder="Password"
                    onChange={handleChange} 
                    onBlur={handleBlur} 
                    value={values.userPassword}
                    errorMessage={errors.userPassword}
                    isError={!!errors.userPassword && touched.userPassword}/>

                <InputPassword
                    className="Register__Input"
                    name="userConfirmationPassword" 
                    id="userConfirmationPassword"
                    placeholder="Confirm your password"
                    onChange={handleChange} 
                    onBlur={handleBlur} 
                    value={values.userConfirmationPassword}
                    errorMessage={errors.userConfirmationPassword}
                    isError={!!errors.userConfirmationPassword && touched.userConfirmationPassword}/>

                <div className="Register__Footer">
                    <InputCheckbox 
                        label="I agree to the processing of my information" 
                        id="agreeCheckbox" 
                        handleChange={handleChange} 
                        isChecked={values.agreeCheckbox} 
                        isError={!!errors.agreeCheckbox}
                        isDisabled={false}
                        withLineThrough={false} />

                    <Btn className="Register__SubmitBtn" type="submit" isLoading={isSubmitting}>
                        Register
                    </Btn>
                </div>
            </form>
        </AuthContainer>
    );
};

export default Register;
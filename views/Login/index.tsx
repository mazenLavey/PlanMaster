"use client";

import { useContext } from "react";
import AuthContainer from "@/components/AuthContainer";
import Btn from "@/components/Btn";
import InputPassword from "@/components/InputPassword";
import InputText from "@/components/InputText";
import { AuthContext } from "@/contexts/AuthContext";
import routes from "@/routes";
import { loginSchema } from "@/schema/auth";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import "./index.scss";

const Login: React.FC = () => {
    const {signInUserByEmail} = useContext(AuthContext);
    const router = useRouter()

    const { values, handleChange, handleSubmit, handleBlur, errors, touched, isSubmitting } = useFormik({
        initialValues: {
            userEmail: '',
            userPassword: '',
        },
        validationSchema: loginSchema,
        onSubmit: async (data, actions) => {
            try {
                actions.setSubmitting(true);
                await signInUserByEmail(data.userEmail, data.userPassword);
                router.push(routes.dashboard);
                actions.resetForm();
                actions.setSubmitting(false);
            } catch (err) {
                console.error("[Login]", err)
            }
        }
    });

    return(
        <AuthContainer>
            <form className="Login" onSubmit={handleSubmit}>
                <InputText
                    className="Login__Input"
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
                    className="Login__Input"
                    name="userPassword" 
                    id="userPassword"
                    placeholder="Password"
                    onChange={handleChange} 
                    onBlur={handleBlur} 
                    value={values.userPassword}
                    errorMessage={errors.userPassword}
                    isError={!!errors.userPassword && touched.userPassword}/>

                <div className="Login__Footer">
                    <Btn className="Login__SubmitBtn" type="submit" isLoading={isSubmitting}>
                        Login
                    </Btn>
                </div>
            </form>
        </AuthContainer>
    );
};

export default Login;
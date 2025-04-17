import { ChangeEvent, FormEvent, use, useEffect, useState } from "react";
import { formSchema } from "../../schemas/formSchema";
import styles from "./Form.module.css"
import { Button } from "../Button/Button";


interface IErrorMessages{
    errorName:string
    errorEmail:string
    errorPassword:string
    errorConfirmPassword:string
}
export const Form = () => {

    const [buttonState,setButtonState]=useState(false);


    const [formValue,setFormValue]=useState({
        name:"",
        email:"",
        password:"",
        confirPassword:"",
    });

    const [errorMessages,setErrorMessages]=useState<IErrorMessages>({
        errorName:"",
        errorEmail:"",
        errorPassword:"",
        errorConfirmPassword:""
    });

    const validate = async () => {
        try {
            await formSchema.validate(formValue, { abortEarly: false });
            setErrorMessages({
                errorName: "",
                errorEmail: "",
                errorPassword: "",
                errorConfirmPassword: ""
            });
            setButtonState(true);
        } catch (error) {
            const newErrors: IErrorMessages = {
                errorName: "",
                errorEmail: "",
                errorPassword: "",
                errorConfirmPassword: ""
            };
            setButtonState(false);
            error.errors.forEach((errorElement: string) => {
                if (errorElement === "you must enter at least three characters" || errorElement === "name is required") {
                    newErrors.errorName = errorElement;
                }
                if (errorElement === "Enter a valid email" || errorElement === "email is required") {
                    newErrors.errorEmail = errorElement;
                }
                if (errorElement === "You must enter at least 6 characters." || errorElement === "Password is Required") {
                    newErrors.errorPassword = errorElement;
                }
                if (errorElement === "Passwords must match." || errorElement === "confirm password is required.") {
                    newErrors.errorConfirmPassword = errorElement;
                }
            });
            setErrorMessages(newErrors);
        }
    };
    

    const handleChange = async(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValue((prev) => ({ ...prev, [name]: value }));
    }

    useEffect(()=>{
        const testValidate=async()=>{
            await validate();
        }
        testValidate()
    },[formValue])

    const handleSubmit=(e:FormEvent)=>{
        e.preventDefault()
        console.log(formValue.name,formValue.email,formValue.password,formValue.confirPassword)
    }

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
        
        <label htmlFor="">name</label>
        <span className={errorMessages.errorName!==""?"showErrorMessage":"notShowErrorMessage"}>{errorMessages.errorName}</span>
        <input type="text" name="name" value={formValue.name} onChange={handleChange} />
        
        <label htmlFor="">email</label>
        <span className={errorMessages.errorEmail!==""?"showErrorMessage":"notShowErrorMessage"}>{errorMessages.errorEmail}</span>
        <input type="email" name="email" value={formValue.email} onChange={handleChange} />
        
        <label htmlFor="">password</label>
        <span className={errorMessages.errorPassword!==""?"showErrorMessage":"notShowErrorMessage"}>{errorMessages.errorPassword}</span>
        <input type="password" name="password" value={formValue.password} onChange={handleChange} />
        
        <label htmlFor="">confirm Password</label>
        <span className={errorMessages.errorConfirmPassword!==""?"showErrorMessage":"notShowErrorMessage"}>{errorMessages.errorConfirmPassword}</span>
        <input type="password" name="confirPassword" value={formValue.confirPassword} onChange={handleChange} />
        <Button state={buttonState}/>
    </form>
  )
}

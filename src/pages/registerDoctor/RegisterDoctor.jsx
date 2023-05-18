import styles from "../signUp/signUp.module.css";
import {useEffect, useState} from "react";
import {FormElement, TextField} from "../../components/formElements/FromElements";
import {inputTypes} from "../../imports/text";
import {apiEndpoint} from "../../api";
import {useNavigate} from "react-router-dom";
import {launchError} from "../layout/Layout";

const RegisterDoctor = () => {
    const [isSuper, setSuper] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setSuper(true);
    }, [])

    const signUp = (event) => {
        apiEndpoint('head-doctors/register-doctor')
            .post(event)
            .then(() => navigate('/dashboard'))
            .catch(err => launchError(err));
    }

    if (!isSuper)
        return (<></>);

    return (
        <>
            <div className={styles.wrap}>
                <div className={styles.center}>
                    <h1>Зареєструвати Лікаря</h1>
                    <FormElement action={signUp}>
                        <TextField viewName={"Пошта"} name={"email"} validationType={inputTypes.email}/>
                        <TextField viewName={"Пароль"} name={"password"} type={"password"}
                                   validationType={inputTypes.password}/>
                        <TextField viewName={"Ім'я"} name={"name"}/>
                        <TextField viewName={"Призвіще"} name={"surname"}/>
                        <TextField viewName={"Дата народження"} name={"date"}/>
                    </FormElement>
                </div>
            </div>
        </>
    )
}

export default RegisterDoctor;
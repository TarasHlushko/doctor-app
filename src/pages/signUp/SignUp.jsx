import styles from "./signUp.module.css";
import {Link, useNavigate} from "react-router-dom";
import {FormElement, TextField} from "../../components/formElements/FromElements";
import {inputTypes} from "../../imports/text";
import {apiEndpoint} from "../../api";
import {launchError} from "../layout/Layout";
import {Autocomplete} from "@mui/material";
import * as MUI from "@mui/material";
import {useEffect, useState} from "react";

const SignUp = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setDoctor] = useState(null);

    const signUp = data => {
        data.doctorId = selectedDoctor.id;
        apiEndpoint('auth/register-patient', false)
            .post(data)
            .then(() => navigate('/sign-in'))
            .catch(err => launchError(err));
    }

    useEffect(() => {
        apiEndpoint('doctors/get-all-doctors', false)
            .fetch()
            .then(res => setDoctors(res.data))
            .catch(err => launchError(err))
    }, [])

    return (
        <>
            <div className={styles.wrap}>
                <div className={styles.center}>
                    <h1>Зареєструватись</h1>
                    <FormElement action={signUp}>
                        <TextField viewName={"Пошта"} name={"email"} validationType={inputTypes.email}/>
                        <TextField viewName={"Пароль"} name={"password"} type={"password"}
                                   validationType={inputTypes.password}/>
                        <TextField viewName={"Ім'я"} name={"name"}/>
                        <TextField viewName={"Призвіще"} name={"surname"}/>
                        <TextField viewName={"Дата Народження"} name={"date"}/>
                        <Autocomplete
                            disablePortal
                            id="search"
                            onChange={(event, value) => setDoctor(value)}
                            options={doctors}
                            getOptionLabel={(option) => `${option.name} ${option['surname']}`}
                            sx={{width: '100%', marginBottom: '40px'}}
                            renderInput={(params) => <MUI.TextField {...params} label="Доктор"
                                                                    variant="standard"
                                                                    name={"doctor"}/>}
                        />
                    </FormElement>
                    <div className={styles.signup_link}>
                        Вже є аккаунт?
                        <Link to="/sign-in"> Увійти</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp;
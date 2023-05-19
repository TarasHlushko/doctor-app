import styles from './login.module.css';
import {Link, useNavigate} from "react-router-dom";
import {FormElement, TextField} from "../../components/formElements/FromElements";
import {inputTypes} from "../../imports/text";
import {apiEndpoint} from "../../api";
import {launchError} from "../layout/Layout";

const Login = () => {
    const navigate = useNavigate();

    const signIn = data => {
        apiEndpoint('auth/login', false)
            .post(data)
            .then(res => {
                localStorage.setItem('bearer_token', res.data.token);
                if (res.data.role === 'PATIENT')
                    navigate('/account');
                else if (res.data.role === 'DOCTOR' || res.data.role === 'HEAD_DOCTOR')
                    navigate('/dashboard');
            })
            .catch(err => launchError(err));
    }

    return (
        <>
            <div className={styles.wrap}>
                <div className={styles.center}>
                    <h1>Увійти</h1>
                    <FormElement action={signIn}>
                        <TextField viewName={"Пошта"} name={"email"} validationType={inputTypes.email}/>
                        <TextField viewName={"Пароль"} name={"password"} type={"password"}
                                   validationType={inputTypes.password}/>


                    </FormElement>
                    <div className={styles.signup_link}>
                        Не маєте аккаутна?
                        <Link to="/sign-up"> Зареєструватись</Link>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Login;
import ModalWindow from "../modalWindow/ModalWindow";
import styles from './addCustomerTest.module.css';
import * as React from "react";
import {TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {getFormData} from "../../imports/formValidation";
import {launchError, launchSuccess} from "../../pages/layout/Layout";
import {apiEndpoint} from "../../api";
import {useNavigate} from "react-router-dom";

const AddCustomerTest = ({isOpen, setOpen, user}) => {
    const [component, setComponent] = useState(null);
    const [event, setEvent] = useState(null);
    const [endpoint, setEndpoint] = useState(null);
    const navigate = useNavigate();

    const handleChange = (event) => {
        setEvent(event.target.value);
    }

    useEffect(() => {
        if (!component && user)
            setComponent(<Test1 setEndpoint={setEndpoint} value={{}} user={user}/>);
    }, [component, user])

    useEffect(() => {
        if (event) {
            switch (event) {
                case "Test1":
                    setComponent(<Test1 setEndpoint={setEndpoint} user={user} value={{}}/>);
                    break;
                case "Test2":
                    setComponent(<Test2 setEndpoint={setEndpoint} user={user} value={{}}/>);
                    break;
                case "Test3":
                    setComponent(<Test3 setEndpoint={setEndpoint} user={user} value={{}}/>);
                    break;
                case "Comment":
                    setComponent(<Comment setEndpoint={setEndpoint} userId={user.id}/>);
                    break;
                default:
                    return;
            }
        }
    }, [event])

    const handleSubmit = (event) => {
        event.preventDefault();

        apiEndpoint(endpoint)
            .post(getFormData(event.target))
            .then(res => {
                launchSuccess(res);
                navigate(0);
            })
            .catch(err => launchError(err));

    }

    if (!user) {
        return (<></>);
    }

    return (
        <>
            <ModalWindow isOpen={!!isOpen} setOpen={setOpen}>
                <div className={styles.title}>
                    {event === 'Comment' ? 'Додати Коментарій' : 'додати результат тесту'}
                </div>
                <div className={styles.selectTest}>
                    <TextField label={"Тест / Коментарій"} select
                               defaultValue={"Test1"} SelectProps={{native: true, onChange: handleChange}}>
                        <option value={"Test1"}>
                            {'Біохімічний Тест'}
                        </option>
                        <option value={"Test2"}>
                            {'Мікросудини'}
                        </option>
                        <option value={"Test3"}>
                            {'Артерії'}
                        </option>
                        <option value={"Comment"}>
                            {'Коментарій'}
                        </option>
                    </TextField>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.output}>
                        {component}
                    </div>
                    <div className={styles.save}>
                        <button className={styles.center} type={'submit'}>
                            Додати
                        </button>
                    </div>
                </form>
            </ModalWindow>
        </>
    )
}

export const Test1 = ({setEndpoint, value, user}) => {
    setEndpoint && setEndpoint(`tests/biochemical`);

    return (
        <>
            <div
                className={styles.subTitle}>{value ? 'Біохімічний Тест' : 'У пацієнта відсутній біохімічний тест'}</div>
            {
                value && (
                    <>
                        <TextField label={"BMI"} name={'bmi'} defaultValue={value.bmi}/>
                        <TextField label={"Waist Hips"} name={'waistHips'} defaultValue={value.waistHips}/>
                        <TextField label={"Gtt"} name={'gtt'} defaultValue={value.gtt}/>
                        <TextField label={"Vldl"} name={'vldl'} defaultValue={value.vldl}/>
                        <TextField label={"Urea"} name={'urea'} defaultValue={value.urea}/>
                        <TextField label={"Alt"} name={'alt'} defaultValue={value.alt}/>
                        <TextField label={"Alkaine"} name={'alkaine'} defaultValue={value.alkaine}/>
                        {user && <TextField label={"Вік"} name={'results'} defaultValue={user.age}/>}
                        {value.results && <TextField label={"Результат"} name={'results'} defaultValue={value.results}/>}
                        <TextField label={"User ID"} name={'patientId'} defaultValue={user.id} disabled/>
                    </>
                )
            }
        </>
    )
}

export const Test2 = ({setEndpoint, value, user}) => {
    setEndpoint && setEndpoint(`tests/microvessels`);

    return (
        <>
            <div className={styles.subTitle}>{value ? 'Мікросудини' : 'У пацієнта відсутній тест на мікросудини'}</div>
            {
                value && (
                    <>
                        <TextField label={"BMI"} name={'bmi'} defaultValue={value.bmi}/>
                        <TextField label={"Blood Flow"} name={'bloodFlow'} defaultValue={value.bloodFlow}/>
                        <TextField label={"Waist Hips"} name={'waistHips'} defaultValue={value.waistHips}/>
                        <TextField label={"Recovery Speed"} name={'recoverySpeed'} defaultValue={value.recoverySpeed}/>
                        <TextField label={"Platelets"} name={'platelets'} defaultValue={value.platelets}/>
                        {user && <TextField label={"Вік"} name={'results'} defaultValue={user.age}/>}
                        {value.results && <TextField label={"Результат"} name={'results'} defaultValue={value.results}/>}
                        <TextField label={"User ID"} name={'patientId'} defaultValue={user.id} disabled/>
                    </>
                )
            }
        </>
    )
}
export const Test3 = ({setEndpoint, value, user}) => {
    setEndpoint && setEndpoint(`tests/arteries`);

    return (
        <>
            <div className={styles.subTitle}>{value ? 'Артерії' : 'У пацієнта відсутній тест на артерії'}</div>
            {
                value && (
                    <>
                        <TextField label={"Pi"} name={'pi'} defaultValue={value.pi}/>
                        <TextField label={"Ved"} name={'ved'} defaultValue={value.ved}/>
                        <TextField label={"Ri"} name={'ri'} defaultValue={value.ri}/>
                        <TextField label={"Imc Bif"} name={'imcBif'} defaultValue={value.imcBif}/>
                        <TextField label={"Imc"} name={'imc'} defaultValue={value.imc}/>
                        {user && <TextField label={"Вік"} name={'results'} defaultValue={user.age}/>}
                        {value.results && <TextField label={"Результат"} name={'results'} defaultValue={value.results}/>}
                        <TextField label={"User ID"} name={'patientId'} defaultValue={user.id} disabled/>
                    </>
                )
            }
        </>
    )
}
export const Comment = ({setEndpoint, userId}) => {
    setEndpoint && setEndpoint(`doctors/patient/${userId}/add-comment`);

    return (
        <>
            <div className={styles.subTitle}>Коментарій</div>
            <TextField label={"Коментрарій"} name={'comment'}/>
        </>
    )
}
export default AddCustomerTest;
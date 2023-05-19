import ModalWindow from "../modalWindow/ModalWindow";
import styles from './compareCustomersModal.module.css';
import {TextField} from "@mui/material";
import * as React from "react";
import {Test1, Test2, Test3} from "../addCustomerTest/AddCustomerTest";

const CompareCustomersModal = ({isOpen, setOpen, testName}) => {
    if (!isOpen)
        return (<></>);

    return (
        <>
            <ModalWindow isOpen={!!isOpen} setOpen={setOpen}>
                <div className={styles.title}>
                    порівняти
                </div>
                <div className={styles.split}>
                    {
                        isOpen.map((value, index) => <MapUser details={value} key={'MapUser' + index}
                                                              testName={testName}/>)
                    }
                </div>
            </ModalWindow>
        </>
    )
}

export const MapComponent = (name, user) => {
    switch (name) {
        case "biochemical":
            return <Test1 value={user.biochemicalTests.reverse()[0]} user={user}/>;

        case "microvessels":
            return <Test2 value={user.microvesselsTests.reverse()[0]} user={user}/>;

        case "arteries":
            return <Test3 value={user.arteriesTests.reverse()[0]} user={user}/>;
        default:
            return;
    }
}

const MapUser = ({details, testName}) => {
    return (
        <>
            <div className={styles.wrap}>
                <div className={styles.subTitle}>Персональна Інформація</div>
                <div className={styles.info}>
                    <TextField label={"Ім'я"} defaultValue={details.name} InputProps={{readOnly: true}}/>
                    <TextField label={"Призвіще"} defaultValue={details['surname']}
                               InputProps={{readOnly: true}}/>
                    <TextField label={"Дата Народження"} defaultValue={details.date.toString()}
                               InputProps={{readOnly: true}}/>
                    <TextField label={"Пошта"} defaultValue={details.email} InputProps={{readOnly: true}}/>
                </div>
                <div className={styles.output}>
                    {MapComponent(testName, details)}
                </div>
            </div>
        </>
    )
}


export default CompareCustomersModal;
import {useEffect, useMemo, useState} from "react";
import styles from './account.module.css';
import * as React from "react";
import {CustomInput} from "../../components/formElements/FromElements";
import {Chart} from "react-charts";
import {apiEndpoint} from "../../api";
import {launchError} from "../layout/Layout";
import {TextField} from "@mui/material";

const Account = () => {
    const [user, setUser] = useState(null);
    const [test, setTest] = useState("None");

    useEffect(() => {
        apiEndpoint('patients/me')
            .fetch()
            .then(res => setUser(res.data))
            .catch(err => launchError(err));
    }, [])

    if (!user)
        return (<></>);
        console.log(user)
    return (
        <>
            <div>
                <Between/>
                <div className={styles.wrap}>
                    <div className={styles.flexColumns}>
                        <div className={styles.title}>Особиста Інформація</div>
                        <CustomInput label="Ім'я" value={user.name}/>
                        <CustomInput label="Призвіще" value={user['surname']}/>
                        <CustomInput label="День Народження" value={user.date.join("/")}/>
                        <CustomInput label="Пошта" value={user.email}/>
                    </div>
                    <div className={styles.flexColumns}>
                        <div className={styles.title}>Лікар</div>
                        <CustomInput label="Ім'я" value={user['doctor'].name}/>
                        <CustomInput label="Призвіще" value={user['doctor']['surname']}/>
                        <CustomInput label="Пошта" value={user['doctor'].email}/>
                    </div>
                </div>
                <Between/>
                <div className={styles.anotherWrap}>
                    <div className={styles.flexColumns}>
                        <div className={styles.title}>Тести</div>
                        {
                            user.biochemicalTests.map((value, index) => <MapDate key={'Biochemical Test ' + (index + 1)}
                                                                                 name={'Biochemical Tests ' + index}
                                                                                 value={value.results}
                                                                                 date={value.date}/>)
                        }
                        {
                            user.microvesselsTests.map((value, index) => <MapDate
                                key={'Micro-vessels Test ' + (index + 1)}
                                name={'Micro-vessels Test ' + index}
                                value={value.results}
                                date={value.date}/>)
                        }
                        {
                            user.arteriesTests.map((value, index) => <MapDate key={'Arteries Test ' + (index + 1)}
                                                                              name={'Arteries Test ' + index}
                                                                              value={value.results}
                                                                              date={value.date}/>)
                        }
                    </div>
                    <div className={styles.flexColumns}>
                        <div className={styles.title}>Коментарі</div>
                        {
                            user.comments.map((value, index) => <MapDate name={'Comment ' + (index + 1)}
                                                                         key={'Comment ' + (index + 1)}
                                                                         multiline={true}
                                                                         value={value.text} date={value.date}
                            />)
                        }
                    </div>
                </div>
                <Between/>
                <div>
                    <div className={styles.wrapSelect}>
                        <TextField label={"Select Test"} select defaultValue={"None"}
                                   SelectProps={{native: true, onChange: (event) => setTest(event.target.value)}}>
                            <option value={"Test1"}>
                                {'Біохімічний Тест'}
                            </option>
                            <option value={"Test2"}>
                                {'Мікросудини'}
                            </option>
                            <option value={"Test3"}>
                                {'Артерії'}
                            </option>
                            <option value={"None"}>
                                {'Хронологічний Вік'}
                            </option>
                        </TextField>
                    </div>
                    <div className={styles.chart}>
                        <GetChart user={user} test={test}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export const Between = () => {
    return <div className={styles.between}></div>;
}

const MapDate = ({name, value, date, multiline}) => {
    return (
        <>
            <div className={styles.mapDate}>
                <CustomInput label={name} value={value} multiline={multiline}/>
                <CustomInput label={"Date"} value={date ? date.join('/') : date}/>
            </div>
        </>
    )
}

const GetChart = ({user, test}) => {
    const [data, setData] = useState(null);
    const [isTest, setTest] = useState(false);

    useEffect(() => {
        setTest(true);
        const data = [{date: user.date.toString(), results: 0}, {
            date: user['date100'].toString(),
            results: 100
        }];

        switch (test) {
            case "Test1":
                setData([{
                    label: 'Біохімічний Тест',
                    data: user.biochemicalTests
                }, {
                    label: 'Біологічний вік',
                    data: data
                }]);
                break;
            case "Test2":
                setData([{
                    label: 'Мікросудиний Тест',
                    data: user.microvesselsTests
                }, {
                    label: 'Біологічний вік',
                    data: data
                }]);
                break;
            case "Test3":
                setData([{
                    label: 'Артеріальний Тест',
                    data: user.arteriesTests
                }, {
                    label: 'Біологічний вік',
                    data: data
                }]);
                break;
            default:
                setData([{
                    label: 'Біохімічний Тест',
                    data: user.biochemicalTests
                }, {
                    label: 'Мікросудиний Тест',
                    data: user.microvesselsTests
                }, {
                    label: 'Артеріальний Тест',
                    data: user.arteriesTests
                }, {
                    label: 'Хронологічний вік',
                    data: [{results: 0}, {results: 100}]
                }])
                setTest(false);
                break;
        }
    }, [test])

    const primaryAxis = useMemo(
        () => ({
            getValue: datum => isTest ? new Date(datum.date) : datum.results
        }), [isTest]);

    const secondaryAxes = useMemo(
        () => [{
            getValue: datum => datum.results,
            showDatumElements: true,
        }], []);

    if (!data)
        return (<></>);

    console.log(data);

    return (
        <>
            <Chart
                options={{
                    data,
                    primaryAxis,
                    secondaryAxes,
                    getDatumStyle: () =>
                        ({
                            circle: {r: 4},
                        }),
                }}
            />
        </>
    )
}

export default Account;



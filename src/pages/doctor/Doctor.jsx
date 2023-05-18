import styles from './doctor.module.css';
import * as React from "react";
import {Between} from "../account/Account";
import {CustomInput, CustomSelect} from "../../components/formElements/FromElements";
import {CustomerTable} from "../../components/customerTable/CustomerTable";
import {FormControlLabel, FormGroup, Switch} from "@mui/material";
import {useEffect, useState} from "react";
import CompareCustomersModal from "../../components/compareCustomersModal/CompareCustomersModal";
import AddCustomerTest from "../../components/addCustomerTest/AddCustomerTest";
import {useNavigate} from "react-router-dom";
import {launchError} from "../layout/Layout";
import {apiEndpoint} from "../../api";

const Doctor = () => {
    const [isSelect, setIsSelect] = useState(false);
    const [compare, setCompare] = useState(false);
    const [click, setClick] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [addTest, setAddTest] = useState(false);
    const [searchTerm, setSearchTerm] = useState(null);
    const [test, setTest] = useState('0');
    const [sort, setSort] = useState('0');
    const [data, setData] = useState(null);
    const [user, setUser] = useState(null);
    const [clients, setClients] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        apiEndpoint('doctors/me')
            .fetch()
            .then(res => setData(res.data))
            .catch(err => launchError(err));
    }, [])

    useEffect(() => {
        if (sort === '0' && test === '0')
            apiEndpoint('doctors/all-patients')
                .fetch()
                .then(res => setClients(res.data))
                .catch(err => launchError(err));
    }, [sort, test])

    useEffect(() => {
        if (sort === '0' && test === '0')
            return;

        apiEndpoint('doctors/filter')
            .post({ageGroup: sort === '0' ? {from: 0, to: 0} : JSON.parse(sort), test: test === '0' ? "" : test})
            .then(res => setClients(res.data))
            .catch(err => launchError(err));
    }, [test, sort])

    useEffect(() => {
        if (!searchTerm && searchTerm !== '')
            return;

        const delayDebounceFn = setTimeout(() => {
            apiEndpoint(`doctors/get-patient-by-first-letters`)
                .post({letters: searchTerm})
                .then(res => setClients(res.data))
                .catch(err => launchError(err));

            setSearchTerm(null);
        }, 1500)

        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm])

    useEffect(() => {
        if (!compare) {
            setClick(false);
        }
    }, [compare]);

    useEffect(() => {
        if (!addTest) {
            setUser(null);
        }
    }, [addTest])

    useEffect(() => {
        if (!user) {
            setAddTest(true);
        }
    }, [user])

    const handleInput = (event) => {
        setSearchTerm(event.target.value);
    }

    if (!data)
        return (<></>)

    return (
        <>
            <div>
                <Between/>
                <div className={styles.personalInfo}>
                    <div className={styles.title}>Особиста Інформація</div>
                    <div className={styles.inputGroup}>
                        <CustomInput label={"Ім'я"} value={data.name}/>
                        <CustomInput label={'Призвіще'} value={data['surname']}/>
                        <CustomInput label={'Пошта'} value={data.email}/>
                    </div>
                    {data.role === "HEAD_DOCTOR" ?
                        <div className={styles.link} onClick={() => navigate('/register-doctor')}>Додати
                            Лікаря</div> : <></>}
                </div>
                <Between/>
                <div className={styles.customers}>
                    <div className={styles.title}>Пацієнти</div>
                    <div className={styles.buttons}>
                        <div className={styles.section}>
                            <CustomInput label={"Пошук Пацієнтів"} onInput={handleInput}/>
                        </div>
                        <div className={styles.section}>
                            {confirm &&
                                <div className={`${styles.btn} ${test === '0' ? styles.disabled : ''}`}
                                     onClick={() => setClick(true)}>Підтвердити вибір</div>}
                            <div>
                                <FormGroup>
                                    <FormControlLabel control={<Switch color="default"/>} label={"Порівняти"}
                                                      style={{color: 'white'}}
                                                      onChange={e => setIsSelect(e.target['checked'])}
                                                      disabled={test === '0'}/>
                                </FormGroup>
                            </div>

                            <div>
                                <CustomSelect label="Сортувати" defaultValue={sort}
                                              onChange={(event) => setSort(event.target.value)}>
                                    <option value={JSON.stringify({from: 80, to: 100})}>
                                        {'За віком 80-100'}
                                    </option>
                                    <option value={JSON.stringify({from: 60, to: 80})}>
                                        {'За віком 60-80'}
                                    </option>
                                    <option value={JSON.stringify({from: 40, to: 60})}>
                                        {'За віком 40-60'}
                                    </option>
                                    <option value={JSON.stringify({from: 20, to: 40})}>
                                        {'За віком 20-40'}
                                    </option>
                                    <option value={JSON.stringify({from: 0, to: 20})}>
                                        {'За віком 0-20'}
                                    </option>
                                    <option value={'0'}>
                                        {'Без сортування'}
                                    </option>
                                </CustomSelect>
                            </div>
                            <div>
                                <CustomSelect label="Виберіть тест" defaultValue={test}
                                              onChange={(event) => setTest(event.target.value)}>
                                    <option value={"biochemical"}>
                                        {'Біохімічний Тест'}
                                    </option>
                                    <option value={"microvessels"}>
                                        {'Мікросудини'}
                                    </option>
                                    <option value={"arteries"}>
                                        {'Артерії'}
                                    </option>
                                    <option value={'0'}>
                                        {'Усі пацієнти'}
                                    </option>
                                </CustomSelect>
                            </div>
                        </div>
                    </div>
                    <CustomerTable isSelect={isSelect} setComparer={setCompare} click={click} setConfirm={setConfirm}
                                   setUser={setUser} data={clients}/>
                    <CompareCustomersModal isOpen={compare} setOpen={setCompare} testName={test}/>
                    <AddCustomerTest isOpen={addTest} setOpen={setAddTest} user={user}/>
                </div>
            </div>
        </>
    )
}

export default Doctor;
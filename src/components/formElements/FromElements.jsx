import styles from "./formElement.module.css";
import {setEvent, validateFrom} from "../../imports/formValidation";
import {inputTypes} from "../../imports/text";
import * as MUI from "@mui/material";
import * as React from "react";

export const TextField = ({name, viewName, onInput, type = "text", validationType = inputTypes.default}) => {
    return (
        <>
            <div className={styles.txtField}>
                <input type={type} className={styles.input}
                       name={name} data-validation={validationType}
                       placeholder={" "}
                       onInput={validationType === inputTypes.password ? setEvent : onInput}
                       required={true}/>
                <label className={styles.label}>{viewName}</label>
                <span className={styles.invalidText}></span>
                <span className={styles.span}></span>
            </div>
        </>
    )
}

export const SelectField = ({name, viewName, options, validationType = inputTypes.dropDown}) => {
    return (
        <>
            <div className={styles.txtField}>
                <select className={styles.input} name={name} data-validation={validationType} required>
                    {
                        options && options.map((value, index) =>
                            <option value={value.value} label={value.name}
                                    key={index + "select"}/>)
                    }
                </select>
                <label className={styles.label}>{viewName}</label>
                <span className={styles.span}></span>
            </div>
        </>
    )
}

export const FormElement = ({action, children}) => {
    const submitForm = event => {
        event.preventDefault();
        const response = validateFrom(event.target);
        if (response.isValid) {
            action(response.data);
        }
    }

    return (
        <>
            <form onSubmit={(e) => submitForm(e)} className={styles.form}>
                {children}
                <button className={styles.btn} type="submit">Далі</button>
            </form>
        </>
    )
}

const CssTextField = MUI.styled(MUI.TextField)({
    'input': {
        color: 'white',
    },
    'select': {
        color: 'black',
    },
    'textArea': {
        color: 'white',
    },
    '& label.Mui-focused': {
        color: 'white',
    },
    '& label': {
        color: 'white',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
        },
        '&:hover fieldset': {
            borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white',
        },
    },
});

export const CustomInput = ({label, onInput, value, multiline = false}) => {
    return (
        <CssTextField label={label} multiline={multiline} InputProps={{onInput: onInput, value: value}}/>
    );
}

export const CustomSelect = ({label, defaultValue, children, onChange}) => {
    return (
        <CssTextField label={label} select defaultValue={defaultValue}
                      SelectProps={{native: true, onChange: (event) => onChange(event)}}>
            {children}
        </CssTextField>
    );
}

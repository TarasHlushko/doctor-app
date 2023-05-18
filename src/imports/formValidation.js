import {inputTypes} from "./text";
import styles from "../components/formElements/formElement.module.css";

const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const lowerCaseLetters = /[a-z]/g;
const upperCaseLetters = /[A-Z]/g;
const numbers = /[0-9]/g;

export const validateInput = input => {
    const value = input.value;
    const response = {isValid: false, message: ""}
    switch (input.getAttribute("data-validation")) {
        case inputTypes.default:
            if (value.length < 3) {
                response.message = "Введіть хоча б 3 символи";
                response.isValid = false;
                return response;
            }

            response.message = "";
            response.isValid = true;
            return response;
        case inputTypes.email:
            if (!value.toLowerCase().match(emailPattern)) {
                response.message = "Невірний формат пошти";
                response.isValid = false;
                return response;
            }

            response.message = "";
            response.isValid = true;
            return response;
        case inputTypes.password:
            response.isValid = false;
            if (!value.match(lowerCaseLetters)) {
                response.message = "Має включати малі літери";
                return response;
            }
            if (!value.match(upperCaseLetters)) {
                response.message = "Має включати великі літери";
                return response;
            }
            if (!value.match(numbers)) {
                response.message = "Має включати цифру";
                return response;
            }
            if (value.length < 6) {
                response.message = "Мінімальна довжина 6 символів";
                return response;
            }

            response.message = "";
            response.isValid = true;
            return response;
        default:
            return response;
    }
}

export const validateFrom = form => {
    const formResponse = {isValid: true, data: {}}

    for (const element of form.elements) {
        if (element.tagName === "SELECT") {
            formResponse.data[element.name] = element.value;
            continue;
        }

        if (element.tagName !== "INPUT")
            continue;

        if (element.id.toLowerCase().includes('search')) {
            if (element.value.length > 0)
                formResponse.data[element.name] = {name: element.value};
            continue;
        }


        const response = validateInput(element);

        if (!response.isValid) {
            element.parentElement.classList.add(styles.invalid);
            element.nextSibling.nextSibling.textContent = response.message;
            element.addEventListener("input", setEvent);

            formResponse.isValid = false;
        } else
            formResponse.data[element.name] = element.value;
    }

    return formResponse;
}

export const getFormData = form => {
    let data = {};

    for (const element of form.elements) {
        if (element.tagName === "BUTTON" || element.name === "" || element.id === 'search')
            continue;
        
        if (element.name === 'comment')
            data = element.value;

        else
            data[element.name] = element.value;
    }

    return data;
}

export const setEvent = (event) => {
    const element = event.target;
    const response = validateInput(element);

    if (response.isValid) {
        element.parentElement.classList.remove(styles.invalid);
        element.nextSibling.nextSibling.textContent = "";
    } else {
        element.parentElement.classList.add(styles.invalid);
        element.nextSibling.nextSibling.textContent = response.message;
    }
}
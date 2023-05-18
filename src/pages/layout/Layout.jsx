import {Outlet} from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import NavBar from "../../components/navbar/Navbar";

export const launchToast = (message, messageType) => {
    (messageType && toast[messageType]) ? toast[messageType](message) : toast(message);
}

export const launchError = (error) => {
    if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
    } else
        toast.error('Unknown Error');
}

export const launchSuccess = (response) => {
    if (response?.data?.message) {
        toast.success(response.data.message);
    } else if (response?.data) {
        toast.success(response.data);
    } else
        toast.success('Success');
}

const Layout = () => {
    return (
        <>
            <ToastContainer/>
            <NavBar/>
            <Outlet/>
        </>
    )
}

export default Layout;

import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./pages/layout/Layout";
import Login from "./pages/login/Login";
import SignUp from "./pages/signUp/SignUp";
import Account from "./pages/account/Account";
import './app.css';
import Doctor from "./pages/doctor/Doctor";
import RegisterDoctor from "./pages/registerDoctor/RegisterDoctor";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Layout/>}>
                    <Route index element={<Login/>}/>
                    <Route path={'/sign-in'} element={<Login/>}/>
                    <Route path={'/sign-up'} element={<SignUp/>}/>
                    <Route path={'/account'} element={<Account/>}/>
                    <Route path={'/dashboard'} element={<Doctor/>}/>
                    <Route path={'/register-doctor'} element={<RegisterDoctor/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

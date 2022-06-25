import HeaderComponent from "./HeaderComponent";
import HomeComponent from "./HomeComponent";
import {Route, Routes,Navigate} from "react-router-dom";
import ProductsComponent from "./ProductsComponent";
import {useState} from "react";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const MainComponent = () => {


    return (
        <div className=''>
            <HeaderComponent/>
            <Routes>
                <Route path='/' element={<HomeComponent/>}/>
                <Route path='product' element={<ProductsComponent/>}/>
                <Route path='login' element={<LoginScreen/>}/>
                <Route path='register' element={<RegisterScreen/>}/>



            </Routes>
        </div>
    );
};

export default MainComponent;
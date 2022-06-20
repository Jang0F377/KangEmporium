import HeaderComponent from "./HeaderComponent";
import HomeComponent from "./HomeComponent";
import {Route, Routes,Navigate} from "react-router-dom";
import ProductsComponent from "./ProductsComponent";
import {useState} from "react";

const MainComponent = () => {


    return (
        <div>
            <HeaderComponent/>
            <Routes>
                <Route path='/' element={<HomeComponent/>}/>
                <Route path='product' element={<ProductsComponent/>}/>


            </Routes>
        </div>
    );
};

export default MainComponent;
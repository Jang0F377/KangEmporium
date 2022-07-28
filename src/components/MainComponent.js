import HeaderComponent from "./HeaderComponent";
import HomeComponent from "./HomeComponent";
import { Route, Routes } from "react-router-dom";
import ProductsComponent from "./ProductsComponent";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import DetailedProductScreen from "../screens/DetailedProductScreen";
import ViewCartScreen from "../screens/ViewCartScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import ViewCartScreenTW from "../screens/ViewCartScreenTW";

const MainComponent = () => {
  return (
    <div className="bg-background-primary bg-main">
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="product" element={<ProductsComponent />} />
        <Route path="login" element={<LoginScreen />} />
        <Route path="register" element={<RegisterScreen />} />
        <Route path="product/:name" element={<DetailedProductScreen />} />
        <Route path="cart" element={<ViewCartScreenTW />} />
        <Route path="checkout" element={<CheckoutScreen />} />
      </Routes>
    </div>
  );
};

export default MainComponent;

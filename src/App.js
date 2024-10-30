import "./App.css";
import Login from "./Screen/Login";
import Products from "./Screen/Products";
import AddProduct from "./Screen/AddProduct";
import InsertProduct from "./Screen/InsertProduct";
import UpdateProduct from "./Screen/UpdateProduct";
import UserManage from "./Screen/UserManage";
import Orders from "./Screen/Orders";
import Charts from "./Screen/Charts";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import React, { useState } from "react";

function App() {
  // đọc thông tin admin từ localStorage
  const getAdminFromLocalStarge = () => {
    const adminInfo = localStorage.getItem("admin");
    if (adminInfo) {
      return JSON.parse(adminInfo);
    }
    return null;
  };
  // lưu thông tin vào LocalStorage
  const saveAdminInfo = (adminInfo) => {
    if (!adminInfo) {
      localStorage.removeItem("admin");
      setAdmin(null);
    } else {
      localStorage.setItem("admin", JSON.stringify(adminInfo));
      setAdmin(adminInfo);
    }
  };

  //Route không cần login
  const PublicRoute = () => {
    if (admin) {
      //nếu đã login thì vào trang chủ
      return <Navigate to="/userManage" />;
    }
    return <Outlet />; // cho đi tiếp
  };

  //các Route cần login
  const PrivateRoute = () => {
    if (!admin) {
      return <Navigate to="/" />;
    }
    return <Outlet />;
  };
  //useState admin
  const [admin, setAdmin] = useState(getAdminFromLocalStarge());
  return (
    <Router>
      <Routes>
        <Route element={<PublicRoute/>}>
          <Route path="/" element={<Login saveAdmin = {saveAdminInfo} />} />
        </Route>
        <Route element={<PrivateRoute/>}>
          <Route path="/userManage" element={<UserManage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/add-Product" element={<AddProduct />} />
          <Route path="/insert-Product" element={<InsertProduct />} />
          <Route path="/update-Product/:id" element={<UpdateProduct />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/charts" element={<Charts />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

import React, { useState } from "react";
// import styled from 'styled-components';
import "../Screen/Login.css";
import logo from "../assets/images/logo.png";
import logo2 from "../assets/images/logoBlue.png";
import eyesoff from "../assets/images/eyesoff.png";
import Swal from 'sweetalert2'

function Login(props) {
  const { saveAdmin } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminID, setAdminID] = useState();

  const handleLogin = async () => {
    try {
      const body = {
        email: email,
        password: password,
        adminID: adminID
      }
      console.log(body); 
      const response = await fetch('https://api-h89c.onrender.com/admins/loginAdmin',{
        method: 'POST',
        headers:{
           'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)  
      });
      const result = await response.json();
      if (result.status) {
            //lưu vào storage;
      saveAdmin(result.data);
      }
      else{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Đăng nhập không thành công!",
      });
      }
  
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="headers">
        <div className="logoContainer">
          <img className="logoimg" src={logo} alt="logo" />
          <span className="text-logo">The Mini Store</span>
        </div>
        <p className="title">Đăng nhập</p>
        <p className="titleRight">Bạn cần hỗ trợ?</p>
      </div>
      <div className="body">
        <div className="logo2Container">
          <img className="logoimg2" src={logo2} alt="logo2" />
          <span className="text-logo2">The Mini Store</span>
        </div>
        <div className="login-Container">
          <div className="textF-Container">
            <h1 className="text-login">Đăng nhập </h1>
            <p className="text-loginR"> , để tiếp tục sử dụng</p>
          </div>
          <div className="inputLogin">
            <div className="inside-input">
              <label className="label">Địa chỉ email</label>
              <input
                className="input"
                placeholder="Nhập địa chỉ email"
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div className="inside-input">
              <label className="label">Mật khẩu</label>
              <div className="input-password">
                <input
                  className="input"
                  placeholder="Nhập password"
                  type="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
                <img className="icon-eyesoff" src={eyesoff} alt="" />
              </div>
            </div>
            <div className="inside-input">
              <label className="label">ID Admin</label>
              <input
                className="input"
                placeholder="Nhập id admin"
                
                value={adminID}
                onChange={(e)=>setAdminID(e.target.value)}
              />
            </div>
            <button onClick={handleLogin} className="btn-login">Đăng nhập </button>
            <a href="##" className="forgot-password">
              Quên mật khẩu?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

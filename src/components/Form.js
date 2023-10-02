import React, { useState } from "react";
import { Link, useNavigate, Navigate, Outlet } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Private = () => {
    const auth = localStorage.getItem("user");
    return auth ? <Outlet /> : <Navigate to="/signup" />
}

//signup

export const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setcPassword] = useState("");
    const [error, setError] = useState(false);
    const [username, setUserName] = useState({});
    const [check, setCheck] = useState(null);





    const navigate = useNavigate();

    const isValidEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email)
    }
    const isValidPassword = (password) => {
        const passwordPattern = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
        const alphabeticPattern = /[a-zA-Z]+/;
        return passwordPattern.test(password) && alphabeticPattern.test(password);
    }
      

    const collectData = async () => {


        if (!name || !isValidEmail(email) || !phone || !isValidPassword(password) || !cpassword || password !== cpassword) {
            setError(true)
            return false
        }
        if( !check === true){
            setError(true)
            return false
        }
        let result = await fetch("http://localhost:5000/signup/", {
            method: "post",
            body: JSON.stringify({ name, email, phone, password }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        result = await result.json();
        if (result.user) {
            setUserName(result)
            toast.success(`Welcome , ${result.user.name}  Account Create Successfully `, {
                position: "top-center",
                autoClose: 2000,
                theme: "colored",
            });
            if (result.user && check === true) {
                localStorage.setItem("user", JSON.stringify(result.user));
                setTimeout(() => navigate("/"), 3000)

            }
        } else if (result.exists) {
            toast.success(`Sorrry , This Data Already Exists `, {
                position: "top-center",
                autoClose: 2000,
            });
        }
    }


    return (
        <div className="signup-form">
            <div className="regiter-form">
                <div className="containers">
                    <h1>Registration</h1>
                    <input className="input-box" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
                    {error && !name && <span className="error">Enter valid name</span>}

                    <input className="input-box" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
                    {error && !email && <span className="error">Enter valid Email</span>}
                    {isValidEmail(email) ? null : error && email && <span className="error">Invalid Email-  @gmail.com</span>}

                    <input className="input-box" type="number" value={phone}  onChange={(e) => setPhone(e.target.value)} placeholder="Mobile number" required maxLength={10}/>

                    {error && phone.length < 10 &&  <span className="error">Enter valid Number</span>}
                    {error && phone.length > 12 && <span className="error">Enter valid Number</span>}

                    <input className="input-box" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />

                    {/* {error && password.length < 8 && <span className="error">Enter mini 8 char...</span>} */}
                    {isValidPassword(password) && !password.length < 8 ?null : error && password && <span className="error">Enter Alphabatic & Special & 8 Char...</span>}

                    <input className="input-box" type="password" value={cpassword} onChange={(e) => setcPassword(e.target.value)} placeholder="Confrim password" />

                    {error && password !== cpassword && <span className="error">Do not match Password</span>}
                    {setError && password  === cpassword && <span className="succes">Matched Password </span>}

                    <label className=" check">
                        <input className="input-check" type="checkbox" onChange={(e) => { setCheck(e.target.checked) }} />
                        {<Link to="/Termcondition"><span className="suces">T&C Apply</span></Link>}

                    </label>
                    {check === true ? null : error && <span className="error">Checked Box Empty</span>}

                    <button onClick={collectData} className="appButton" type="button">Signup</button>

                    <h6 className="login-form">Already Register {<Link to="/login">Login</Link>}</h6>
                </div>
            </div>
            {username ? <ToastContainer limit={1} /> : null}
        </div>
    )
}

// ******************************************************************************************************************************************                                          ********** LOGIN CODE *********                                                              ******************************************************************************************************************************************


export const Login = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState(email);
    const [phone, setPhone] = React.useState("");
    const [error, setError] = React.useState(false);
    const [username, setUserName] = React.useState({});
    // const [check, setCheck] = useState(null);
    const navigate = useNavigate();





    const promiseAlert = (result) => {
        localStorage.setItem("user", JSON.stringify(result.user));
        setTimeout(() => navigate("/"), 2000)
        const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 1000));
        toast.promise(
            resolveAfter3Sec,
            {
                pending: `Checking Data`,
                success: `Welcome  ${result.user.name}  Successfully Login 👌`,
            }
        )
    };

    const showAlert = (data) => {
        toast.error(data, {
            position: "top-center",
            autoClose: 2000,
            theme: "colored",
        });
    };


    const handelLogin = async () => {

        if ((!email) && !password) {
            setError(true)
            return false;
        }
        // if (!check == true) {
        //     setError(true)
        //     return false
        // }

        if (/\S+@\S+\.\S+/.test(email)) {
            let result = await fetch("http://localhost:5000/login/", {
                method: "post",
                body: JSON.stringify({ email, password }),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });
            result = await result.json();
            if (result.user) {
                setUserName(result)
                promiseAlert(result);
            }
            else if (result.WrongPassword === true) {
                showAlert("Wrong Password");
            }
            else if (result.verified === false) {
                showAlert("You aren't Verified");
            }
            else {
                showAlert("You aren't registerd");
            }

        }

        else {
            setPhone(email)
            let result = await fetch("http://localhost:5000/login/", {
                method: "post",
                body: JSON.stringify({ phone, password }),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });
            result = await result.json();
            // console.log(result,"login....................")
            if (result.user) {
                setUserName(result)
                promiseAlert(result);
            }
            else if (result.WrongPassword === true) {
                showAlert("Wrong Password");
            }
             else if (result.verified === false) {
                showAlert("You aren't Verified");
            }
            else {
                showAlert("You aren't registerd");
            }
        }
    }
    return (
        <div className="signup-form">
            <div className="regiter-form">
                <div className="containers">
                    <h1>Login Form</h1>
                    <input className="input-box" type="text"
                        onChange={(e) => setEmail(e.target.value) || setPhone(e.target.value)} placeholder="Enter Email or Phone" />
                    {error && !email && <span className="error">!Email not blank</span>}

                    <input className="input-box" type="password" value={password}
                        onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    {error && !password && <span className="error">!Password not blank </span>}

                    {/* <label className=" check">
                        <input className="input-check" type="checkbox" onChange={(e) => { setCheck(e.target.checked) }} />
                        {check == true ? <p className="succes"> T&C Apply</p> : <Link to="/Termcondition"> <span className="suces">T&C Apply</span></Link>}

                    </label>
                    {check == true ? null : error && <span className="error">Checked Box Empty</span>} */}

                    <button onClick={handelLogin} className="appButton" type="button">Login</button>
                    <h6 className="login-form"> Register Now -{<Link to="/signup">Signup</Link>}</h6>
                </div>
            </div>
            {username ? <ToastContainer limit={1} position="top-center" theme="colored" autoClose={1000} /> : null}
        </div>
    )

}



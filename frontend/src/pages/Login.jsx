import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./Login.css";

function Login() {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async (e) => {

        e.preventDefault();


        try {

            const response = await API.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );


            console.log(response.data);


            localStorage.setItem(
                "token",
                response.data.token
            );


            navigate("/dashboard");

        } catch (error) {


            console.log(error);


            alert(
                error.response?.data?.message ||
                "Login failed"
            );


        }

    };


    return (

        <div className="login-page">
    
    
            <div className="login-card">
    
    
                <h1>
                    🎓 CollegeAPI
                </h1>
    
    
                <h2>
                    Login
                </h2>
    
    
                <form onSubmit={handleLogin}>
    
    
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
    
    
    
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
    
    
    
                    <button type="submit">
                        Login
                    </button>
    
    
                </form>
    
    
            </div>
    
    
        </div>
    
    );

}


export default Login;
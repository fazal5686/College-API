import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

    return (

        <nav className="navbar">

            <div className="logo">
                🎓 CollegeAPI
            </div>


            <ul className="nav-links">

                <li>
                    <Link to="/">
                        Home
                    </Link>
                </li>


                <li>
                    <a href="#about">
                        About
                    </a>
                </li>


                <li>
                    <a href="#features">
                        Features
                    </a>
                </li>


                <li>
                    <a href="#contact">
                        Contact
                    </a>
                </li>


                <li>
    <Link 
        className="nav-login"
        to="/login"
    >
        Login
    </Link>
</li>


            </ul>

        </nav>

    );

}


export default Navbar;
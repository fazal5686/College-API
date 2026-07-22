import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Home.css";


function Home() {

    return (

        <div className="home">


            <Navbar />


            {/* Hero Section */}

            <header className="hero">

                <h1>
                    🎓 CollegeAPI
                </h1>


                <h2>
                    Student Management System
                </h2>


                <p>
                    A modern MERN Stack application designed to manage
                    students, users, and academic records securely.
                </p>


                <Link to="/login">

                    <button className="login-btn">
                        Get Started
                    </button>

                </Link>


            </header>



            {/* About Section */}

            <section id="about" className="about">

                <h2>
                    About CollegeAPI
                </h2>


                <p>
                    CollegeAPI is a full-stack college management system
                    built using MongoDB, Express.js, React.js, and Node.js.
                    It provides secure authentication and efficient student
                    record management.
                </p>

            </section>




            {/* Features Section */}

            <section id="features" className="features">


                <h2 className="section-title">
                    Our Features
                </h2>


                <div className="feature-container">


                    <div className="feature-card">

                        <h3>
                            👨‍🎓 Student Management
                        </h3>

                        <p>
                            Add, view, update and manage student records
                            easily.
                        </p>

                    </div>



                    <div className="feature-card">

                        <h3>
                            🔐 Secure Authentication
                        </h3>

                        <p>
                            JWT based login system with protected routes.
                        </p>

                    </div>




                    <div className="feature-card">

                        <h3>
                            ⚡ MERN Technology
                        </h3>

                        <p>
                            Built with MongoDB, Express, React and Node.js.
                        </p>

                    </div>


                </div>


            </section>





            {/* Contact Section */}

            <section id="contact" className="contact">


                <h2>
                    Contact Us
                </h2>


                <p>
                    Email: support@collegeapi.com
                </p>


                <p>
                    Location: Pakistan
                </p>


            </section>





            {/* Footer */}

            <footer className="footer">


                <p>
                    🎓 CollegeAPI
                </p>


                <p>
                    MERN Stack Student Management System
                </p>


                <p>
                    © 2026 CollegeAPI. All Rights Reserved.
                </p>


            </footer>



        </div>

    );

}


export default Home;
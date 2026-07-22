import { useEffect, useState } from "react";
import API from "../api/axios";
import "./Dashboard.css";

import { useNavigate } from "react-router-dom";
function Dashboard() {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleLogout = () => {

        localStorage.removeItem("token");
    
        navigate("/login");
    
    };
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this student?"
        );
    
    
        if (!confirmDelete) return;
    
    
        try {
    
            const token = localStorage.getItem("token");
    
    
            await API.delete(
                `/students/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
    
    
            setStudents(
                students.filter(
                    student => student._id !== id
                )
            );
    
    
            alert("Student deleted successfully");
    
    
        } catch(error) {
    
            console.log(error);
    
            alert(
                error.response?.data?.message ||
                "Delete failed"
            );
    
        }
    
    };
    useEffect(() => {

        const fetchStudents = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await API.get("/students", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });


                setStudents(response.data.data.students);


            } catch (error) {

                console.log(error);

            }

        };


        fetchStudents();

    }, []);



    return (

        <div className="dashboard-container">

            <h1>Welcome to CollegeAPI Dashboard</h1>

            <h3 className="success">
                Login Successful ✅
            </h3>
            <div className="stats-container">


    <div className="stat-card">

        <h3>
            👨‍🎓 Total Students
        </h3>

        <h1>
            {students.length}
        </h1>

    </div>



    <div className="stat-card">

        <h3>
            📚 CollegeAPI
        </h3>

        <h1>
            Active
        </h1>

    </div>


</div>

            <button 
    className="logout-btn"
    onClick={handleLogout}
>
    Logout
</button>
            <div className="card">

            <h2>
    Students List
</h2>


<button onClick={() => navigate("/add-student")}>
    + Add Student
</button>

                <table>

                    <thead>

                    <tr>

<th>ID</th>

<th>Name</th>

<th>Gender</th>

<th>Age</th>

<th>Class</th>

<th>Email</th>

<th>Phone</th>
<th>Photo</th>

<th>Action</th>

</tr>

                    </thead>


                    <tbody>

                        {
                            students?.map((student) => (

                                <tr key={student._id}>


                            <td>
                                {student.id}
                            </td>


                            <td>
                                {student.name}
                            </td>


                            <td>
                                {student.gender}
                            </td>


                            <td>
                                {student.age}
                            </td>


                            <td>
                                {student.class}
                            </td>


                            <td>
                                {student.email}
                            </td>


                            <td>
                                {student.phone}
                            </td>
                            <td>
    {student.photo ? (
        <img
            src={`http://localhost:5001/${student.photo}`}
            alt={student.name}
            width="60"
            height="60"
            style={{
                cursor: "pointer",
                borderRadius: "5px"
            }}
            onClick={() =>
                setSelectedImage(
                    `http://localhost:5001/${student.photo}`
                )
            }
        />
    ) : (
        "No Photo"
    )}
</td>

                            <td>

    <button
        className="edit-btn"
        onClick={() =>
            navigate(`/edit-student/${student._id}`)
        }
    >
        ✏️ Edit
    </button>


    <button
        className="delete-btn"
        onClick={() => handleDelete(student._id)}
    >
        🗑 Delete
    </button>

</td>


</tr>

                            ))
                        }

                    </tbody>


                </table>

            </div>
            {selectedImage && (

<div
    className="image-modal"
    onClick={() => setSelectedImage(null)}
>

    <img
        src={selectedImage}
        alt="Student"
        className="modal-image"
    />

</div>

)}

        </div>

    );

}


export default Dashboard;
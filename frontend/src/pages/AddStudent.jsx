import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";


function AddStudent() {


    const navigate = useNavigate();


    const [student, setStudent] = useState({

        id: "",
        name: "",
        gender: "",
        age: "",
        class: "",
        email: "",
        phone: "",
        address: ""
    
    });



    const handleChange = (e) => {

        setStudent({

            ...student,
            [e.target.name]: e.target.value

        });

    };



    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            const token = localStorage.getItem("token");
            console.log("Sending student data:", student);

            await API.post(
                "/students",
                student,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            alert("Student Added Successfully");


            navigate("/dashboard");


        } catch(error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to add student"
            );

        }

    };



    return (

        <div>

            <h1>Add New Student</h1>


            <form onSubmit={handleSubmit}>
            <input
    name="id"
    type="number"
    placeholder="Student ID"
    value={student.id}
    onChange={handleChange}
/>

<br /><br />

            <select
    name="gender"
    value={student.gender}
    onChange={handleChange}
>

    <option value="">
        Select Gender
    </option>

    <option value="Male">
        Male
    </option>

    <option value="Female">
        Female
    </option>

</select>

<br/><br/>


<input
    name="name"
    placeholder="Student Name"
    value={student.name}
    onChange={handleChange}
/>

<br/><br/>

<input
    name="age"
    placeholder="Age"
    value={student.age}
    onChange={handleChange}
/>

<br/><br/>


<input
    name="class"
    placeholder="Class"
    value={student.class}
    onChange={handleChange}
/>

<br/><br/>


<input
    name="email"
    placeholder="Email"
    value={student.email}
    onChange={handleChange}
/>

<br/><br/>


<input
    name="phone"
    placeholder="Phone (11 digits)"
    value={student.phone}
    onChange={handleChange}
/>

<br/><br/>


<input
    name="address"
    placeholder="Address"
    value={student.address}
    onChange={handleChange}
/>
                <br/><br/>


                <button type="submit">
                    Add Student
                </button>


            </form>


        </div>

    );

}


export default AddStudent;
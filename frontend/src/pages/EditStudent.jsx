import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";


function EditStudent() {


    const { id } = useParams();

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



    // Fetch Existing Student

    useEffect(() => {


        const fetchStudent = async () => {


            try {


                const token = localStorage.getItem("token");


                const response = await API.get(
                    `/students/${id}`,
                    {
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    }
                );


                setStudent(response.data.data);

            } catch(error) {


                console.log(error);


            }


        };


        fetchStudent();


    }, [id]);




    // Update Student

    const handleUpdate = async (e) => {


        e.preventDefault();


        try {


            const token = localStorage.getItem("token");


            await API.put(

                `/students/${id}`,

                student,

                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }

            );


            alert("Student Updated Successfully");


            navigate("/dashboard");


        } catch(error) {


            console.log(error);


            alert(
                error.response?.data?.message ||
                "Update failed"
            );


        }


    };




    return (

        <div>


            <h1>
                Edit Student
            </h1>



            <form onSubmit={handleUpdate}>


                <input
                    name="name"
                    placeholder="Student Name"
                    value={student.name}
                    onChange={(e)=>
                        setStudent({
                            ...student,
                            name:e.target.value
                        })
                    }
                />

                <br/><br/>


                <select
                    name="gender"
                    value={student.gender}
                    onChange={(e)=>
                        setStudent({
                            ...student,
                            gender:e.target.value
                        })
                    }
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
                    name="age"
                    placeholder="Age"
                    value={student.age}
                    onChange={(e)=>
                        setStudent({
                            ...student,
                            age:e.target.value
                        })
                    }
                />


                <br/><br/>


                <input
                    name="class"
                    placeholder="Class"
                    value={student.class}
                    onChange={(e)=>
                        setStudent({
                            ...student,
                            class:e.target.value
                        })
                    }
                />


                <br/><br/>


                <input
                    name="email"
                    placeholder="Email"
                    value={student.email}
                    onChange={(e)=>
                        setStudent({
                            ...student,
                            email:e.target.value
                        })
                    }
                />


                <br/><br/>


                <input
                    name="phone"
                    placeholder="Phone"
                    value={student.phone}
                    onChange={(e)=>
                        setStudent({
                            ...student,
                            phone:e.target.value
                        })
                    }
                />


                <br/><br/>


                <input
                    name="address"
                    placeholder="Address"
                    value={student.address}
                    onChange={(e)=>
                        setStudent({
                            ...student,
                            address:e.target.value
                        })
                    }
                />


                <br/><br/>


                <button type="submit">

                    Update Student

                </button>


            </form>


        </div>

    );

}


export default EditStudent;
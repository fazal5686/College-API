import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import {
    addStudent,
    updateStudent
} from "../services/studentService";


function StudentForm({
    editStudent,
    setEditStudent,
    refresh,
    setRefresh
}) {

    const [student, setStudent] = useState({
        
        id: "",
        name: "",
        gender: ""

    });

    const idInputRef = useRef(null);


    useEffect(() => {

        if (editStudent) {

            setStudent(editStudent);

        }

    }, [editStudent]);

    useEffect(() => {

        idInputRef.current?.focus();
    
    }, []);



    const handleChange = (e) => {

        setStudent({

            ...student,

            [e.target.name]:
            e.target.name === "name"
                ? e.target.value.replace(/^\s+/, "")
                : e.target.value

        });

    };





    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            // Validate Student ID
if (!student.id) {
    toast.error("Student ID is required");
    return;
}

if (Number(student.id) <= 0) {
    toast.error("Student ID must be greater than 0");
    return;
}

// Validate Name
if (!student.name.trim()) {
    toast.error("Student Name is required");
    return;
}

if (student.name.trim().length < 3) {
    toast.error("Student Name must be at least 3 characters");
    return;
}

// Validate Gender
if (!student.gender) {
    toast.error("Please select a gender");
    return;
}

            if (editStudent) {


                await updateStudent(
                    editStudent._id,
                    student
                );


                toast.success("Student Updated Successfully");


                setEditStudent(null);



            }

            else {

                await addStudent(student);
                

                toast.success("Student Added Successfully");


            }



            setStudent({

                id: "",
                name: "",
                gender: ""
            
            });
            
            setRefresh(!refresh);
            
            setTimeout(() => {
            
                idInputRef.current?.focus();
            
            }, 100);
            
            

        }


        catch (error) {


            console.log(error);

            toast.error(
                error.response?.data?.message || "Operation Failed"
            );


        }


    };






    return (


        <div className="card">


            <h2>

                {
                    editStudent
                        ? "Edit Student"
                        : "Add New Student"
                }

            </h2>




            <form onSubmit={handleSubmit}>


            <input

ref={idInputRef}

type="number"
min="1"
name="id"

placeholder="Student ID"

value={student.id}

onChange={handleChange}

disabled={editStudent ? true : false}

/>



                    <input
                        type="text"
                        name="name"
                        placeholder="Student Name"
                        value={student.name}
                        onChange={handleChange}
                        maxLength={50}
                    />



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




                <button

                    className="saveBtn"

                    type="submit"

                >

                    {

                        editStudent

                            ? "Update Student"

                            : "Save Student"

                    }


                </button>



            </form>


        </div>


    );


}



export default StudentForm;
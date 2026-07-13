import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
    getStudents,
    deleteStudent
} from "../services/studentService";


function StudentTable({ setEditStudent, refresh }) {

    const [search, setSearch] = useState("");
    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const studentsPerPage = 5;
    const filteredStudents = students.filter((student) => {
        const text = search.trim().toLowerCase();
    
        return (
            student.id.toString().includes(text) ||
            (student.name || "").toLowerCase().includes(text) ||
            (student.gender || "").trim().toLowerCase() === text
        );
    });
    const indexOfLastStudent = currentPage * studentsPerPage;

const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
);
const totalPages = Math.ceil(
    filteredStudents.length / studentsPerPage
);
const pageNumbers = [];

for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
}

    const loadStudents = () => {


        getStudents()
    .then((response) => {

        setStudents(response.data);

    })
    .catch((error) => {

        console.log(error);
        toast.error("Unable to load students");

    });

    };



    useEffect(() => {

        loadStudents();
    
    }, [refresh]);

    const nextPage = () => {

        if (currentPage < totalPages) {
    
            setCurrentPage(currentPage + 1);
    
        }
    
    };
    
    
    const previousPage = () => {
    
        if (currentPage > 1) {
    
            setCurrentPage(currentPage - 1);
    
        }
    
    };

    const handleDeleteStudent = async (id) => {
        

        if (window.confirm("Are you sure you want to delete this student?")) {


            try {

                await deleteStudent(id);


                toast.success("Student Deleted Successfully");


                loadStudents();


            } catch (error) {


                console.log(error);

                toast.error("Unable to delete student");


            }


        }


    };
    
    return (

        <div className="card">            
            <h2>
                Student List (Showing: {filteredStudents.length} / Total: {students.length})
            </h2>
            <input
            type="text"
            placeholder="🔍 Search by ID, Name or Gender..."
            value={search}
            onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
            }}
            className="searchBox"
             />


            <table border="1">


                <thead>

                <tr>

                <th>#</th>

                <th>ID</th>

                <th>Name</th>

                <th>Gender</th>

                <th>Actions</th>

                </tr>

                </thead>



                <tbody>

{
    filteredStudents.length > 0 ? (

        currentStudents.map((student, index) => (
            <tr key={student._id}>

<td>{indexOfFirstStudent + index + 1}</td>

                <td>{student.id}</td>

                <td>{student.name}</td>

                <td>{student.gender}</td>

                <td>

                    <button
                        className="editBtn"
                        onClick={() => setEditStudent(student)}
                    >
                        Edit
                    </button>

                    <button
                        className="deleteBtn"
                        onClick={() => handleDeleteStudent(student._id)}
                    >
                        Delete
                    </button>

                </td>

            </tr>

        ))

    ) : (

        <tr>

            <td
                colSpan="5"
                className="noData"
            >

                🔍 No students found.

                <br />

                <small>
                    Try another search keyword.
                </small>

            </td>

        </tr>

    )

}

</tbody>



            </table>
                        <div className="pagination">

<button
    onClick={previousPage}
    disabled={currentPage === 1}
>
    Previous
</button>


{
    pageNumbers.map((number) => (

        <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={
                currentPage === number
                ? "activePage"
                : ""
            }
        >
            {number}
        </button>

    ))
}


<button
    onClick={nextPage}
    disabled={currentPage === totalPages}
>
    Next
</button>

</div>

        </div>

    );


}


export default StudentTable;
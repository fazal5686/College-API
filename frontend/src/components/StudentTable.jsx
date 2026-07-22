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
    const [totalPages, setTotalPages] = useState(1);
    const [totalStudents, setTotalStudents] = useState(0);
    const [studentsPerPage, setStudentsPerPage] = useState(5);
     

const pageNumbers = [];

for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
}
const handleEdit = (student) => {

    console.log(student);

    setEditStudent(student);

};
const loadStudents = () => {

    getStudents(currentPage, studentsPerPage, search)
        .then((response) => {

            console.log("API RESPONSE:", response.data);


            setStudents(
                response.data.data.students || []
            );


            setTotalPages(
                response.data.data.totalPages || 1
            );


            setTotalStudents(
                response.data.data.totalStudents || 0
            );


        })
        .catch((error) => {

            console.log(error);

            toast.error("Unable to load students");

        });

};

const handlePageSizeChange = (e) => {

    setStudentsPerPage(Number(e.target.value));

    setCurrentPage(1);

};
            useEffect(() => {

                loadStudents();

            }, [refresh, currentPage, search, studentsPerPage]);

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
            <p className="recordInfo">

                Showing{" "}
                {totalStudents === 0
                    ? 0
                    : (currentPage - 1) * studentsPerPage + 1
                }
                {" - "}
                {Math.min(
                    currentPage * studentsPerPage,
                    totalStudents
                )}
                {" of "}
                {totalStudents}

                </p>
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

                    <div className="pageSize">

                        <label>
                            Show:
                        </label>

                        <select
                            value={studentsPerPage}
                            onChange={handlePageSizeChange}
                        >

                            <option value="5">
                                5
                            </option>

                            <option value="10">
                                10
                            </option>

                            <option value="25">
                                25
                            </option>

                            <option value="50">
                                50
                            </option>

                        </select>

                        <span>
                            records
                        </span>

                    </div>
            <table border="1">


            <thead>
    <tr>
        <th>S.No.</th>
        <th>ID</th>
        <th>Photo</th>
        <th>Name</th>
        <th>Gender</th>
        <th>Age</th>
        <th>Class</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Address</th>
        <th>Actions</th>

    </tr>
</thead>


                <tbody>
                    


    {
        students.length > 0 ? (
    
            students.map((student, index) => (
                            
                
                <tr key={student._id}>
                    <td>

<span className="serialBadge">

{
(currentPage - 1) * studentsPerPage + index + 1
}

</span>

</td>

<td>
    <span className="idBadge">
        {student.id}
    </span>
</td>

<td>
    <img
        src={`http://localhost:5000/${student.photo.replace(/\\/g, "/")}`}
        alt={student.name}
        width="60"
        height="60"
        style={{
            borderRadius: "50%",
            objectFit: "cover"
        }}
    />
</td>

<td>
    <strong className="studentName">
        {student.name}
    </strong>
</td>

<td>

<span className="classBadge">
    Class {student.class}
</span>

</td>

<td>

<span className="emailText">
    {student.email}
</span>

</td>

<td>

<span className="phoneText">
    📞 {student.phone}
</span>

</td>
<td>

<span className="addressText">
    {student.address}
</span>

</td>

                <td>

                    <button
                        className="editBtn"
                        onClick={() => handleEdit(student)}
                    >
                       ✏️ Edit
                    </button>

                    <button
                        className="deleteBtn"
                        onClick={() => handleDeleteStudent(student._id)}
                    >
                        🗑 Delete
                    </button>
                    
                </td>

            </tr>

        ))

    ) : (

        <tr>

            <td
                colSpan="11"
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
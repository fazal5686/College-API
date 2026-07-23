import { useEffect, useState } from "react";
import API from "../api/axios";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";


function Dashboard() {

    const navigate = useNavigate();


    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [totalStudents, setTotalStudents] = useState(0);
    const [activeStudents, setActiveStudents] = useState(0);

    const [limit, setLimit] = useState(5);



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
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );


            setStudents(
                students.filter(
                    student => student._id !== id
                )
            );


            alert("Student deleted successfully");


        }
        catch(error){

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


                const token =
                localStorage.getItem("token");



                const response = await API.get(

                    `/students?page=${currentPage}&limit=${limit}&search=${search}`,

                    {
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    }

                );



                console.log(
                    "API DATA:",
                    response.data.data
                );



                setStudents(
                    response.data.data.students
                );



                setTotalPages(
                    response.data.data.totalPages
                );



                setTotalStudents(
                    response.data.data.totalStudents
                );



                setActiveStudents(
                    response.data.data.students.length
                );



            }
            catch(error){

                console.log(error);

            }


        };



        fetchStudents();


    }, [search,currentPage,limit]);





    return (

<div className="dashboard-container">



{/* HEADER */}

<div className="dashboard-header">

    <div>

        <h1>🎓 CollegeAPI</h1>

        <p className="dashboard-subtitle">
            Student Management System
        </p>

    </div>

    <div className="header-actions">

        <button
            className="add-btn"
            onClick={() => navigate("/add-student")}
        >
          Add student  
        </button>

        <button
            className="logout-btn"
            onClick={handleLogout}
        >
            Logout
        </button>

    </div>

</div>




{/* STAT CARDS */}

<div className="stats-container">



<div className="stat-card">

<h3>
👨‍🎓 Total Students
</h3>


<h1>
{totalStudents}
</h1>


</div>




<div className="stat-card">

<h3>
📚 Active Students
</h3>


<h1>
{activeStudents}
</h1>


</div>



</div>







{/* TABLE CARD */}


<div className="card">




{/* SEARCH AND LIMIT */}


<div className="controls">



<div className="search-container">


<input

type="text"

placeholder="Search by Name..."

value={search}

onChange={(e)=>{

setSearch(e.target.value);

setCurrentPage(1);

}}

/>


</div>





<div className="limit-box">


<label>

Show:


<select

value={limit}

onChange={(e)=>{

setLimit(Number(e.target.value));

setCurrentPage(1);

}}

>


<option value={5}>5</option>

<option value={10}>10</option>

<option value={25}>25</option>

<option value={50}>50</option>

<option value={100}>100</option>


</select>


</label>


</div>



</div>







{/* TABLE */}


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

students?.map((student)=>(


<tr key={student._id}>


<td>{student.id}</td>

<td>{student.name}</td>

<td>{student.gender}</td>

<td>{student.age}</td>

<td>{student.class}</td>

<td>{student.email}</td>

<td>{student.phone}</td>



<td>


{

student.photo ?


<img

src={`http://localhost:5001/${student.photo}`}

alt={student.name}

className="student-photo"


onClick={()=>

setSelectedImage(

`http://localhost:5001/${student.photo}`

)

}


/>


:

"No Photo"


}



</td>





<td>


<button

className="edit-btn"

onClick={()=>

navigate(
`/edit-student/${student._id}`
)

}

>

✏️ Edit

</button>





<button

className="delete-btn"

onClick={()=>

handleDelete(student._id)

}

>

🗑 Delete

</button>



</td>



</tr>


))


}



</tbody>



</table>








{/* PAGINATION */}



<div className="pagination">



<button

onClick={()=>

setCurrentPage(currentPage-1)

}

disabled={currentPage===1}

>

◀ Previous

</button>





<span>

Page {currentPage} of {totalPages}

</span>





<button

onClick={()=>

setCurrentPage(currentPage+1)

}

disabled={currentPage===totalPages}

>


Next ▶


</button>



</div>





</div>







{/* IMAGE MODAL */}


{

selectedImage &&


<div

className="image-modal"

onClick={()=>

setSelectedImage(null)

}

>


<img

src={selectedImage}

alt="Student"

className="modal-image"

/>


</div>



}



</div>


    );


}



export default Dashboard;
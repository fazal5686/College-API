import { useEffect, useState } from "react";
import { getStudents } from "../services/studentService";

function StudentTable() {

    const [students, setStudents] = useState([]);

    useEffect(() => {

        getStudents()
            .then((response) => {

                console.log("API DATA:", response.data);

                setStudents(response.data);

            })
            .catch((error) => {

                console.log("API ERROR:", error);

            });

    }, []);


    return (

        <div>

            <h2>Student List</h2>

            <table border="1" cellPadding="10">

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Gender</th>
                    </tr>

                </thead>


                <tbody>

                    {
                        students.map((student) => (

                            <tr key={student.id}>

                                <td>{student.id}</td>

                                <td>{student.name}</td>

                                <td>{student.gender}</td>

                            </tr>

                        ))
                    }

                </tbody>


            </table>

        </div>

    );
}


export default StudentTable;
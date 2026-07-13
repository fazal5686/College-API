import "./components/Student.css";
import { useState } from "react";

import StudentTable from "./components/StudentTable";
import StudentForm from "./components/StudentForm";

function App() {

    const [editStudent, setEditStudent] = useState(null);

    // Refresh flag
    const [refresh, setRefresh] = useState(false);

    return (

        <div className="container">

                    <div>

                    <h1>
                        CollegeAPI Student Management System
                    </h1>

                    <p>
                        React Frontend Connected With MongoDB
                    </p>

                    <StudentForm
                        editStudent={editStudent}
                        setEditStudent={setEditStudent}
                        refresh={refresh}
                        setRefresh={setRefresh}
                    />

                    <StudentTable
                        setEditStudent={setEditStudent}
                        refresh={refresh}
                    />

                    </div>

        </div>

    );

}

export default App;
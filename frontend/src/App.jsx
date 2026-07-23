import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";


function App() {


    return (

        <Routes>


            <Route
                path="/"
                element={<Navigate to="/login" />}
            />



            <Route
                path="/login"
                element={<Login />}
            />



            <Route
                path="/dashboard"
                element={<Dashboard />}
            />



            <Route
                path="/add-student"
                element={<AddStudent />}
            />



            <Route
                path="/edit-student/:id"
                element={<EditStudent />}
            />



            <Route
                path="*"
                element={<Navigate to="/login" />}
            />


        </Routes>

    );

}


export default App;
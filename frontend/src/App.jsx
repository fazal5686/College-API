import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Home />}
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
    path="/edit-student/:id"
    element={<EditStudent />}
/>
            <Route
                path="/add-student"
                element={<AddStudent />}
            />

        </Routes>

    );

}

export default App;
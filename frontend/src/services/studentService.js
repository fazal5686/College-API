import axios from "axios";

const API_URL = "http://localhost:5000/students";

// Get all students
export const getStudents = () => {
    return axios.get(API_URL);
};
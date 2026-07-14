import axios from "axios";
import API_BASE_URL from "../config/api";

const API_URL = `${API_BASE_URL}/students`;

// Get all students
export const getStudents = (page, limit, search) => {

    return axios.get(
        `http://localhost:5000/students?page=${page}&limit=${limit}&search=${search}`
    );

};

// Add student
export const addStudent = (student) => {
    return axios.post(API_URL, student);
};

// Update student
export const updateStudent = (id, student) => {
    return axios.put(`${API_URL}/${id}`, student);
};

// Delete student
export const deleteStudent = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

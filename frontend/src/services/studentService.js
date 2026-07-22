import API from "../api/axios";


// Get students with pagination and search
export const getStudents = (page, limit, search) => {

    return API.get(
        `/students?page=${page}&limit=${limit}&search=${search}`
    );

};


// Add student
export const addStudent = (student) => {

    return API.post(
        "/students",
        student
    );

};


// Update student
export const updateStudent = (id, student) => {

    return API.put(
        `/students/${id}`,
        student
    );

};


// Delete student
export const deleteStudent = (id) => {

    return API.delete(
        `/students/${id}`
    );

};
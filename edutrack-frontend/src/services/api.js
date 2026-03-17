import axios from "axios";

// This connects to your Eclipse Backend
const API_URL = "http://localhost:8080/api/students";


const AUTH_URL = "http://localhost:8080/api/auth";

export const loginUser = (credentials) => axios.post(`${AUTH_URL}/login`, credentials);

export const getStudents = () => axios.get(API_URL);
export const addStudent = (student) => axios.post(API_URL, student);

export const deleteStudent = (id) => axios.delete(`${API_URL}/${id}`);

// This points to our new Attendance controller
const ATTENDANCE_URL = "http://localhost:8080/api/attendance";

export const getAttendance = () => axios.get(ATTENDANCE_URL);
export const markAttendance = (data) => axios.post(ATTENDANCE_URL, data);

const MARKS_URL = "http://localhost:8080/api/marks";

export const getMarks = () => axios.get(MARKS_URL);
export const addMarks = (data) => axios.post(MARKS_URL, data);

export const registerUser = (userData) => axios.post(`${AUTH_URL}/register`, userData);
import axios from "axios";

// Base Configuration
const BASE_URL = "http://localhost:8080/api";

// 1. Students API
const API_URL = `${BASE_URL}/students`;
export const getStudents = () => axios.get(API_URL);
export const addStudent = (student) => axios.post(API_URL, student);
export const deleteStudent = (id) => axios.delete(`${API_URL}/${id}`);

// 2. Auth API
const AUTH_URL = `${BASE_URL}/auth`;
export const loginUser = (credentials) => axios.post(`${AUTH_URL}/login`, credentials);
export const registerUser = (userData) => axios.post(`${AUTH_URL}/register`, userData);

// 3. Attendance API (FIXED URL LOGIC)
const ATTENDANCE_URL = `${BASE_URL}/attendance`;
export const getAttendance = () => axios.get(ATTENDANCE_URL);
// This now correctly points to http://localhost:8080/api/attendance/mark
export const markAttendance = (data) => axios.post(`${ATTENDANCE_URL}/mark`, data);

// 4. Marks API
const MARKS_URL = `${BASE_URL}/marks`;
export const getMarks = () => axios.get(MARKS_URL);
export const addMarks = (data) => axios.post(`${MARKS_URL}/add`, data);
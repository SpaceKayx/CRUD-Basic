import axios from "axios"

const BASE_URL = "http://localhost:8080/api/v1/student"

export const selectAllStudent = async () => await axios.get(BASE_URL)

export const createNewStudent = (student) => axios.post(BASE_URL, student)

export const updateStudent = (id, student) => axios.put(BASE_URL + "/" +id, student)

export const deleteStudent = (studentId) => axios.delete(BASE_URL + "/" +studentId)
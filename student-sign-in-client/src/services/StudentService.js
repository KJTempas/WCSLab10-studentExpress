import axios from 'axios'
//axios will make requests from the Vue client to the Express API server
const base_url = '/api/students'
export default {

    getAllStudents() {
        return axios.get(base_url).then(response => {
            return response.data
        })
    },

    addStudent(student) {
        return axios.post(base_url, student).then(response => {
            return response.data
        })
    },
    updateStudent(student) {
        //url will be base URL /id
        return axios.patch(`${base_url}/${student.id}`, student).then(response => {
            return response.data
        })
    },
    deleteStudent(id) {
        return axios.delete(`${base_url}/${id}`).then(response => {
            return response.data
        })
    }
}

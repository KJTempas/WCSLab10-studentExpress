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
    }
}

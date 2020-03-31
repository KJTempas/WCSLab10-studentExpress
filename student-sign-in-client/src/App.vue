<template>
  <div id="app">

    <NewStudentForm v-on:student-added="newStudentAdded"></NewStudentForm>
    <StudentTable 
      v-bind:students="students" 
      v-on:student-present="studentArrivedOrLeft"
      v-on:delete-student="studentDeleted">
      </StudentTable> 
              <!-- v-on is an event handler for student-present event; call method studentArrivedOrLeft in App.vue-->
    <!-- v-bind message and name to StudentMessage-->
     <StudentMessage v-bind:message="message" v-bind:name="name"></StudentMessage>

  </div>
</template>

<script>
import NewStudentForm from './components/NewStudentForm.vue'
import StudentTable from './components/StudentTable.vue'
import StudentMessage from './components/StudentMessage'


export default {
  name: 'app',
  data() {
    return {
      students: [], //array of students in data
      message: '',
      name: ''
    }
  },
  components: {
    NewStudentForm,
    StudentTable,
    StudentMessage
  },
  mounted() {
    this.updateStudents() //call updateStudents method
  },
  methods: {
    newStudentAdded(student) {
      //call addStudent method in StudentService.js
     this.$student_api.addStudent(student).then( student => {
       //after req is complete, call updateStudents to update student array
       this.updateStudents()
     }).catch(err => {
       let msg = err.response.data.join(', ')
       alert('Error adding student.\n' + msg)
     })
    },
    studentArrivedOrLeft(student) {
      this.$student_api.updateStudent(student).then( () => {
        this.message = student.present ? 'Welcome,' : 'Goodbye, '
        this.name = student.name
        //call method below
        this.updateStudents()
      })
    },
    studentDeleted(student) {
      this.$student_api.deleteStudent(student.id).then( () => {
        this.updateStudents()
      })
    },
    updateStudents() {
      this.$student_api.getAllStudents().then( students => {
        this.students = students //setting this.students to students in the Vue model
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

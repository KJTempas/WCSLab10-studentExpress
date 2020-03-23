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
  methods: {
    newStudentAdded(student) {
      this.students.push(student)
      this.students.sort(function(s1, s2) { //keep students sorted, case insensitive
        return s1.name.toLowerCase() > s2.name.toLowerCase() ? -1 : 1
      })
    },
    studentArrivedOrLeft(student) {
      this.message = student.present ? 'Welcome,' : 'Goodbye, '
      this.name = student.name
    },
    studentDeleted(student) {
      //this filters out deleted student; makes new array w/out deleted student
      this.students = this.students.filter( function(s) { return s != student })
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

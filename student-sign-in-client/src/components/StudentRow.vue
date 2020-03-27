<!-- use if rows ae complex; one row for one student's data-->
<template> <!--note that template element contains a <tr>, not a <div>  -->
   <!--template elements must contain exactly one child element(like the <tr>)  -->
       <!--but that element can contain many children   -->
   <!--<tr v-bind:class="'present-' + student.present">-->
    <tr class="student-row" v-bind:class="'present-' + student.present">

        <td>{{ student.name }}</td>
        <td>{{ student.starID }}</td>
        <td><input type="checkbox" v-model="student.present" v-on:change="checked(student)"></td>
        <td v-show="edit">
            <img class="delete-icon" v-on:click="deleteStudent(student)" src="@/assets/delete.png">
            </td>
    </tr>
</template>

<script>
export default {
    name: 'StudentRow',
    props: {
        student: Object,
        edit: Boolean
    },
    methods: {
        checked(student) {
            this.$emit('student-present', student)
        },
        deleteStudent(student) {
            if (confirm(`Delete ${student.name}?`)) {
                this.$emit('delete-student', student)
            }
        }
    }
}
</script>

<style>
.present-true {
    color: lavender;
    font-style: bold;
}
.present-false {
    color: blue;
    font-style: italic;
}
</style>
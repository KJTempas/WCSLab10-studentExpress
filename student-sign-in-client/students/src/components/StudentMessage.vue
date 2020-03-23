<template>
    <div class="hello">
        <!-- write template here -->
        <transition name="fade">
            <div class="alert alert-success" v-if="seeMessage">{{message}} {{name}}</div>
        </transition>
    </div>
</template>

<script>
//create and export component here
export default { //this appeared automatically when I typed script
    name: 'StudentMessage',
    data() {
        return {
            seeMessage: false
        }
    },
    props: {
        message: String,
        name: String
    },
    watch: { //watch the message( or name) prop
        message() { //the message fx is called when the message prop changes
            this.seeMessage = true
            setTimeout( () => {
                this.seeMessage = false
            }, 3000)
        }
    }
}
</script>

<style>
/* write any styles for this component here */
.fade-enter-active, .fade-leave-active {
    transition: opacity .5x;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>
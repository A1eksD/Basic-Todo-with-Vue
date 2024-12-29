<template>
  <div class="flex justify-between items-center py-2 px-2" 
    :class="{ 'bg-green-600': this.todo.done, 'bg-red-600': !this.todo.done }"> <!--ca so wie der ngClass in angular-->
    <h1 class="cursor-pointer" @click="toggleTodo">{{ todo.titel }}</h1>
    <button class="bg-black py-1 px-1 rounded" @click="removeTodo">delete Todo</button>
  </div>
</template>

<script>
export default {
  name: 'ToDo',
  props: { //herstellung der verbindung zur eltern Komponente und deklarierung der elemente
    todoprop: Object,
    todoindex: String
  },
  data() {
    return {
      todo: this.todoprop
    };
  },
  methods: {

    toggleTodo(){
      this.$emit("toggledone-index", this.todoindex);
    },

    removeTodo(){
      this.$emit("remobeTodo-index", this.todoindex);
    }

  }
}
</script>


<style scoped></style>

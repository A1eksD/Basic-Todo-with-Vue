<template>
  <div class="bg-gray-600 text-white w-1/2 m-auto mt-12">
    <div class="text-center border-b-2 border-black py-4">
      <h1 class="text-3xl py-4">Unsere ToDo's</h1>
      <p class="text-xl" v-if="openTodos.length > 0">Offene Todos: {{ openTodos.length }}</p>
      <p class="text-xl" v-else>Keine offnen Todo's</p>
      <div class="mt-4">
        <input type="text" class="py-2 w-2/3 text-black" v-model="newTodo"> <!-- v-model ist wie ngModel in angular-->
        <button class="bg-red-600 py-2 w-1/3" @click="addTodo">Add Todo</button>
      </div>
    </div>
    <div v-for="(todo, index) in todos" :key="todo.titel"> <!-- wenn es eine id gibt, dann diese bei :key verwenden-->
      <!-- verbindung zur child comp(übergabe der var)  -> :[verbindungsKey]="var" -->
      <!-- übergib manuell den index, damit man weiß auf welches Element man clickt-->
      <ToDo 
        :todoprop="todo" 
        :todoindex="index" 
        @toggledone-index="toggleDone" 
        @remobeTodo-index="deleteTodo"
      />
    </div>
  </div>
</template>

<script>
import ToDo from './components/ToDo.vue'

export default {
  name: 'App',
  components: {
    ToDo
  },
  data() {  // hinterlegen der Variablen für combponent
    return {
      newTodo: '',
      todos: []
    }
  },
  methods: {
    toggleDone(index) {
      this.todos[index].done = !this.todos[index].done;
      this.storeTodos();
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
      this.storeTodos();
    },
    addTodo() {
      if (!this.newTodo.trim()) return; //returne wenn nichts eingefügt wird
      this.todos.push({ titel: this.newTodo, done: false });
      this.newTodo = '';
      this.storeTodos();
    },
    storeTodos(){
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  },
  computed: {
    openTodos(){
      const openTodos = this.todos.filter((todo) => {
        return !todo.done;
      });
      return openTodos;
    }
  },
  mounted() { // ausführung bei onload doku-> https://vuejs.org/guide/essentials/lifecycle
    if (localStorage.getItem('todos')) {
      this.todos = JSON.parse(localStorage.getItem('todos'));
    }
  }
}
</script>

<style></style>

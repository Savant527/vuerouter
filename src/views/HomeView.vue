<!-- <script>
export default {
  data() {
    return {
      username: '',
    }
  },
  replace reemplaza
  methods: {
    this.$router.go(-1) avanzar adelante o atras del historial
    this.$router.replace('/chats') redirecion rutas con nombres nombra vistas
    iniciar() {
      this.$router.push({
        path: '/chats',
        query: {
          variable1: 1,    
        },
        replace: true,
      })
    }
  },
}
</script> -->
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const username = ref()

const router = useRouter()

function iniciar() {
  router.push({ name: 'about' })
}
</script>
<template>
  <main>
    <h3>Introduce tu nombre de usuario</h3>
    <input placeholder="username" v-model="username"/>
    <button @click="iniciar">Iniciar Sesión</button>
  </main>
</template>

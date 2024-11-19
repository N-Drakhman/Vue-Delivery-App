<script setup>
import { RouterView } from "vue-router";
import NavBar from "@/components/NavBar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div id="app">
    <NavBar />
    <main>
      <RouterView></RouterView>
    </main>

    <Footer></Footer>
  </div>
</template>

<style lang="scss" scoped>
#app {
  
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  & main {
    flex: 1; 
    padding: 1rem;
  }
}
</style>

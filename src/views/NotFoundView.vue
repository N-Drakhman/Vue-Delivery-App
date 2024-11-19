<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <section>
    <i class="pi pi-exclamation-triangle"></i>
    <h1 class="text-6xl font-bold mb-4">404 Not Found</h1>
    <p class="text-xl mb-5">This page does not exist</p>
    <RouterLink to="/" class="link">Go Back</RouterLink>
  </section>
</template>

<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 24rem;

  & i {
    color: #eab308;
    font-size: 72px;
    line-height: 1;
    margin-bottom: 20px;
  }

  & h1 {
    font-size: 60px;
    line-height: 1;
    font-weight: 700;
    margin-bottom: 16px;
  }

  & p {
    font-size: 20px;
    line-height: 28px;
    margin-bottom: 20px;
  }

  & .link {
    color: white;
    text-decoration: none;
    background: #750310;
    border-radius: 6px;
    border: none;
    padding: 8px 12px;
    margin-top: 16px;

    &:hover {
      background: #92000e;
      transition: all 0.2s ease;
    }

    &:active {
      background: #ab4d55;
      transition: all 0.2s ease;
    }
  }
}
</style>

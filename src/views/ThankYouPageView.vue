<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <section>
    <div>
      <i class="pi pi-check-circle"></i>
      <h1>Thank You!!!</h1>
      <p>Your order have been taken and is being attended to</p>
      <RouterLink to="/">
        <button>Continue</button>
      </RouterLink>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  width: 100%;
  height: 100%;
  & div {
    width: 80%;
    height: 500px;
    margin: 200px auto;
    text-align: center;

    & i {
      color: green;
      font-size: 90px;
      margin-bottom: 22px;
    }
    & h1 {
      font-size: 42px;
      margin-bottom: 15px;
    }
    & p {
      font-size: 22px;
      margin-bottom: 40px;
    }
    & button {
      width: 211px;
      height: 55px;
      border-radius: 5px;
      font-size: 16px;
      font-weight: 700;
      line-height: 19.49px;
      border: none;
      color: #e1e1e6;
      background-color: #750310;

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
}
</style>

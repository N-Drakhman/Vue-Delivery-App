<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="footer">
    <RouterLink to="/" class="logo"
      ><img src="../assets/img/logo-gray.svg" alt="home page link"
    /></RouterLink>

    <div class="text">© 2023 - Todos os direitos reservados.</div>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 124px;
  background: #00111a;
 
  & .text {
    color: white;
    font-size: 14px;
    line-height: 22.4px;
  }
}

@media screen and (max-width: 768px) {
  .footer {
    width: 100%;
    justify-content: center;
    flex-direction: column;
    padding: 30px 28px;

    & img {
      margin-top: 4px;
      height: 18px;
    }

    & .text {
      min-width: 180px;
      text-align: center;
      font-size: 12px;
    }
  }
}
</style>

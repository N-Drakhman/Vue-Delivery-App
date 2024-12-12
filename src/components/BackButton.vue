<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const goBack = () => {
  router.back();
};
</script>

<template>
  <button class="back-button" @click="goBack">
    <i class="pi pi-angle-left"></i><span> Back </span>
  </button>
</template>

<style lang="scss" scoped>
.back-button {
  color: #e1e1e6;
  font-size: 24px;
  font-weight: 700;
  text-decoration: none;
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  cursor: pointer;

  & i {
    font-size: 22px;
  }
}

@media screen and (max-width: 756px) {
  .back-button {
    font-weight: 500;
  }
}

@media screen and (max-width: 576px) {
  i {
    font-size: 22px;
  }

  span {
    font-size: 20px;
  }
}
</style>

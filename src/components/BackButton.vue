<script setup>
import { RouterLink } from "vue-router";
import { defineProps } from "vue";

const props = {
  link: String,
};
</script>

<template>
  <div>
    <RouterLink to="/"
      ><i class="pi pi-angle-left"></i><span> Back </span>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
div * {
  color: #e1e1e6;
  font-size: 24px;
  font-weight: 700;
  text-decoration: none;
  display: flex;
  align-items: center;

  i {
    font-size: 22px;
    // line-height: 24px;
  }
}

@media screen and (max-width: 756px) {
  section {
    div * {
      font-weight: 500;
    }
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

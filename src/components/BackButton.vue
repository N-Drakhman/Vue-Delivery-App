<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <section>
    <div>
      <RouterLink to="/"><i class="pi pi-angle-left"></i> Back</RouterLink>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  width: 100%;

  div * {
    color: #e1e1e6;
    font-size: 24px;
    font-weight: 700;
    line-height: 33.6px;
    text-align: left;
    text-decoration: none;

    i {
      font-size: 22px;
      line-height: 24px;
    }
  }
}

@media screen and (max-width: 756px) {
  section {
    div * {
      font-weight: 500;
    }
  }
}
</style>

<script setup>
import Hero from "@/components/Hero.vue";
import Carousel from "@/components/Carousel.vue";
</script>

<template>
  <main>
    <Hero></Hero>
    <Carousel :category="'Drinks'"></Carousel>

    <Carousel :category="'Meals'"></Carousel>

    <Carousel :category="'Desserts'"></Carousel>
  </main>
</template>

<style lang="scss" scoped>
.slide {
  width: 300px;
  height: 400px;
  background: white;
}

main {
  margin: 0 124px;
}

@media screen and (max-width: 992px) {
  main {
    margin: 0 80px;
  }
}
@media screen and (max-width: 768) {
  main {
    margin: 0 44px;
  }
}
</style>

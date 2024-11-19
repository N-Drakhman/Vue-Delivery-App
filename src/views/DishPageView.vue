<script setup>
import { ref, computed, defineProps, onBeforeMount, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useDeliveryStore } from "@/stores/delivery-store";
import BackButton from "@/components/BackButton.vue";
const route = useRoute();
const dishId = route.params.id;

const store = useDeliveryStore();

//
const cart = ref(JSON.parse(localStorage.getItem("cart")) || []);

const cartItemQuant = ref();
const quantity = ref();

const formattedCount = computed(() => {
  cartItemQuant.value = cart.value.find((item) => item.id == store.menuItem.id);
  quantity.value = cartItemQuant.value
    ? String(cartItemQuant.value.quantity)
    : String(store.menuItem.quantity);

  return quantity.value.padStart(2, "0");
});

onBeforeMount(() => {
  store.fetchItem(dishId);
});

const loadItemsFromLocalStorage = () => {
  store.loadItemsFromLocalStorage;
};

onMounted(loadItemsFromLocalStorage);

const props = defineProps({
  menuItem: Object,
});

const totalPrice = ref();

const calcTotalPrice = computed(() => {
  totalPrice.value = formattedCount.value * store.menuItem.price;
  return totalPrice.value.toFixed(2);
});
</script>

<template>
  <div class="back-button">
    <BackButton></BackButton>
  </div>

  <div class="card">
    <img class="menu-item-image" alt="dish image" :src="store.menuItem.img" />

    <div class="card-panel">
      <div class="card-title">
        {{ store.menuItem.title }}
      </div>

      <div class="card-description">
        {{ store.menuItem.description }}
      </div>

      <div class="card-tags">
        <div class="tag" v-for="item in store.menuItem.ingredients">
          {{ item }}
        </div>
      </div>

      <div class="counter">
        <div class="counter-panel">
          <button
            @click="store.counter(store.menuItem, -1)"
            class="counter-decrement"
            :disabled="formattedCount === 0"
          >
            <i class="pi pi-minus"></i>
          </button>

          <div class="counter-count">
            <div>
              {{ formattedCount }}
            </div>
          </div>

          <button
            @click="store.counter(store.menuItem, 1)"
            class="counter-increment"
            :disabled="formattedCount === 99"
          >
            <i class="pi pi-plus"></i>
          </button>
        </div>

        <button class="counter-include">
          <i class="pi pi-shopping-cart"></i>
          &#9679; ${{ calcTotalPrice }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.icon-fade-enter-active,
.icon-fade-leave-active {
  transition: all 0.5s ease-in-out;
}
.icon-fade-enter,
.icon-fade-leave-to {
  transform: scale(1.1);
  opacity: 0;
}

.back-button {
  position: absolute;
  top: 128px;
  left: 122px;
}

.card {
  width: calc(100% - 244px);
  margin: 100px auto 155px;
  // height: 100%;
  background: #000a0f;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 48px;
  position: relative;
  color: #e1e1e6;
  text-align: center;

  & button {
    background-color: #00070a;
    border: none;
    color: #e1e1e6;
    cursor: pointer;
  }

  & .menu-item-image {
    max-height: 390px;
    height: 100%;
  }

  &-panel {
    width: 687px;
    height: 300px;
    margin: 45px 0;
    display: flex;
    align-items: start;
    gap: 24px;
    flex-direction: column;

    & .card-tags {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;

      & .tag {
        padding: 4px 8px;
        width: 82px;
        height: 32px;
        gap: 8px;
        border-radius: 5px;
        background: #192227;
      }
    }

    & .counter {
      width: 80%;
      height: 24px;
      margin-top: 24px;
      display: flex;
      gap: 33px;
      align-items: center;

      &-panel {
        display: flex;
        gap: 14px;
        align-items: center;
      }

      &-increment,
      &-decrement {
        width: 24px;
        height: 24px;
        border: none;
        border-radius: 4px;
        padding: 4px;

        & i {
          font-size: 16px;
        }

        &:hover {
          transition: all 0.2s ease;
          background: #0d1d25;
        }

        &:active {
          background: #001119;
        }

        &:disabled {
          color: #ffffff40;
        }
      }

      &-count {
        max-width: 24px;
        height: 24px;
        font-size: 20px;
        line-height: 32px;
        font-weight: 700;
      }

      &-include {
        font-size: 14px;
        line-height: 24px;
        background: #750310;
        width: 162px;
        height: 48px;
        border-radius: 5px;
        font-weight: 500;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 4px;

        & i {
          display: none;
        }

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

    & .card-title {
      font-size: 40px;
      font-weight: 500;
      line-height: 56px;
      white-space: nowrap;
    }

    & .card-description {
      color: #c4c4cc;
      font-size: 24px;
      font-weight: 400;
      line-height: 33.6px;
      text-align: start;
    }
  }
}

@media screen and (max-width: 1200px) {
  .card {
    width: calc(100% - 112px);
    margin: 80px auto 34px;
    gap: 0;

    & .menu-item-image {
      max-height: 300px;
      min-height: 264px;
      margin: 16px 26px 16px;
    }

    & .counter {
      &-include {
        height: 38px;
        min-width: 162px;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .card {
    width: calc(100% - 112px);
    margin: 80px auto 34px;
    flex-direction: column;
    gap: 0;

    & .menu-item-image {
      max-height: 300px;
      min-height: 264px;
      margin: 16px 26px 16px;
    }

    &-panel {
      width: 100%;
      height: fit-content;
      margin: 0;
      align-items: center;

      & .card-tags {
        justify-content: center;
      }

      & .card-title {
        font-size: 27.04px;
        font-weight: 500;
        line-height: 37.86px;
      }

      & .card-description {
        font-size: 16.22px;
        font-weight: 400;
        line-height: 22.71px;
        text-align: center;
      }

      & .counter {
        justify-content: center;
        &-include {
          height: 38px;
          width: 50%;
        }
      }
    }
  }
}

@media screen and (max-width: 576px) {
  .card {
    width: calc(100% - 112px);
    margin: 80px auto 34px;
    flex-direction: column;
    gap: 0;

    & .menu-item-image {
      height: 100%;
      max-height: 264px;
      margin: 16px 26px 16px;
    }

    &-panel {
      width: 100%;
      height: fit-content;
      margin: 0;
      align-items: center;

      & .card-title {
        font-size: 27.04px;
        font-weight: 500;
        line-height: 37.86px;
      }

      & .card-description {
        font-size: 16.22px;
        font-weight: 400;
        line-height: 22.71px;
        text-align: center;
      }

      & .counter {
        width: 100%;
        height: 80px;
        gap: 12px;
        flex-direction: column;
        &-include {
          height: 40px;
          width: 100%;

          & i {
            display: block;
            font-size: 15px;
            padding: 4px 0;
          }
        }
      }
    }
  }
}
</style>

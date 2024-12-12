<script setup>
import { useDeliveryStore } from "@/stores/delivery-store";
import { onBeforeMount, ref, computed, defineProps } from "vue";

const props = defineProps({
  cartItem: Object,
});

const store = useDeliveryStore();

const quantity = ref();

const formattedCount = computed(() => {
  const cartItemQuant = ref(
    store.cart.find((item) => item.id == props.cartItem.id)
  );
  quantity.value = String(cartItemQuant.value.quantity);

  return quantity.value.padStart(2, "0");
});

const calcTotalPrice = computed(() => {
  const cartItemTotal = props.cartItem.quantity * props.cartItem.price;
  return cartItemTotal.toFixed(2);
});
</script>
<template>
  <div class="cart-item">
    <div class="item-info">
      <img :src="cartItem.img" alt="" height="250" />
      <div class="item-details">
        <h1>{{ cartItem.title }}</h1>
        <p>{{ cartItem.category }}</p>
      </div>
    </div>

    <div class="counter">
      <div class="counter-panel">
        <button
          @click="store.counter(props.cartItem, -1)"
          class="counter-decrement"
          :disabled="formattedCount == 0"
        >
          <i class="pi pi-minus"></i>
        </button>
        <div class="counter-count">
          <div>{{ formattedCount }}</div>
        </div>
        <button
          @click="store.counter(props.cartItem, 1)"
          class="counter-increment"
          :disabled="formattedCount > 99"
        >
          <i class="pi pi-plus"></i>
        </button>
      </div>
    </div>

    <h3 class="item-price">${{ calcTotalPrice }}</h3>
    <button @click="store.removeFromCart(props.cartItem.id)">
      <i class="pi pi-times-circle"></i>
    </button>
  </div>
</template>

<style scoped lang="scss">
button {
  cursor: pointer;
}

.cart-item {
  border-top: 0.5px solid gray;
  padding: 30px;
  display: flex;
  gap: 12px;
  justify-content: space-between;
  align-items: center;

  & .item-info {
    display: flex;
    gap: 15px;
    align-items: center;

    & img {
      height: 80px;
    }

    & .item-details {
      min-width: 200px;

      & h1 {
        color: #e1e1e6;
        font-size: 22px;
        font-weight: 700;
        line-height: 26.8px;
      }

      & p {
        font-size: 18px;
        font-weight: 300;
        line-height: 21.92px;
      }
    }
  }

  & .counter {
    height: 48px;
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
      width: 34px;
      font-size: 20px;
      line-height: 32px;
      font-weight: 700;
      text-align: center;
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

  & .item-price {
    font-size: 22px;
    font-weight: 700;
    line-height: 26.8px;
    color: #e1e1e6;
  }

  & button {
    background: red($color: #00000000);
    border-radius: 50%;
    border: none;

    & i {
      color: #ebebeba3;
      font-size: 32px;
    }
  }
}

@media screen and (max-width: 992px) {
  .cart-item {
    & .item-info {
      & .item-details {
        min-width: 165px;

        & h1 {
          font-size: 18px;
        }
        & p {
          font-size: 14px;
        }
      }
    }

    & .item-price {
      font-size: 18px;
    }
  }
}

@media screen and (max-width: 786px) {
  .cart-item {
    position: relative;
    & > button {
      display: none;
    }
    & .item-info {
      & .item-details {
        padding-bottom: 28px;
        & p {
          font-size: 12px;
        }
      }
    }

    & .counter .counter-panel {
      gap: 5px;

      & button i {
        font-size: 14px;
      }

      & div {
        font-size: 18px;
      }
    }

    & .item-price {
      position: absolute;
      top: 80px;
      left: 124px;
      font-size: 14px;
    }
  }
}

@media screen and (max-width: 576px) {
  .cart-item {
    padding: 20px;
    & .item-info {
      & .item-details {
        padding-bottom: 28px;
        & p {
          font-size: 12px;
        }
      }
    }

    & .counter .counter-panel {
      gap: 5px;

      & button i {
        font-size: 14px;
      }

      & div {
        font-size: 18px;
      }
    }

    & .item-price {
      position: absolute;
      top: 80px;
      left: 124px;
      font-size: 14px;
    }

    & .counter {
      position: absolute;
      right: 15px;
      top: 70px;
    }
  }
}
</style>

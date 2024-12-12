<script setup>
import { useDeliveryStore } from "@/stores/delivery-store";
import { onBeforeMount, computed } from "vue";
import { RouterLink } from "vue-router";
import BackButton from "@/components/BackButton.vue";
import CartElement from "@/components/CartElement.vue";
import EmptyCart from "@/components/EmptyCart.vue";

const store = useDeliveryStore();

onBeforeMount(() => {
  store.fetchItems();
});

const totalPrice = computed(() => {
  return store.cart
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);
});
</script>

<template>
  <div v-if="!store.cart.length" style="text-align: center">
    <EmptyCart></EmptyCart>
  </div>

  <div class="cart" v-else>
    <div class="top-panel">
      <h1 class="Cart-title">
        <i class="pi pi-shopping-cart"></i>
        Shopping Cart
      </h1>
      <p class="clear-cart" @click="store.clearCart">
        <i class="pi pi-trash"></i>
        Clear Cart
      </p>
    </div>

    <div class="cart-items">
      <div v-for="cartItem in store.cart">
        <CartElement :cartItem="cartItem" :key="cartItem.id"></CartElement>
      </div>
    </div>

    <div class="bottom-panel">
      <div class="cart-details">
        <div class="total-amount">
          Total Items: <span>{{ store.cart.length }}</span>
        </div>
        <div class="total-price">
          Total Price: <span>${{ totalPrice }}</span>
        </div>
      </div>

      <div class="panel-buttons">
        <div>
          <BackButton></BackButton>
        </div>
        <RouterLink to="/checkout">
          <button class="pay-button">Go to checkout</button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cart {
  width: 100%;
  max-width: 820px;
  margin: 200px auto 80px;

  & button {
    cursor: pointer;
  }

  & .cart-items {
    display: flex;
    flex-direction: column;
    letter-spacing: 0.01em;
  }

  & .top-panel {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;

    & h1 {
      font-size: 28px;
      font-weight: 600;
      line-height: 38.98px;
      color: #e1e1e6;
    }

    & .clear-cart {
      background: #ff000000;
      align-self: end;
      font-size: 16px;
      font-weight: 400;
      line-height: 19.49px;
      cursor: pointer;

      & i {
        margin-right: 6px;
      }
    }
  }

  & .bottom-panel {
    & .cart-details {
      display: flex;
      justify-content: space-between;
      margin-top: 40px;

      & > * {
        font-size: 22px;
        line-height: 26.8px;
        color: #e1e1e6;
      }

      & .total-amount span {
        font-weight: 700;
      }

      & .total-price span {
        font-weight: 700;
      }
    }

    & .panel-buttons {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 80px;

      & .pay-button {
        max-width: 250px;
        height: 55px;
        border-radius: 5px;
        font-size: 16px;
        font-weight: 700;
        line-height: 19.49px;
        padding: 12px 28px;
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
}

@media screen and (max-width: 992px) {
  .cart {
    max-width: 80vw;
  }
}

@media screen and (max-width: 786px) {
  .cart {
    gap: 0px;

    & .cart-details .total-amount,
    & .cart-details .total-price {
      font-size: 16px;
    }

    & .item-info {
      & img {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 455px) {
  .cart {
    gap: 0px;

    & .top-panel {
      flex-direction: column;
      gap: 18px;

      & .clear-cart {
        align-self: flex-start;
      }
    }
  }
}
</style>

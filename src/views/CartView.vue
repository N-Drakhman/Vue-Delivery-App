<script setup>
import { useDeliveryStore } from "@/stores/delivery-store";
import { onBeforeMount, computed } from "vue";
import BackButton from "@/components/BackButton.vue";
import CartElement from "@/components/CartElement.vue";
import EmptyCart from "@/components/EmptyCart.vue";

const store = useDeliveryStore();

onBeforeMount(() => {
  store.fetchItems();

  const savedCart = JSON.parse(localStorage.getItem("cart"));
  if (savedCart) {
    store.setCart(savedCart);
  }
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
          <BackButton />
        </div>
        <button class="pay-button">Pay Now</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cart {
  width: 100%;
  max-width: 820px;
  margin: 120px auto 80px;

  & button {
    cursor: pointer;
  }

  & .cart-items {
    display: flex;
    flex-direction: column;
    letter-spacing: 0.01em;

    & .cart-item {
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

      & .pay-button {
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

      & div {
        padding: 40px 0 0 0;
      }
    }
  }
}
</style>

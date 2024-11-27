<script setup>
import BackButton from "@/components/BackButton.vue";
import { useDeliveryStore } from "@/stores/delivery-store";
import { storeToRefs } from "pinia";
import { ref, computed, onBeforeMount } from "vue";
import { useRouter } from "vue-router";

const store = useDeliveryStore();
const router = useRouter();
const deliveryFee = ref(4.99);

const subTotal = computed(() => {
  return store.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
});

const serviceFee = computed(() => {
  return (subTotal.value * 15) / 100;
});

const totalPrice = computed(() => {
  return subTotal.value + serviceFee.value + deliveryFee.value;
});

const form = ref({
  name: {
    value: "",
    validate: function () {
      this.isValid = this.value.length > 0;
      return this.isValid;
    },
    isValid: true,
  },
  phone: {
    value: "",
    validate: function () {
      this.isValid = this.value.length == 15;
      return this.isValid;
    },
    isValid: true,
  },
  address: {
    value: "",
    validate: function () {
      this.isValid = this.value.length > 0;
      return this.isValid;
    },
    isValid: true,
  },
});

const validate = () => {
  for (let item in form.value) {
    if (!form.value[item].validate()) {
      return;
    }
  }
  store.clearCart();
  router.push("/thank-you");
};
</script>

<template>
  <section>
    <div class="main-content">
      <h1>Checkout</h1>
      <div class="main-checkout">
        <div class="main-inputs">
          <label for="name">name</label>
          <input
            :style="!form.name.isValid && 'border:red 1px solid'"
            type="text"
            id="name"
            placeholder="name"
            v-model="form.name.value"
            required
          />

          <label for="contact_phone">phone</label>
          <input
            :style="!form.phone.isValid && 'border:red 1px solid'"
            type="tel"
            id="contact_phone"
            placeholder="phone number"
            v-model="form.phone.value"
            v-mask="'+7 7## ### ####'"
            required
          />

          <label for="address">address</label>
          <input
            :style="!form.address.isValid && 'border:red 1px solid'"
            type="text"
            id="address"
            placeholder="Where to deliver your food?"
            v-model="form.address.value"
            required
          />
        </div>

        <div class="receipt">
          <h1>Receipt</h1>
          <p>icnl. taxes</p>

          <ul>
            <li>
              <span> Item subtotal </span>
              <span> $ {{ subTotal.toFixed(2) }} </span>
            </li>

            <li>
              <span> Service fee </span>
              <span> $ {{ serviceFee.toFixed(2) }}</span>
            </li>

            <li>
              <span> Delivery </span>
              <span> $ {{ deliveryFee }} </span>
            </li>
            <li>
              <span> Total </span>
              <span> $ {{ totalPrice.toFixed(2) }} </span>
            </li>
          </ul>
        </div>
      </div>

      <div class="panel">
        <BackButton></BackButton>

        <button type="submit" @click="validate" class="pay-button">
          Pay now
        </button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  width: 100%;

  & > .main-content {
    margin: 200px auto 80px;
    width: 80%;

    & > h1 {
      font-size: 32px;
      font-weight: 500;
      line-height: 44.8px;
      margin-bottom: 40px;
      color: white;
    }

    & .main-checkout {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      & .main-inputs {
        display: flex;
        flex-direction: column;
        width: 55%;

        & label {
          font-size: 16px;
          font-weight: 400;
          line-height: 16px;
          color: #c4c4cc;
          margin-bottom: 16px;
        }

        & input {
          width: 100%;
          height: 48px;
          padding: 12px 14px;
          gap: 14px;
          border-radius: 8px;
          border: none;
          background: #0d161b;
          font-size: 18px;
          color: white;
          outline: none;
          margin-bottom: 24px;
        }

        & input::placeholder {
          font-size: 16px;
          font-weight: 400;
          line-height: 16px;
          color: #7c7c8a;
        }
      }

      & .receipt {
        min-width: 35%;

        & > h1 {
          font-size: 28px;
          font-weight: 500;
          line-height: 44.8px;
          color: white;
        }
        & > p {
          font-size: 14px;
          font-weight: 300;
          margin-bottom: 50px;
        }

        & ul {
          & li {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            font-size: 14px;

            & span:first-child {
              font-weight: 500;
            }

            & span:last-child {
              color: white;
              font-variant-numeric: tabular-nums;
            }
          }
        }
        & li:first-child,
        & li:last-child {
          font-size: 18px;
          font-weight: bold;
        }
      }
    }

    & .panel {
      display: flex;
      justify-content: space-between;
      margin-top: 40px;
      align-items: center;

      & .pay-button {
        font-size: 16px;
        max-width: 20vw;
        min-width: 200px;
        height: 56px;
        width: 100%;
        padding: 12px 32px;
        display: flex;
        gap: 8px;
        justify-content: center;
        align-items: center;
        border: none;
        border-radius: 8px;
        color: white;
        background: #750310;
        white-space: nowrap;

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

@media screen and (max-width: 876px) {
  section {
    & .main-content {
      width: 70%;

      & .main-checkout {
        flex-direction: column;

        & .main-inputs {
          width: 100%;
        }

        & .receipt {
          width: 100%;
        }

        & .panel {
          & button {
            max-width: 45vw;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 576px) {
  section {
    & .main-content {
      width: 90%;
    }
  }
}
</style>

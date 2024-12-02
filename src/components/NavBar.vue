<script setup>
import SearchModal from "./SearchModal.vue";
import { RouterLink } from "vue-router";
import { ref, onMounted, onUnmounted } from "vue";
import { useDeliveryStore } from "@/stores/delivery-store";

const isSmallScreen = ref(false);
const showLogo = ref(true);
const showFirstButton = ref(true);
const showSecondButton = ref(false);
const showInput = ref(false);

const store = useDeliveryStore();

const checkScreenSize = () => {
  isSmallScreen.value = window.innerWidth <= 576;

  if (isSmallScreen.value) {
    showLogo.value = true;
    showFirstButton.value = true;
    showSecondButton.value = true;
    showInput.value = false;
  } else if (!isSmallScreen.value) {
    showFirstButton.value = true;
    showLogo.value = true;
    showSecondButton.value = false;
    showInput.value = true;
  }
};

const handleSecondButtonClick = () => {
  showInput.value = !showInput.value;
  showLogo.value = !showLogo.value;
  showFirstButton.value = !showFirstButton.value;
  store.handleModal();
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreenSize);
});

</script>

<template>
  <div class="wrapper">
    <div class="menu-button">
      <button v-if="isSmallScreen" @click="handleSecondButtonClick">
        <i class="pi pi-bars"></i>
      </button>
    </div>

    <div class="logo" v-if="showLogo">
      <RouterLink to="/">
        <img src="../assets/img/logo.svg" alt="" />
      </RouterLink>
    </div>

    <div class="search" :style="showInput && 'display: flex'">
      <i class="pi pi-search"></i>
      <input
        type="text"
        placeholder="Search for dishes"
        @input="store.handleModal"
        v-model="store.searchQuerry"
      />
    </div>

    <div class="cart-button">
      <RouterLink to="/cart">
        <button v-if="showFirstButton">
          <i class="pi pi-shopping-cart"></i>
          <span> Open Cart </span>
        </button>
      </RouterLink>
    </div>

    <div class="result">
      <SearchModal></SearchModal>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: minmax(104px, auto);
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 5;

  & > *:not(.result) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & .logo {
    grid-column: 1 / 2;
    grid-row: 1;
    background: #00111a;
    padding-left: 15px;
    & a {
      height: 30px;
      & img {
        width: 158px;
        height: 30px;
        cursor: pointer;
      }
    }
  }

  & .search {
    grid-column: 2 / 5;
    grid-row: 1;
    background: #00111a;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 0 16px;

    & input {
      height: 48px;
      width: 100%;
      padding: 12px 14px 12px 48px;
      background: #0d1d25;
      color: white;
      outline: none;
      font-size: 18px;
      font-weight: lighter;
      border: none;
      border-radius: 5px;

      &::placeholder {
        font-size: 16px;
        line-height: 16px;
        text-align: left;
        color: #7c7c8a;
      }
    }

    & i {
      position: absolute;
      left: 30px;
      top: 40px;
      font-size: 24px;
      color: #c4c4cc;
    }
  }

  & .cart-button {
    grid-column: 5 / 5;
    grid-row: 1;
    background: #00111a;
    padding-right: 15px;

    & a {
      text-decoration: none;
      & button {
        max-width: 14vw;
        height: 56px;
        width: 100%;
        padding: 12px 32px;
        white-space: nowrap;
        display: flex;
        justify-content: center;
        gap: 8px;
        align-items: center;
        color: white;
        background: #750310;
        font-size: 14px;
        line-height: 24px;
        border: none;
        border-radius: 5px;
        cursor: pointer;

        &:hover {
          background: #92000e;
          transition: all 0.2s ease;
        }

        &:active {
          background: #ab4d55;
          transition: all 0.2s ease;
        }
        & i {
          font-size: 22px;
        }
      }
    }
  }

  & .menu-button {
    display: none;
    background: #00111a;
  }

  & .result {
    grid-column: 2 / 5;
    grid-row: 2;
  }
}

@media screen and (max-width: 992px) {
  .cart-button {
    & button {
      & span {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 576px) {
  .wrapper {
    & .search {
      display: none;
      grid-column: 2/6;
    }

    & .menu-button {
      background-color: #00111a;
      display: flex;
      grid-column: 1/2;
      grid-row: 1;

      & button {
        background-color: #00111a;
        height: 34px;
        width: 34px;
        padding: 4px;
        border-radius: 5px;
        border: none;
        cursor: pointer;

        &:active {
          background: #142c38;
          transition: all 0.2s ease;
        }
        & i {
          color: white;
          font-size: 24px;
        }
      }
    }

    & .logo {
      grid-column: 2/5;
    }

    & .cart-button a button {
      background: #00111a;
    }
  }

  .result {
    grid-column: 1 / 6;
    padding: 10px;
  }
}
</style>

<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="navbar">
    <div class="container">
      <button class="menu">
        <i class="pi pi-bars"></i>
      </button>

      <RouterLink to="/" class="logo">
        <img src="../assets/img/logo.svg" alt="logo" />
      </RouterLink>

      <div class="search-box">
        <i class="pi pi-search icon"></i>
        <input type="text" placeholder="Search for dishes" class="search" />
      </div>

      <div class="cart">
        <RouterLink to="/cart">
          <button class="cart-button">
            <i class="pi pi-shopping-cart"></i>
            <span>Open Cart</span>
          </button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 104px;
  position: sticky;
  top: 0;
  z-index: 5;

  & button {
    cursor: pointer;
  }

  padding: 24px 124px;
  background: #00111a;

  & .container {
    display: flex;
    gap: 32px;
    justify-content: center;
    align-items: center;

    & * {
      border: none;
      border-radius: 5px;
    }

    & .menu {
      display: none;
    }

    & .logo {
      min-height: 30px;
    }

    & .cart {
      & * {
        text-decoration: none;
      }

      &-button {
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

        &:hover {
          background: #92000e;
          transition: all 0.2s ease;
        }

        &:active {
          background: #ab4d55;
          transition: all 0.2s ease;
        }

        & span {
          font-size: 14px;
          line-height: 24px;
        }

        & i {
          font-size: 22px;
        }
      }
    }

    & .search-box {
      position: relative;

      & .icon {
        position: absolute;
        left: 12px;
        top: 12px;
        font-size: 24px;
        color: #c4c4cc;
      }

      & .search {
        width: 40vw;
        height: 48px;
        padding: 12px 14px 12px 48px;
        background: #0d1d25;
        color: white;
        outline: none;
        font-size: 18px;
        font-weight: lighter;

        &::placeholder {
          font-size: 16px;
          line-height: 16px;
          text-align: left;
          color: #7c7c8a;
        }
      }
    }
  }
}

@media screen and (max-width: 992px) {
  .cart {
    & &-button {
      & span {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 576px) {
  .navbar {
    min-width: 372px;
    min-height: 24px;
    justify-content: space-between;
    padding: 45px 28px 24px;

    .container {
      & .menu {
        display: block;
        height: 34px;
        width: 34px;
        padding: 4px;
        background-color: #00111a;

        &:hover {
          background: #142c38;
          transition: all 0.2s ease;
        }

        &:active {
          background: #001119;
          transition: all 0.2s ease;
        }

        & i {
          color: white;
          font-size: 24px;
        }
      }

      & .logo {
        max-height: 25px;
      }

      & .search-box {
        display: none;
      }

      & .cart {
        & .cart-button {
          max-width: 34px;
          height: 38px;
          padding: 0;
          background: #00111a;
        }

        &:hover {
          background: #142c38;
          transition: all 0.2s ease;
        }

        &:active {
          background: #001119;
          transition: all 0.2s ease;
        }

        & i {
          font-size: 26px;
        }
      }
    }
  }
}
</style>

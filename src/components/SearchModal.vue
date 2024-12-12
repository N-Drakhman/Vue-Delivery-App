<script setup>
import { useDeliveryStore } from "@/stores/delivery-store";
import { RouterLink } from "vue-router";

const store = useDeliveryStore();
</script>

<template>
  <div class="modal" v-show="store.isModalOpen">
    <div class="search-results">
      <div
        class="search-result"
        v-for="item in store.searchResult"
        :key="item.id"
      >
        <RouterLink :to="`/dish/${item.id}`">
          <span @click="store.handleModal">
            {{ item.title }}
          </span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
::-webkit-scrollbar {
  width: 5px;
  margin-left: 5px;
}

::-webkit-scrollbar-track {
  background: #f1f1f100;
}

::-webkit-scrollbar-thumb {
  background: #88888842;
  border-radius: 5px;
}

.modal {
  width: 100%;
  height: calc(65vh - 104px);
  z-index: 11;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  & .search-results {
    width: 100%;
    overflow: auto;
    background-color: #00141e;
    border-radius: 8px;
    padding: 28px 28px 10px 28px;

    & .search-result {
      padding: 10px;

      width: 95%;
      border-bottom: solid #192227 1px;
      height: 54px;
      padding: 10px;
      font-weight: 300;
      font-size: 24px;
      text-decoration: none;
      & a {
        text-decoration: none;
      }

      & span {
        text-decoration: none;
        width: 100%;
        display: block;
        color: #e1e1e6;
      }
    }
  }
}

@media screen and (max-width: 992px) {
  .modal {
    width: 100%;
    height: calc(100vh - 104px);
    z-index: 11;

    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 28px 28px 10px 28px;

    & .search-results {
      width: 100%;
      overflow: auto;
      position: relative;
      background-color: #000a0f;

      & .search-result {
        width: 95%;
        border-bottom: solid #192227 1px;
        height: 54px;
        padding: 10px;
        font-weight: 300;
        font-size: 24px;
        text-decoration: none;
        & a {
          text-decoration: none;
        }

        & span {
          text-decoration: none;
          width: 100%;
          display: block;
          color: #e1e1e6;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .modal {
    width: 100%;
    height: calc(100vh - 104px);
    background-color: #000a0f;
    z-index: 11;

    position: fixed;
    top: 104px;
    left: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 28px 28px 10px 28px;

    & .search-results {
      width: 100%;
      overflow: auto;

      & .search-result {
        width: 95%;
        border-bottom: solid #192227 1px;
        height: 54px;
        padding: 10px;
        font-weight: 300;
        font-size: 24px;
        text-decoration: none;
        & a {
          text-decoration: none;
        }

        & span {
          text-decoration: none;
          width: 100%;
          display: block;
          color: #e1e1e6;
        }
      }
    }
  }
}
</style>

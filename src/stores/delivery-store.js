import { onBeforeMount, ref, toRaw, computed, watch } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useDeliveryStore = defineStore("menu", () => {
  const menuItems = ref([]);
  const menuItem = ref({});
  const cart = ref([]);

  const fetchItems = async () => {
    try {
      const response = await axios.get(
        "https://enormous-accurate-shop.glitch.me/Menu"
      );
      menuItems.value = response.data;
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      cart.value = JSON.parse(savedCart);
    }
  };

  onBeforeMount(() => {
    fetchItems();
    loadCartFromLocalStorage();
  });

  const fetchItem = async (dishId) => {
    try {
      const response = await axios.get(
        `https://enormous-accurate-shop.glitch.me/Menu/${dishId}`
      );
      menuItem.value = response.data;

      const cartItem = cart.value.find((item) => item.id == menuItem.value.id);
      menuItem.value.quantity = cartItem?.quantity || 0;
    } catch (error) {
      console.log("Error fetching user", error);
    }
  };

  const filterItemsByCategory = (category) => {
    return menuItems.value.filter((item) => item.category === category);
  };

  const clearCart = () => {
    cart.value = [];
    localStorage.removeItem("cart");
  };

  const removeFromCart = (id) => {
    cart.value = cart.value.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(toRaw(cart.value)));
  };

  const saveItemsToLocalStorage = () => {
    console.log("message", cart.value);
    localStorage.setItem("cart", JSON.stringify(cart.value));
  };

  const counter = (product, operator) => {
    product.quantity = Math.max(0, product.quantity + operator);

    if (product.quantity === 0) {
      cart.value = cart.value.filter((item) => item.id !== product.id);
    } else {
      const cartItem = cart.value.find((item) => item.id === product.id);
      cartItem
        ? (cartItem.quantity = product.quantity)
        : cart.value.push(product);
    }

    console.log("log", product, cart.value);
  };

  const isModalOpen = ref(false);
  const handleModal = () => {
    isModalOpen.value = !isModalOpen.value;
  };

  const searchQuerry = ref("");

  const searchResult = computed(() => {
    if (searchQuerry.value === "") {
      return [];
    }
    return menuItems.value.filter((item) =>
      item.title.toLowerCase().includes(searchQuerry.value.toLowerCase())
    );
  });



  watch(cart, saveItemsToLocalStorage, { deep: true });

  return {
    menuItems,
    menuItem,
    cart,

    fetchItem,
    fetchItems,

    filterItemsByCategory,
    removeFromCart,
    clearCart,

    counter,
    watch,
    saveItemsToLocalStorage,

    isModalOpen,
    searchResult,
    searchQuerry,
    handleModal,
  };
});

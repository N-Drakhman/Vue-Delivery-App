import { onBeforeMount, ref, toRaw, computed, watch } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

export const useDeliveryStore = defineStore("menu", () => {
  const route = useRoute();
  const router = useRouter();

  const menuItems = ref([]);
  const menuItem = ref({});
  const cart = ref([]);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:7000/Menu");
      menuItems.value = response.data;
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  onBeforeMount(() => {
    fetchItems();
  });

  const fetchItem = async (dishId) => {
    try {
      const response = await axios.get(`http://localhost:7000/Menu/${dishId}`);
      menuItem.value = response.data;

      const cartItem = cart.value.find((item) => item.id == menuItem.value.id);
      menuItem.value.quantity = cartItem?.quantity || 0;
    } catch (error) {
      console.log("Error fetching user", error);
    }
  };

  const itemsByCategory = (category) => {
    return menuItems.value.filter((item) => item.category === category);
  };

  const addToCart = (item) => {
    if (cart.value.find((product) => product.id == item.id)) {
      let indexToUpdate = cart.value.findIndex(
        (product) => product.id == item.id
      );
      cart.value[indexToUpdate].quantity = item.quantity;
      localStorage.setItem("cart", JSON.stringify(toRaw(cart.value)));
    } else {
      cart.value.push(item);
      localStorage.setItem("cart", JSON.stringify(toRaw(cart.value)));
    }
    console.log(cart.value);
  };

  const clearCart = () => {
    cart.value = [];
    localStorage.removeItem("cart");
  };

  const removeFromCart = (id) => {
    cart.value = cart.value.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(toRaw(cart.value)));
  };

  const setCart = (cartItems) => {
    cart.value = cartItems;
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  const saveItemsToLocalStorage = () => {
    console.log("message", cart.value);
    localStorage.setItem("cart", JSON.stringify(cart.value));
  };

  const loadItemsFromLocalStorage = () => {
    const storedData = localStorage.getItem("cart");
    if (cart.value) {
      return (cart.value = JSON.parse(storedData));
    }
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

  watch(cart, saveItemsToLocalStorage, { deep: true });

  return {
    menuItems,
    menuItem,
    cart,

    fetchItem,
    fetchItems,
    itemsByCategory,
    addToCart,
    removeFromCart,

    setCart,
    clearCart,

    counter,
    watch,

    saveItemsToLocalStorage,
    loadItemsFromLocalStorage,
  };
});

<template>
  <div id="app">
    <Navbar />
    <transition name="fade">
      <router-view />
    </transition>
    <Footer />
  </div>
</template>
<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
export default {
  name: "App",
  components: { Navbar, Footer },
  methods: {
    verifyAddressKey() {
      if ("addresses" in localStorage) {
        return true;
      }
      return false;
    }
  },
  created() {
    if (!this.verifyAddressKey()) {
      localStorage.setItem("addresses", JSON.stringify([]));
    }
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.15s;
}

.fade-enter-active {
  transition-delay: 0.15s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>

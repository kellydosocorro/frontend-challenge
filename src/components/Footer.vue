<template>
  <footer class="footer">
    <div class="city"></div>
    <div class="city"></div>
  </footer>
</template>
<script>
export default {
  name: 'Footer'
}
</script>
<style>
@media (max-width: 1023px) {
  .footer {
    display: none;
  }
}
body {
  overflow: hidden;
}
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  top: calc(100vh - 208px);
  height: 205px;
  white-space: nowrap;
  overflow: hidden;
}
.city {
  width: 100vw;
  height: 300px;
  background-image: url("../assets/images/predios.png");
  opacity: 0.08;
  background-size: 400px auto;
  background-repeat: repeat-x;
  display: inline-block;
  padding-left: 99%;
  animation: marquee 65s linear infinite;
}
@keyframes marquee {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-100%, 0);
  }
}
</style>
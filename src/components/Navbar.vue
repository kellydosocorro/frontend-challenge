<template>
  <b-navbar toggleable="lg" type="light" variant="light" class="navbar">
    <!-- <b-navbar-brand href="#">NavBar</b-navbar-brand> -->
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item :to="{ name: 'Home' }">Inicial</b-nav-item>
        <b-nav-item :to="{ name: 'Enderecos' }" class="spotlight-button">
          Listar endereços
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<script>
export default {
  name: "Navbar"
}
</script>
<style scoped>
.navbar {
  margin-bottom: 30px;
  padding: 7px 150px;
}
.spotlight-button {
  background: #ffc801;
  color: #1c1c1c;
  padding: 0px 10px;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.8rem;
  margin: 0 0 0 20px;
  border-bottom: 3px solid #dcad03;
  border-right: 3px solid #dcad03;
}
.spotlight-button a {
  color: #1c1c1c;
}
.spotlight-button a:hover {
  color: #333333;
}
</style>
<template>
  <b-alert
    v-model="display"
    class="position-fixed fixed-top m-0 rounded-0 general-alert"
    style="z-index: 2000;"
    dismissible
  >
    <b-row align-v="center">
      <b-col>
        {{ message }}
      </b-col>
    </b-row>
  </b-alert>
</template>
<script>
export default {
  name: "Alert",
  props: {
    message: {
      type: String,
      default: ""
    },
    display: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style scoped>
.general-alert {
  background: #ff4040;
  color: #fff0f5;
  padding: 15px 60px;
  border: 0px;
}
</style>

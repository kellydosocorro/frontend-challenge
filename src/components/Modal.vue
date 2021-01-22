<template>
  <b-modal :id="id" :size="size" hide-footer v-model="isShow">
    <template v-slot:modal-title>
      <b-row align-v="center">
        <b-col>
          <h4 style="margin:5px 0 0 0!important;">{{ title }}</h4>
        </b-col>
      </b-row>
    </template>
    <template v-slot:modal-header-close>
      <b-button variant="link" @click="$bvModal.hide(id)">
        <b-icon icon="x" scale="2" />
      </b-button>
    </template>
    <slot name="body" class="modal-body"></slot>
  </b-modal>
</template>
<script>
export default {
  name: "Modal",
  data() {
    return {
      isShow: false
    };
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "lg"
    }
  },
  methods: {},
  watch: {
    isShow() {
      this.$emit("update:isShow", this.isShow);
    }
  }
};
</script>
<style scoped>
.modal-body {
  padding: 25px 20px 60px 20px;
}
</style>

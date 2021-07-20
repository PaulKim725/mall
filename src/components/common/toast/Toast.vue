<template>
  <div class="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: '',
      isShow: false,
      timeoutId: null
    }
  },
  methods: {
    show(message, duration = 1500) {
      if(this.timeoutId){
        clearTimeout(this.timeoutId);
      }
      this.message = message;
      this.isShow = true;

      this.timeoutId = setTimeout(() => {
        this.isShow = false;
        this.message = '';
        this.timeoutId = null;
      }, duration);
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 8px 10px;
  border-radius: 5px;
  transform: translate(-50%, -50%);
  z-index: 999;

  color: #fff;
  background-color: rgba(0, 0, 0, .6);
}
</style>

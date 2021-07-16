<template>
  <div class="nav-bar" >
    <div class="nav-left-bar"> <slot name="left"></slot></div>
    <div class="nav-center-bar"><slot name="center"></slot></div>
    <div class="nav-right-bar"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>
.nav-bar {
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
  /*x轴0 y轴正数*/
  box-shadow: 0 1px 3px rgba(100, 100, 100, .1);
}
.nav-left-bar, .nav-right-bar {
  width: 60px;
}

.nav-center-bar {
  flex: 1;
}
</style>

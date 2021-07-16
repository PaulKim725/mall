<template>
  <div class="recommend clear-fix">
    <div class="recommend-item" v-for="item in recommends">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommendView",
  props: {
    recommends: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
.recommend{
  display: flex;
  padding: 10px 0 10px;
  border-bottom:  8px solid #EEE;
}
.recommend-item {
  flex: 1;
  font-size: 12px;
  text-align: center;
}
.recommend-item img {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
</style>

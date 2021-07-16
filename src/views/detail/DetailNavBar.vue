<template>
  <nav-bar class="detail-nav">
    <div slot="left" class="back-icon" @click="back">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title" >
      <div v-for="(t, i) in titles"
           class="title-item"
           :class="{active: i === currentIndex}"
           @click="titleClick(i)"
      >{{t}}</div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components: {NavBar},
  props: {
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  data(){
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      // selectedIndex: this.currentIndex
    }
  },
  methods: {
    titleClick(index){
      // this.currentIndex = index;
      this.$emit('titleClick', index);
    },
    back(){
      this.$router.back();
    }
  }
}
</script>

<style scoped>
.detail-nav {
  background-color: #fff;
  z-index: 10;
  position: relative;
}

.title {
  display: flex;
  padding: 0 20px;
  font-size: 14px;
}

.title-item {
  flex: 1;
}

.active {
  color: var(--color-high-text)
}

.back-icon {
  margin-top: 8px;
}
</style>

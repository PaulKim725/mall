<template>
  <swiper ref="swiper" v-if="topImages.length" >
    <swiper-item v-for="(item, index) in topImages"
                 :key="index"
                 class="swiper-item"
    >
      <img :src="item" alt=""/>
    </swiper-item>
  </swiper>
</template>

<script>
import Swiper from "@/components/common/swiper/Swiper";
import SwiperItem from "@/components/common/swiper/SwiperItem";

export default {
  name: "DetailSwiper",
  components: {Swiper, SwiperItem},
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  }
}
</script>

<style scoped>
.swiper-item {
  height: 300px;
  overflow: hidden;
}
</style>

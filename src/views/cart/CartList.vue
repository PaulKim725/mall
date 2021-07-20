<template>
  <scroll ref="scroll">
    <cart-list-item v-for="c in Object.values(cart)" :key="c.iid" :product="c">
    </cart-list-item>
  </scroll>
</template>

<script>
import CartListItem from "@/views/cart/CartListItem";
import Scroll from "@/components/common/scroll/Scroll";

export default {
  name: "CartList",
  components: {Scroll, CartListItem},
  props: {
    cart: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  activated(){
    this.$refs.scroll.refresh();
  }
}
</script>

<style scoped>

</style>

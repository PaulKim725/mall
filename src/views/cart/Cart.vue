<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list :cart="$store.state.cartList" class="cart-list" />
    <cart-bottom-bar />
  </div>
</template>

<script>
import CartList from "@/views/cart/CartList";
import NavBar from "@/components/common/navbar/NavBar";
import CartBottomBar from "@/views/cart/CartBottomBar";

export default {
  name: "Cart",
  components: {
    CartBottomBar,
    NavBar,
    CartList
  },
  data(){
    return {
    }
  },
  computed: {
    cartLength(){
      return Object.keys(this.$store.state.cartList).length;
    }
  }
}
</script>

<style scoped>
.cart {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
  position: relative;
  z-index: 10;
}

.cart-list{
  position: absolute;
  top: 44px;
  bottom: 49px;
  width: 100%;
  height: calc(100vh - 44px - 49px - 40px);
}
</style>

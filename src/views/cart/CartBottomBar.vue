<template>
  <div class="cart-bottom-bar">
    <div class="check-area">
      <check-button class="check-button" @click.native="checkAll" :is-checked="isCheckedAll"/>
    </div>
    <div class="price-area">
      合计：{{ totalPrice }}
    </div>
    <div class="calc-area" @click="calcProd">
      去计算：{{ totalCount }}
    </div>
  </div>
</template>

<script>


import CheckButton from "@/views/cart/CheckButton";

export default {
  name: "CartBottomBar",
  components: {CheckButton},
  computed: {
    totalPrice() {
      let totalPrice = 0;
      for (let p in this.$store.state.cartList) {
        if (this.$store.state.cartList[p].checked) {
          totalPrice += this.$store.state.cartList[p].count * this.$store.state.cartList[p].price;
        }
      }
      return totalPrice;
    },
    totalCount() {
      let totalCount = 0;
      for (let p in this.$store.state.cartList) {
        if (this.$store.state.cartList[p].checked) {
          totalCount += 1;
        }
      }
      return totalCount;
    },
    isCheckedAll() {
      let checkedCount = 0;
      for (let p in this.$store.state.cartList) {
        if (this.$store.state.cartList[p].checked) {
          checkedCount += 1;
        }
      }
      if (checkedCount && checkedCount == Object.keys(this.$store.state.cartList).length) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    checkAll() {
      let checked = this.isCheckedAll;
      for (let p in this.$store.state.cartList) {
        this.$store.state.cartList[p].checked = !checked;
      }
    },
    calcProd(){
      const totalCount = this.totalCount;
      if(totalCount == 0){
        this.$toast.show('选择要结算的商品');
      }
    }
  }
}
</script>

<style scoped>
.cart-bottom-bar {
  position: fixed;
  width: 100%;
  height: 40px;
  bottom: 49px;

  background-color: #eee;
  line-height: 40px;

  display: flex;
  align-items: center;
}

.check-button {
  margin-left: 8px;
  width: 22px;
  height: 22px;
  line-height: 22px;
}

.price-area {
  flex: 1;
  margin-left: 10px;
}

.calc-area {
  padding: 0 8px;
  color: #FFF;
  background-color: orangered;
}
</style>

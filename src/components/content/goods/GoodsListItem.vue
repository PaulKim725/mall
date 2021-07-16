<template>
  <div class="goods" @click="goDetailPage">
    <img :src="getImg" :key="getImg" alt="" @load="imgLoadDone">
    <div class="goods-info">
      <p>{{goods.title}}</p>
      <span class="price">¥{{goods.price}}</span>
      <span class="collect">{{goods.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    getImg(){
      return this.goods.img || this.goods.image || this.goods.show.img
    }
  },
  methods: {
    goDetailPage(){
      const iid = this.goods.iid;
      // console.log(iid);
      this.$router.push('/detail/'+iid);
    },
    // @load监听图片加载完成
    imgLoadDone(){
      // console.log('imgLoadDone');
      if(this.$route.path.indexOf('/home')>-1){
        this.$bus.$emit('homeGoodsItemImgLoadDone');
      }else if(this.$route.path.indexOf('/detail')>-1){
        this.$bus.$emit('detailGoodsItemImgLoadDone');
      }

      // this.$bus.$emit('imgLoadDone');
    }
  }
}
</script>

<style scoped>
.goods {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}
.goods img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: 0;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>

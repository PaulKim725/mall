<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" :current-index="navbarIndex" @titleClick="titleClick"></detail-nav-bar>

    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scrolling="scrolling">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imgLoaded="imgLoaded" />
      <detail-param-info :param-info="params" ref="paramInfo" />
      <detail-comment-info :comment-info="commentInfo" ref="commentInfo"/>
      <detail-recommend-info :recommend-list="recommends" ref="recommends"/>
    </scroll>

    <detail-bottom-bar @addToCart="addToCart" />
    <back-top @click.native="backTop" v-show="showBackTop" class="back-top"/>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/DetailNavBar";

import {getDetail, getRecommend, Goods, GoodsParam, Shop} from "@/api/detail";
import DetailSwiper from "@/views/detail/DetailSwiper";
import DetailBaseInfo from "@/views/detail/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/DetailShopInfo";
import Scroll from "@/components/common/scroll/Scroll";
import DetailGoodsInfo from "@/views/detail/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/DetailParamInfo";
import DetailBottomBar from "@/views/detail/DetailBottomBar";
import DetailCommentInfo from "@/views/detail/DetailCommentInfo";
import DetailRecommendInfo from "@/views/detail/DetailRecommendInfo";

import {debounce} from "@/common/utils";
import {backTopMixin} from "@/common/mixin";
import BackTop from "@/components/common/backTop/BackTop";

export default {
  name: "Detail",
  components: {
    BackTop,
    DetailRecommendInfo,
    DetailCommentInfo,
    DetailBottomBar,
    DetailParamInfo, DetailGoodsInfo, Scroll, DetailShopInfo, DetailBaseInfo, DetailSwiper, DetailNavBar},
  mixins: [backTopMixin],
  data(){
    return {
      did: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      params: {},
      commentInfo: {},
      recommends: [],
      callRefreshFunc: null,
      tabContentOffsetTops: [0, 0, 0, 0],
      debounceTabContentOffsetTopsFunc: null,
      navbarIndex: 0,
    }
  },
  created(){
    this.did = this.$route.params.did;

    getDetail(this.did).then(res => {
      // console.log(res);
      this.topImages = res.result.itemInfo.topImages;
      this.goods = new Goods(
        res.result.itemInfo,
        res.result.columns,
        res.result.shopInfo.services
      );
      this.shop = new Shop(res.result.shopInfo);
      this.detailInfo = res.result.detailInfo;
      this.params = new GoodsParam(res.result.itemParams.info, res.result.itemParams.rule);

      if(res.result.cRate != 0){
        this.commentInfo = res.result.rate.list[0];
      }
    });

    getRecommend().then(res => {
      this.recommends = res.data.list;
    });

    const debounceFunc = () => {
      if(this.$refs.paramInfo && this.$refs.commentInfo && this.$refs.recommends){
        this.tabContentOffsetTops = [];
        this.tabContentOffsetTops.push(0);
        this.tabContentOffsetTops.push(this.$refs.paramInfo.$el.offsetTop);
        this.tabContentOffsetTops.push(this.$refs.commentInfo.$el.offsetTop);
        this.tabContentOffsetTops.push(this.$refs.recommends.$el.offsetTop);
        // console.log(this.tabContentOffsetTops);
      }
    }
    this.debounceTabContentOffsetTopsFunc = debounce(debounceFunc);
  },
  // updated(){
  //   this.debounceTabContentOffsetTopsFunc();
  // },
  mounted(){
    const refresh = debounce(this.$refs.scroll.refresh);
    this.callRefreshFunc = () => {
      refresh();
      this.debounceTabContentOffsetTopsFunc();
    };

    this.$bus.$on('detailGoodsItemImgLoadDone', this.callRefreshFunc);
  },
  destroyed(){
    this.$bus.$on('detailGoodsItemImgLoadDone', this.callRefreshFunc);
  },
  methods: {
    imgLoaded(){
      this.$refs.scroll.refresh();
      this.debounceTabContentOffsetTopsFunc();
    },
    addToCart(){
      console.log('addToCart');
    },
    scrolling(position) {
      // 判断backTop图标是否显示
      this.showBackTop = (-position.y) > 1000;

      for(let topIndex=0, length=this.tabContentOffsetTops.length; topIndex < length; topIndex++){
        if(this.navbarIndex != topIndex
          && (( topIndex < length - 1
            && (-position.y) >= this.tabContentOffsetTops[topIndex]
            && -position.y < this.tabContentOffsetTops[topIndex+1])
            || (topIndex == length - 1 && (-position.y) >= this.tabContentOffsetTops[topIndex]))){
          this.navbarIndex = topIndex;
        }
      }
    },
    titleClick(index){
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.tabContentOffsetTops[index], 300);
    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
  overflow: hidden;
}

.content{
  position: absolute;
  top: 44px;
  bottom: 60px;
  /*height: calc(100vh - 44px - 60px);*/
}

.back-top{
  bottom: 60px;
}
</style>

<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick="goodsClick"
                 ref="hdTabControl"
                 class="hdTabControl"
                 v-show="isTabShow"/>

    <scroll class="content" ref="scroll"
            :probe-type="3" :pull-up-load="true"
            @scrolling="scrolling" @pullingUpLoad="loadMore">
      <home-swiper :banners="banners" ref="homeSwiper"/>
      <home-recommend-view :recommends="recommends"/>
      <home-feature-view/>
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="goodsClick"
                   ref="tabControl"/>
      <goods-list :goods="tabGoods"/>
    </scroll>

    <back-top @click.native="backTop" v-show="showBackTop"/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/common/backTop/BackTop";

import HomeSwiper from "@/views/home/HomeSwiper";
import HomeRecommendView from "@/views/home/HomeRecommendView";
import HomeFeatureView from "@/views/home/HomeFeatureView";
import GoodsList from "@/components/content/goods/GoodsList";

import {getHomeGoods, getHomeMultidata} from "@/api/home";
import {debounce} from "@/common/utils";
import {backTopMixin} from "@/common/mixin";


export default {
  name: "Home",
  components: {
    Scroll,
    NavBar,
    TabControl,
    BackTop,

    HomeFeatureView,
    HomeSwiper,
    HomeRecommendView,
    GoodsList
  },
  mixins: [backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: {page: 0, list: []},
        new: {page: 0, list: []},
        sell: {page: 0, list: []},
      },
      currentType: 'pop',
      tabOffsetTop: 0,
      isTabShow: false,
      callRefreshFunc: null
    }
  },
  computed: {
    tabGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    // 1. 请求数据
    this.getHomeMultiData();
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  mounted() {
  },
  updated() {
    // console.log(this.$refs.tabControl.$el.offsetTop); 之后更新 577 533 差navbar44 为什么？
    this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
  },
  activated(){
    // console.log('activated');

    // 因为不像autocomplete的输入框频繁请求后台，这里防抖函数是否有必要？
    const refresh = debounce(this.$refs.scroll.refresh);
    this.callRefreshFunc = () => {
      refresh();
      // console.log(this.$refs.tabControl.$el.offsetTop);
    };
    // 监听子组件item的img图片加载情况
    this.$bus.$on('homeGoodsItemImgLoadDone', this.callRefreshFunc);
  },
  deactivated() {
    // console.log('deactivated');

    // 取消全局监听的时候，必须传入要取消的函数，如果不传将会取消所有homeGoodsItemImgLoadDone监听事件，而不是取消监听homeGoodsItemImgLoadDone事件的callRefreshFunc函数
    this.$bus.$off('homeGoodsItemImgLoadDone', this.callRefreshFunc);
  },
  methods: {
    getHomeMultiData() {
      getHomeMultidata().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      }).catch(err => {
        console.log(err);
      });
    },
    getHomeGoods(type, callback) {
      // console.log(type);
      const page = this.goods[type].page + 1;
      getHomeGoods({type, page}).then(res => {
        // console.log(res);
        this.goods[type].page = page;
        this.goods[type].list.push(...res.data.list);
        this.goods[type].list.concat(res.data.list);

        this.$refs.scroll.finishPullUp();
      }).catch(err => {
        console.log(err);
      })
    },
    goodsClick(index) {
      const arr = ['pop', 'new', 'sell'];
      this.currentType = arr[index];
      this.$refs.hdTabControl.currentIndex = index;
      this.$refs.tabControl.currentIndex = index;
    },
    scrolling(position) {
      // console.log(position.y);
      // 判断backTop图标是否显示
      this.showBackTop = (-position.y) > 1000;

      // 判断tabControl是否吸顶
      this.isTabShow = (-position.y) > this.tabOffsetTop;
      // this.isTabShow = (-position.y) + 44 > this.tabOffsetTop;
    },
    loadMore(callback) {
      this.getHomeGoods(this.currentType, callback);
    },
  }
  // activated() {
  //   console.log('activated')
  //   this.$refs.homeSwiper.startTimer();
  // },
  // deactivated() {
  //   this.$refs.homeSwiper.stopTimer();
  // }
}
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  /*padding-bottom: 49px;*/
  height: 100vh;
}

.home-nav {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #FFF;

  /* 为了浏览器原生滚动时，navbar不滚动而设置的样式，改用bs滚动之后已经无用 */
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 10;*/
}

/*因为bs，css的吸顶效果已经无用*/
/*.tab-control {*/
/*  position: sticky;*/
/*  top: 44px;*/
/*}*/

.hdTabControl {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
  z-index: 10;
}

.content {
  height: calc(100vh - 49px - 44px);
  overflow: hidden;
}
</style>

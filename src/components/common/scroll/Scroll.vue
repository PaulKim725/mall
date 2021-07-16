<template>
  <!-- 特定结构 wrapper对应的子元素必须是一个 -->
  <div ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // 因数据加载缓慢，可能创建scroll实例的时候，数据还没有加载完成，导致scroll不可用，因此延时500ms，等待数据加载完成在初始化
    // setTimeout(this.__initScroll, 500);
    // 添加图片加载完成监听器，刷新bs之后，是否这里可以不再延迟调用了？
    this.__initScroll();
  },
  methods: {
    __initScroll() {
      /*
        ref如果是绑定在组件中的，那么通过this.$refs.refname获取到的是一个组件对象。
        ref如果是绑定在普通的元素中，那么通过this.$refs.refname获取到的是一个元素对象。
       */
      // console.log('初始化better-scroll');
      // probeType 侦测
      // 0,1都是不侦测
      // 2 在手指滚动的过程中侦测，手指离开后的惯性滚动中不侦测
      // 3 只要是滚动，都侦测
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: true,
        pullUpLoad: this.pullUpLoad, // 上拉加载
        pullDownRefresh: false, // 下拉刷新
      });

      if(this.probeType === 2 || this.probeType === 3){
        // 侦测
        this.scroll.on('scroll', (position) => {
          this.$emit('scrolling', position)
        });
      }

      if(this.pullUpLoad){
        // 监听上拉加载
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUpLoad', () => {
            console.log('上拉加载更多完成');
            this.scroll.finishPullUp();
            this.refresh();
          })
        });
      }
      // this.scroll.on('pullingDown', () => {
      //   console.log('下拉刷新');
      //   this.scroll.finishPullDown()
      // });
    },
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
    refresh() {
      // console.log('refresh');
      // 因为有可能调用refresh方法的时候，bs的实例还没有创建完成
      this.scroll && this.scroll.refresh && this.scroll.refresh()
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp();
    }
  },
  // watch: {
  //   data() {
  //     setTimeout(this.refresh, 20)
  //   }
  // }
}
</script>

<style scoped>

</style>

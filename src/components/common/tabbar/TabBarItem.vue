<template>
  <div class="tab-bar-item" @click="tabBarItemClick">
    <div  v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    link: {
      type: String,
      required: true
    },
    activeColor: {
      type: String,
      required: false,
      default: 'rgb(255, 87, 119)'
    }
  },
  computed: {
    isActive(){
      return this.$route.path.indexOf(this.link) !== -1;
      // if(this.$route.matched.length > 0){
      //   return this.$route.matched[0].path == this.link;
      // }
      // return false;
    },
    activeStyle(){
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    tabBarItemClick(){
      console.log('tabBarItemClick');
      if(this.$route.path !== this.link){
        this.$router.replace(this.link);
      }
    }
  }
}
</script>

<style scoped>
.tab-bar-item{
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px
}

.tab-bar-item img{
  height: 24px;
  width: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
/*.active{*/
/*  color: rgb(255, 87, 119);*/
/*}*/
</style>

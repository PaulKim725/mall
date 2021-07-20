import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // cartList: []
    cartList: {}
  },
  mutations: {
    addCart(state, prod){
      // const oldProd = state.cartList.find(old=>old.iid === prod.iid);
      //
      // if(oldProd){
      //   oldProd.count += 1;
      // }else {
      //   prod.count = 1;
      //   state.cartList.push(prod);
      // }
      // console.log(prod);

      if(state.cartList[prod.iid]){
        // Vue.set(state.cartList[prod.iid], 'count', state.cartList[prod.iid].count+1);
        state.cartList[prod.iid].count += 1;
      }else {
        prod.count = 1;
        prod.checked = true;
        Vue.set(state.cartList, prod.iid, prod);
      }
    }
  },
  actions: {
  },
  modules: {
  }
})

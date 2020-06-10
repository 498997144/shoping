import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList:[], //购物车数据
  },
  mutations: {
    addCart(state,data){
      state.cartList.push(data);
    },
  },
  actions: {
    addCart(context,data){
        return new Promise((resolve)=>{
            if(context.state.cartList.length === 0){
                context.commit('addCart',data);
                resolve && resolve('已成功添加到购车，请到购车查看');
            } else {
                const item = context.state.cartList.filter((item)=>{
                    return item.id === data.id
                });
                if(item.length === 0){
                    context.commit('addCart',data);
                    resolve && resolve('已成功添加到购车，请到购车查看');
                }
                else {
                     resolve('已经在购物车中了，请勿重复法添加');
                }
            }
        })
    },
  },
  modules: {
  }
})

<template>
  <div class="cart-container">
<!--    顶部栏-->
    <Topbar class="top-bar"><span slot="middle">购物车</span></Topbar>
<!--    购物车列表-->
    <Cartlist v-if="$store.state.cartList.length > 0"></Cartlist>
    <div class="null" v-else>购物车空空如也！快去shopping吧！</div>
<!--    底部汇总区域-->
    <Cartbottom></Cartbottom>
  </div>
</template>

<script>
  import Topbar from "../../components/common/topbar/Topbar";
  import Cartlist from "./children/Cartlist";
  import Cartbottom from "./children/Cartbottom";
    export default {
        name: "Cart",
        components:{
            Topbar,
            Cartlist,
            Cartbottom,
        },
        
    }
</script>

<style lang="less" scoped>
  .cart-container{
    margin: 1.111rem 0 2.222rem 0;
    border-top: 1px solid transparent;
    .top-bar{
      z-index: 5;
      span{
        font-size: 16px;
        color: white;
      }
    }
    
    .null{
      display: flex;
      justify-content: center;
      align-items: center;
      color: hotpink;
      height: 100%;
      font-size:0.463rem;
      margin: 1.704rem 0;
    }
  }

</style>
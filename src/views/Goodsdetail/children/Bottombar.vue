<template>
  <ul class="bottom-bar">
    <li class="left">
      <div>
        <i class="iconservice"></i>
        <span>客服</span>
      </div>
      <div>
        <i class="icongift"></i>
        <span>店铺</span>
      </div>
      <div>
        <i class="iconcollection-fill"></i>
        <span>收藏</span>
      </div>
    </li>
    <li class="right">
      <div @click="addCart">加入购物车({{$store.state.cartList.length}})</div>
      <div>购买</div>
    </li>
  </ul>
</template>

<script>
    export default {
        name: "Bottombar",
        methods:{
            addCart(){
                this.$emit('addCart')
            }
        },
    }
</script>

<style lang="less" scoped>
  .bottom-bar{
    display: flex;
    position: fixed;
    width: 10rem;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background:linear-gradient(0deg, #ff79f9, #862081);
    z-index: 5;
    li{
      flex: 50%;
      display: flex;
      height: 1.111rem;
      div{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-size: 13px;
      }
    }
    .left div{
      flex-direction: column;
      /*background-color: #862081;*/
      i{
        font-size: 0.593rem;
        color: hotpink;
      }
      span{
        color: white;
      }
    }
    .right div{
      /*background-color: hotpink;*/
      font-size: 14px;
      color: white;
    }
  }
</style>
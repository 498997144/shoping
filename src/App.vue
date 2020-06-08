<template>
  <div id="app">
  
<!--  header区域-->

<!--  main主体区域-->
    <keep-alive exclude="Goodsdetail">
      <router-view class="main"></router-view>
    </keep-alive>
<!--    footer-tab-bar区域-->
    <ul class="tab-bar">
      <li>
        <router-link :to="{name:'home'}">
          <i class="iconMoneymanagement"></i>
          <span>首页</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'category'}">
          <i class="iconall"></i>
          <span>分类</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'cart'}">
          <i class="iconcart-full"></i>
          <span>购物车</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'user'}">
          <i class="iconusercenter"></i>
          <span>我的</span>
        </router-link>
      </li>
    </ul>
    
  </div>
</template>

<script>

export default {
  name:'App',
  data(){
      return {

      }
  },
}

</script>

<style lang="less" scoped>
  
  /*主体区域*/
  /*.main{*/
  /*  &::after,&::before{*/
  /*    content: '';*/
  /*    display: block;*/
  /*    width: 100%;*/
  /*    height: 1.111rem;*/
  /*  }*/
  /*}*/
  /*footer-tab-bar区域*/
  .tab-bar {
      display: flex;
      height: 1.111rem;
      background-color: #f4f4f4;
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
      bottom: 0;
      width: 10rem;
      box-shadow: 0 0 0.093rem 0 rgba(0,0,0,0.5);
      z-index: 1;
      li{
          flex: 1;
          display: flex;
          justify-content: center;
          a{
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              i{
                  font-size: 0.648rem;
                  margin-top: -0.056rem;
              }
              span{
                  font-size: 12px;
              }
          }
      }
  }
</style>

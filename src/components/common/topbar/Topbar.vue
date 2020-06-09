<template>
  <ul class="top-bar">
    <li class="left">
      <slot name="left"></slot>
    </li>
    <li class="middle">
      <slot name="middle">购物街</slot>
    </li>
    <li class="right">
      <slot name="right"></slot>
    </li>
  </ul>
</template>

<script>
    export default {
        name: "Topbar",
    }
</script>

<style lang="less" scoped>
  @import "../../../assets/css/global.less";
    .top-bar{
      position: fixed;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      width: 10rem;
      height: 1.111rem;
      background-color: @hotpink;
      box-shadow: 0 0 0.093rem 0 rgba(156, 24, 156, 0.5);
      li{
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .left{
        flex: 15% 0 1;
      }
      .middle{
        flex: 1;
        display: flex;
      }
      .right{
        flex: 15% 0 1;
      }
    
    }

</style>
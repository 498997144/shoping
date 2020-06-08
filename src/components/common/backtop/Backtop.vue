<template>
  <div class="back-top">
    <slot><span class="iconfalling"></span></slot>
  </div>
</template>

<script>
    export default {
        name: "Backtop",
        
    }
</script>

<style lang="less" scoped>
.back-top{
  position: fixed;
  left: 50%;
  bottom: 2.222rem;
  transform: translateX(100px);
  width: 1.111rem;
  height: 1.111rem;
  background-color: rgba(255, 30, 195, 0.3);
  border-radius: 50%;
  z-index: 999;
  
  .iconfalling{
    display: block;
    color: white;
    font-size: 1.111rem;
    transform: rotateZ(180deg);
  }
  
}
</style>
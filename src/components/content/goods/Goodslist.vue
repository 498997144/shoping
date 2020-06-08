<template>
  <div class="goods-list-container">
    <Goodsitem v-for="(item,index) in goods" :key="index" :goodsItem="item"></Goodsitem>
  </div>
</template>

<script>
  import Goodsitem from "./Goodsitem";
    export default {
        
        name: "Goodslist",
        
        props:['goods',],
        
        components:{
            Goodsitem,
        }
        
        
    }
</script>

<style lang="less" scoped>
.goods-list-container{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
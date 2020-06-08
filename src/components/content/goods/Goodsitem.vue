<template>
  <div class="goods-item-container" @click="$router.push({name:'Goodsdetail',params:{id:goodsItem.iid}})">
    <img v-lazy="showImg">
    <div class="title-container">
      <p class="title" :title="goodsItem.title">{{goodsItem.title}}</p>
      <p class="cell">
        <span class="price hotpink">￥{{goodsItem.price}}</span>
        <span class="iconcollection-fill collect">{{goodsItem.cfav}}</span>
      </p>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Goodsitem",
        props:['goodsItem'],
        computed:{
            showImg(){
               return this.goodsItem.image || this.goodsItem.show.img;
            },
        },
    }
</script>

<style lang="less" scoped>
.goods-item-container{
  flex: 48% 0;
  margin:0.093rem 0.093rem;
  box-shadow: 0 0 0.093rem 0 rgba(156, 24, 156, 0.5);
  position: relative;
  padding-bottom: 15px;
  box-sizing: content-box;
  min-height: 8.333rem;
  cursor: pointer;
  /*&::after{*/
  /*  content: '';*/
  /*  display: block;*/
  /*  height: 55px;*/
  /*  width: 0;*/
  /*}*/
  img{
    width: 100%;
  }
  .title-container{
    position: absolute;
    bottom:0;
    left: 0;
    .title{
      font-size: 14px;
      padding:0 0.093rem;
      margin: 0.093rem 0;
      height: 28px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
    }
    .cell{
      display: flex;
      justify-content: space-around;
      background-color: #d0ddd1;
      span{
        margin:0.093rem 0;
      }
      .collect{
        position: relative;
        &::before{
          position: absolute;
          left: -20px;
          top: -3px;
          font-size: 20px;
          color: rgba(157, 157, 157, 0.3);
        }
        font-size: 14px;
        color: #666666;
      }
    }
  }
}
</style>
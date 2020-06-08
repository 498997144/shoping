<template>
  <ul class="shop-info-container">
    <li class="top">
      <img :src="shopInfo.shopLogo">
      <span>{{ shopInfo.name }}</span>
      <button>进店逛逛</button>
    </li>
    <li class="bottom">
      <ul class="left">
        <li>
          <span>{{shopInfo.cSells | countFilter}}</span>
          <span>总销量</span>
        </li>
        <li>
          <span>{{shopInfo.cGoods}}</span>
          <span>全部宝贝</span>
        </li>
      </ul>
      <ul class="right">
        <li v-for="(item,index) in shopInfo.score" :key="index">
          <span>{{item.name}}</span>
          <span  :class="item.isBetter ? 'better':'nobetter'">{{item.score}}</span>
          <span v-if="item.score < 4.5" :class="item.isBetter ? 'better':'nobetter'">低</span>
          <span v-else-if="item.score >= 4.5 && item.score < 4.8" :class="item.isBetter ? 'better':'nobetter'">中</span>
          <span v-else :class="item.isBetter ? 'better':'nobetter'">高</span>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
    export default {
        name: "Shopinfo",
        props:['shopInfo'],
        filters:{
            countFilter(number){
                if(number < 10000){
                    return number
                }
                else {
                    return `${(number / 10000).toFixed(1)}万`
                }
            }
        },
    }
</script>

<style lang="less" scoped>
  .better{
    color: hotpink;
  }
  .nobetter{
    color: green;
  }
.shop-info-container{
  display: flex;
  flex-wrap: wrap;
  background-color: #f7f7f7;
  padding: 0.185rem 0;
  li{
    flex: 100%;
  }
  .top{
    margin-top: 0.093rem;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width: 1.111rem;
      margin-right: 0.37rem;
      border-radius: 50%;
    }
    span{
      font-size:16px;
      margin-right: 0.37rem;
      text-shadow: 3px 5px 3px #535353;
    }
    button{
      font-size: 14px;
      width: 100px;
      height: 24px;
      border-radius: 12px;
      background-color: hotpink;
      color: #f7f7f7;
      box-shadow: 0px 1px 3px 2px #ff79f9;
      outline: none;
    }
  }
  
  .bottom{
    display: flex;
    ul{
      flex:1;
    }
    .left{
      display: flex;
      position: relative;
      &::after{
        content: '';
        position: relative;
        top: 0.185rem;
        display: block;
        height: 1.111rem;
        width: 1px;
        border-right: 1px solid #b4b4b4;
      }
      li{
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        height: 1.481rem;
        span{
          padding: 0.037rem 0;
        }
      }
    }
    .right{
      display: flex;
      flex-direction: column;
      /*justify-content: center;*/
      li{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.926rem;
      }
    }
  }
}
</style>
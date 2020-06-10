<template>
  <div class="bottom-bar">
    <div class="all"  @click="toogleAll">
      <Chekbutton :is-check="isAll" ref="allChekbutton"></Chekbutton>
      <span :class="{active:isAll}">全选</span>
    </div>
    <div class="total-price">合计<span>￥{{totalPrice}}</span>元</div>
    <div class="clear" @click="$store.state.cartList = []">清空购物车</div>
    <div class="buy">结算({{length}})</div>
  </div>
</template>

<script>
  import Chekbutton from "../../../components/common/chekbutton/Chekbutton";
    export default {
        name: "Cartbottom",
        components:{
            Chekbutton,
        },
        computed:{
            isAll(){
                if(this.$store.state.cartList.length === 0) return false;
                return !this.$store.state.cartList.find(item=>item.checked == false);
            },
            length(){
                return this.$store.state.cartList.length
            },
            totalPrice(){
                return this.$store.state.cartList.filter((item)=>{
                    return item.checked
                }).reduce((prev,item)=>{
                    return (prev + item.price * item.count);
                },0).toFixed(2)
            },
        },
        methods:{
            toogleAll(){
              this.$store.state.cartList.forEach((item)=>{
                  item.checked = !this.$refs.allChekbutton.isCheck;
              })
            }
        },
    }
</script>

<style lang="less" scoped>
  .bottom-bar{
    display: flex;
    justify-content: space-between;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 1.111rem;
    height:1.111rem;
    width: 10rem;
    background-color: #e7e7e7;
    /*box-shadow: 0 0 0.093rem 0 rgba(83, 83, 83, 0.5);*/
    .all{
      display: flex;
      flex: 20% 0 1;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 1.111rem;
      span{
        font-size: 12px;
        color: #535353;
        margin: 1px 0;
      }
    }
    
    .total-price{
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      height: 100%;
      width: 2.222rem;
      /*margin-left: 1.111rem;*/
      span{
        color: hotpink;
      }
    }
    
    .clear{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 2.593rem;
      height: 100%;
      font-size: 14px;
      background-color: #862081;
      color: white;
    }
    
    .buy{
      width: 1.852rem;
      height: 100%;
      font-size: 16px;
      color: white;
      background-color: hotpink;
      text-align: center;
      line-height: 1.111rem;
    }
  }
  .active{
    color: hotpink!important;
  }
</style>
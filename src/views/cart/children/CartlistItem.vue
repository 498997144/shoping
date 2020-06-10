<template>
  <div class="list-item">
    <Chekbutton class="chek-btn" @click.native="toggle" :is-check="listItem.checked"></Chekbutton>
    <div class="left">
      <img :src="listItem.image">
    </div>
    <ul class="right">
      <li class="title">{{listItem.title}}</li>
      <li class="desc">{{listItem.desc}}</li>
      <li class="bottom">
        <span class="price">￥{{listItem.price}}</span>
        <button class="left" @click="changeCount('decrease')"><span class="jian">-</span></button>
        <input type="number" :value="listItem.count">
        <button class="right" @click="changeCount('increase')"><span class="jia">+</span></button>
        <Chekbutton :is-check="true" class="delete" @click.native="reject">
          <span class="iconclose"></span>
        </Chekbutton>
      </li>
    </ul>
  </div>
</template>

<script>
  import Chekbutton from "../../../components/common/chekbutton/Chekbutton";
    export default {
        name: "CartlistItem",
        components:{
            Chekbutton,
        },
        props:{
            listItem:{
                type:Object,
                deauflt() {
                    return {};
                }
            },
        },
        data(){
            return {
            
            }
        },
        methods:{
            reject(){
                this.$store.state.cartList.forEach((item,index)=>{
                    if(item.id === this.listItem.id){
                        this.$store.state.cartList.splice(index,1);
                    }
                })
            },
            toggle(){
                this.listItem.checked = !this.listItem.checked
            },
            changeCount(type){
                switch (type) {
                    case 'increase':
                        return this.listItem.count++;
                    case 'decrease':
                        if(this.listItem.count > 1){
                            this.listItem.count--;
                        }
                        break
                }
            },
        },
    }
</script>

<style lang="less" scoped>
  .list-item{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2.63rem;
    border-top: 2px solid hotpink;
    &:last-child{
      border-bottom: 2px solid hotpink;
    }
    .chek-btn{
      margin-left: 10px;
    }
    div.left{
      flex: 20% 0 1;
      text-align: center;
      padding:0.185rem 0;
      img{
        width: 1.481rem;
        height: 2.222rem;
        border-radius: 0.185rem;
      }
    }
    ul{
      flex:1;
      display: flex;
      flex-wrap: wrap;
      padding: 0 0.185rem 0.185rem 0;
      li{
        width: 7.167rem;
        flex:100% 0 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        font-size: 14px;
        line-height: 0.833rem;
      }
      .bottom{
        display: flex;
        justify-content: center;
        align-items: center;
        .price{
          color: hotpink;
          font-size: 16px;
          margin-right: 0.556rem;
        }
        .delete{
          /*display: flex;*/
          /*justify-content: center;*/
          /*align-items: center;*/
          /*width: 0.741rem;*/
          /*height: 0.741rem;*/
          /*color: white;*/
          /*background-color: hotpink;*/
          /*font-size: 12px;*/
          margin-left: 0.37rem;
          /*border-radius: 50%;*/
          /*border: 2px solid #eeeeee;*/
        }
        button.left{
          border-right:none;
        }
        button.right{
          border-left:none;
        }
        button{
          position: relative;
          outline: none;
          font-size: 0.648rem;
          height: 0.741rem;
          width: 0.741rem;
          background-color: #ff79f9;
          color: white;
          border: 1px solid #ff79f9;
          .jia{
            position: absolute;
            bottom: 0px;
            right: 0.111rem;
          }
          .jian{
            right: 0.185rem;
          }
        }
        input{
          outline: none;
          width: 1.852rem;
          color: hotpink;
          font-size: 0.463rem;
          height: 0.741rem;
          padding-left: 0.185rem;
          border-top: 1px solid #ff79f9;
          border-bottom: 1px solid #ff79f9;
        }
      }
    }
  }

</style>
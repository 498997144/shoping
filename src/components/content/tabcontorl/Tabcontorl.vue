<template>
  <div class="tabcontorl-container">
    <ul class="tabcontorl">
      <li>
        <a class="toggle active">
          <slot name="left"><span>流行</span></slot>
        </a>
      </li>
      <li>
        <a class="toggle">
          <slot name="center"><span>新款</span></slot>
        </a>
      </li>
      <li>
        <a class="toggle">
          <slot name="right"><span>精选</span></slot>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "Tabcontorl",
        data(){
            return{
            
            }
        },
        mounted() {
          const aList = document.querySelectorAll('.toggle');
          aList.forEach((a,index) => {
              a.addEventListener('click', () => {
                  for(let a of aList){
                      a.className = '';
                  }
                  a.className = 'active';
                  this.$emit('tabToogle',index)
              });
          });
          
          
        }
        
    }
</script>

<style lang="less" scoped>
  @import "../../../assets/css/global.less";
  .active{
    color: @hotpink;
    border-bottom:0.056rem solid @hotpink;
  }
  .tabcontorl{
    display: flex;
    height: 0.815rem;
    li{
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      a{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 36px;
        height: 0.741rem;
        cursor: pointer;
      }
    }
  }
</style>
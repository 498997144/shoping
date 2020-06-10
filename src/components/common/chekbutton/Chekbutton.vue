<template>
  <div class="chek-button" :class="{checked:isCheck}">
    <slot>
      <span class="iconseleted"></span>
    </slot>
  </div>
</template>

<script>
    export default {
        name: "Chekbutton",
        props:{
            isCheck:{
                type:Boolean,
                default:false,
            },
        },
    }
</script>

<style lang="less" scoped>
.chek-button{
  /*position: relative;*/
  display: flex;
  justify-content: center;
  align-items: center;
  width: 0.556rem;
  height: 0.556rem;
  background-color: white;
  border-radius: 50%;
  border: 2px solid #dedede;
  span{
    top:2px;
    /*left: 0;*/
    position: relative;
    font-size: 0.463rem;
    font-weight: 600;
    color: white;
  }
}
  .checked{
    background-color: hotpink;
  }
</style>
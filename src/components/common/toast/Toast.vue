<template>
  <div v-show="isShow" class="toast">
    {{message}}
  </div>
</template>

<script>
    export default {
        name: "Toast",
        data(){
            return {
                message:'',
                isShow:false,
            }
        },
    }
</script>

<style lang="less" scoped>
  @keyframes Display {
    from{
      opacity: 1;
    }
    to{
      opacity: 0.5;
    }
  }
  .toast{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 4.815rem;
    height: 1.111rem;
    padding: 0.185rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%);
    color: white;
    background-color: rgba(134, 32, 129, 0.5);
    animation: Display 3s ease-in-out;
    border-radius: 0.185rem;
    z-index: 999;
    font-size: 14px;
  }
</style>
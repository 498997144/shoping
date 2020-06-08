<template>
  <div class="recommend">
    <Goodslist :goods="recommend"></Goodslist>
  </div>
</template>

<script>
  import Goodslist from "../../../components/content/goods/Goodslist";
    export default {
        name: "Recommend",
        props:['recommend'],
        components:{
            Goodslist,
        },
    }
</script>

<style lang="less" scoped>

</style>
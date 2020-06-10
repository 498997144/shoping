<template>
  <div class="cart-list">
    <CartlistItem v-for="(item,index) in cartList" :list-item="item" :key="index"></CartlistItem>
  </div>
</template>

<script>
  import CartlistItem from "./CartlistItem";
    export default {
        name: "Cartlist",
        components:{
            CartlistItem,
        },
        computed:{
            length(){
                return this.$store.state.cartList.length;
            },
            cartList(){
                return this.$store.state.cartList;
            },
        },
    }
</script>

<style lang="less" scoped>

</style>